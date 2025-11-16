import { GoogleGenAI } from '@google/genai';
import { Collection, Document } from 'mongodb';

interface project {
  name : string;
  start? : Date;
  end? : Date;
}

interface company {
  name : string;
  start? : Date;
  end? : Date;
}

interface SearchResult {
  _id: string;
  field?: string;
  project_id?: string;
  company_id?: string;
  score: number;
  text: string;
  project : project;
  company: company;
}



class HybridSearchService {
  private genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API || "ERROR+API" });
  private embedModel: string = 'gemini-embedding-001';

  private collection: Collection<Document> = null as unknown as Collection<Document>;
  private vectorIndexName: string = "vector";
  private keywordIndexName: string = "search";

  constructor(apiKey: string, collection: Collection<Document>, vectorIndexName: string, keywordIndexName: string) {
    this.genAI = new GoogleGenAI({ apiKey: apiKey });
    this.collection = collection;
    this.vectorIndexName = vectorIndexName;
    this.keywordIndexName = keywordIndexName;
  }

  /**
   * Embeds the given text using the specified model.
   * @param chunks - Text or array of texts to embed
   * @param model - The embedding model name
   * @returns Embedded representation of the text
   */
  async embedText(
    chunks: string | string[],
    model: string = this.embedModel
  ): Promise<number[] | number[][] | undefined> {
    try {
      const isList = Array.isArray(chunks);
      const input = isList ? chunks : [chunks];


      // Note: This is a simplified version. The actual Google AI SDK might have different method names

      const result = await this.genAI.models.embedContent({
        model: model,
        contents: input,

        config: {
          outputDimensionality: 768,
          taskType: "RETRIEVAL_DOCUMENT",
        }
      });

      // Normalize embeddings: ensure we return either undefined, a single vector, or an array of vectors
      const embeddings = result.embeddings;
      if (!embeddings) return undefined;

      if (isList) {
        // Map to values and replace any missing vectors with empty arrays to satisfy the return type
        return embeddings.map(eb => eb.values ?? []);
      } else {
        // Return the first embedding's values (or an empty array if missing)
        return embeddings[0]?.values ?? [];
      }
    } catch (error) {
      console.error('Error generating embeddings:', error);
      throw error;
    }
  }

  /**
   * Perform weighted Reciprocal Rank Fusion on multiple rank lists.
   * Modified from langchain implementation
   * @param docLists - Array of document lists to fuse
   * @returns Final aggregated list sorted by weighted RRF scores
   */
  weightedReciprocalRank(docLists: SearchResult[][]): SearchResult[] {
    const c = 60; // Constant from the RRF paper
    const weights = new Array(docLists.length).fill(1); // Equal weights

    if (docLists.length !== weights.length) {
      throw new Error('Number of rank lists must be equal to the number of weights.');
    }

    // Create a union of all unique documents
    const allDocuments = new Set<string>();
    const docMap = new Map<string, SearchResult>();

    for (const docList of docLists) {
      for (const doc of docList) {
        allDocuments.add(doc.text);
        docMap.set(doc.text, doc);
      }
    }

    // Initialize RRF score dictionary
    const rrfScores = new Map<string, number>();
    for (const doc of allDocuments) {
      rrfScores.set(doc, 0.0);
    }

    // Calculate RRF scores for each document
    docLists.forEach((docList, listIndex) => {
      docList.forEach((doc, rank) => {
        const rrfScore = weights[listIndex] * (1 / (rank + 1 + c));
        const currentScore = rrfScores.get(doc.text) || 0;
        rrfScores.set(doc.text, currentScore + rrfScore);
      });
    });

    // Sort documents by RRF scores in descending order
    const sortedDocuments = Array.from(rrfScores.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([text, _]) => docMap.get(text)!)
      .filter(doc => doc !== undefined);

    return sortedDocuments;
  }

  /**
   * Perform hybrid search combining vector and keyword search
   * @param query - Search query
   * @param topK - Number of results to return
   * @param vectorIndexName - Name of the vector search index
   * @param keywordIndexName - Name of the keyword search index
   * @param collection - MongoDB collection
   * @param match - Optional match criteria to filter documents
   * @returns Reranked documents using RRF
   */
  async atlasHybridSearch(
    query: string,
    match: Object = {},
    topK: number = 10,
  ): Promise<SearchResult[]> {
    try {
      // Generate query embedding for vector search
      const queryVector = await this.embedText(query) as number[];

      return await this.searchInMongoDb(query, queryVector, match, topK,);

    } catch (error) {
      console.error('Error in hybrid search:', error);
      throw error;
    }
  }


  /**
   * Search pipeline for vector search and keyword search in MongoDB Atlas
   * using $vectorSearch and $search aggregation stages respectively.
   * Results from both searches are then fused using weighted Reciprocal Rank Fusion (RRF).
   * @param query - Search query string
   * @param queryVector - Embedded vector representation of the query
   * @param match - Additional match criteria to filter documents
   * @param topK - Number of top results to return
   * @returns Fused search results sorted by relevance
   */
  async searchInMongoDb(
    query: string,
    queryVector: number[],
    match: Object,
    topK: number): Promise<SearchResult[]> {


    // Vector search pipeline
    const vectorPipeline = [
      {
        $vectorSearch: {
          queryVector: queryVector,
          path: 'embedding',
          numCandidates: topK * 2, // Increased candidates for better results
          limit: topK,
          index: this.vectorIndexName,
          filter: match
        }
      },
      {
        $lookup: {
          from: "cv_rag_projects",
          localField: "project_id",
          foreignField: "_id",
          as: "projects"
        }
      },
      {
        $lookup: {
          from: "cv_rag_companies",
          localField: "company_id",
          foreignField: "_id",
          as: "companies"
        }
      },
      {
        $project: {
          _id: 1,
          company_id: 1,
          field: 1,
          project_id: 1,
          text: 1,
          score: { $meta: 'vectorSearchScore' },
          projects: 1,
          companies: 1,
        }
      }
    ];


    // Keyword search pipeline
    const keywordPipeline = [
      {
        $search: {
          index: this.keywordIndexName,
          text: {
            query: query,
            path: 'text'
          }
        }
      },
      { $match: match },
      {
        $addFields: {
          score: { $meta: 'searchScore' }
        }
      },
      {
        $limit: topK
      },
      {
        $lookup: {
          from: "cv_rag_projects",
          localField: "project_id",
          foreignField: "_id",
          as: "projects"
        }
      },
      {
        $lookup: {
          from: "cv_rag_companies",
          localField: "company_id",
          foreignField: "_id",
          as: "companies"
        }
      }
    ];

    // Execute both searches in parallel for better performance
    const [vectorResults, keywordResults] = await Promise.all([
      this.collection.aggregate(vectorPipeline).toArray(),
      this.collection.aggregate(keywordPipeline).toArray()
    ]);

    // Format results consistently
    const formatResults = (docs: any[]): SearchResult[] => {
      return docs.map(doc => ({
        _id: doc._id.toString(),
        field: doc.field,
        project_id: doc.project_id,
        company_id: doc.company_id,
        score: doc.score || 0,
        text: doc.text,
        project:{name:doc.projects[0]?.name,
          start:doc.projects[0]?.start,
          end:doc.projects[0]?.end},
        company:{name:doc.companies[0]?.name,
          start:doc.companies[0]?.start,
          end:doc.companies[0]?.end},
      }));
    };

    const docLists = [
      formatResults(vectorResults),
      formatResults(keywordResults)
    ];

    // Apply rank fusion
    const fusedDocuments = this.weightedReciprocalRank(docLists);

    return fusedDocuments;
  }
}



// Export for use as module
export { HybridSearchService };


