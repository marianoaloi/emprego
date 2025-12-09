import { logger } from "firebase-functions";
import { drive } from "./gdrive";
import { HybridSearchService } from "../cv/searchChuck";
import getCollections from "./getCollections";

var curriculum: Object | null = null;

export default async function getJsonCurriculum(): Promise<Object> {
  return curriculum ? curriculum : curriculum = await getJsonCurriculumContent();
}

async function getJsonCurriculumContent(): Promise<Object> {
  const fileId = process.env.FILE_ID || "ERROR+ID";
  const res = await drive.files.get({
    fileId: fileId,
    alt: 'media'
  }, { responseType: 'stream' });
  return new Promise<Object>((resolve, reject) => {
    let data = '';
    res.data.on('data', (chunk: any) => {
      data += chunk;
    });
    res.data.on('end', () => {
      try {
        const jsonData = typeof (data) === 'string' ? JSON.parse(data) : data;
        resolve(jsonData);
      } catch (error) {
        reject(error);
      }
    });
    res.data.on('error', (err: any) => {
      reject(err);
    });
  });
}


const reorganizeProjects = (r:any, a:any) => {

  const companyId = a.company_id
  if (!companyId || !a.field)
    return r
  try {
    if (!r) r = {}
    const company = r[companyId] = r[companyId] || {}
    company["name"] = a.company.name
    company["start"] = a.company.start
    company["end"] = a.company.end
    const projectId = a.project_id
    if (!projectId) {
      company[a.field] = a.text
      return r
    }

    if (!company["projects"]) company["projects"] = {}
    const project = company["projects"][projectId] = company["projects"][projectId] || {}
    project[a.field] = a.text
    project["name"] = a.project.name
    project["start"] = a.project.start
    project["end"] = a.project.end

    return r
  } catch (errorRed) {
    console.error(
      errorRed,
      `company:${companyId}
    project:${a.project_id}
    field:${a.field}
    r:${JSON.stringify(r)}
    a:${JSON.stringify(a)}`
    )
  }
}

// import * as crypto from "crypto";
import * as CryptoJS from 'crypto-js';
const md5 = (contents: string) => CryptoJS.MD5(contents).toString();

const addCompaniesAbsent = async (query: string, embeddingVector: number[], contentFiltered: any[], companyIds: string[]
  , searchContent: HybridSearchService
): Promise<any[]> => {
  const abbsentIds = companyIds
  .filter((a) => ! 
   contentFiltered
    .map(x => x.company_id)
    .filter((value, index, self) => self.indexOf(value) === index)
  .includes(a))

  let contents : any[] = []
  for (const id of abbsentIds) {
    const frases = await searchContent.searchInMongoDb(query, embeddingVector, { 'company_id': id }, 2)
    contents = contents.concat(frases)
  }
  


  return contents

}

export async function getSearchChuck(query: string) {
  const searchContent = await new HybridSearchService(process.env.GEMINI_API || "ERROR+API", (await getCollections()).chunks, "vector", "search");


  try {

    const cv: any = await getJsonCurriculum();
    const companyIds = cv.historicals.map((x: { company: any; }, a: any) => md5(`${x.company}+${a}`))
    const embedded = await searchContent.embedText(query);
    if (!embedded) {
      logger.error("Failed to embed query");
      return {};
    }
    const embeddingVector: number[] = (Array.isArray(embedded[0]) ? embedded[0] : embedded) as number[];
    const contentFiltered = await searchContent.searchInMongoDb(query, embeddingVector, {}, 20)
    const contents = await addCompaniesAbsent(query, embeddingVector, contentFiltered, companyIds, searchContent)
    contentFiltered.push(...contents)


    const historicals = contentFiltered
      .reduce(reorganizeProjects, Object.create(null))
    const formatProjects = (prjs: Record<string, any>) => !prjs ? null : Object.entries(prjs).map(prj => prj[1])
    const formatCompanies = (comp: Record<string, any>) => Object.entries(comp).map(obj => ({ ...(obj[1] as Record<string, any>), "projects": formatProjects(obj[1].projects) }))
    const data = {
      "name": cv["name"],
      "telephone": cv["telephone"],
      "location": cv["location"],
      "email": cv["email"],
      "presentation": cv["presentation"].replace(/<[^>]*>/g, ''),
      "historicals": formatCompanies(historicals)
    };

    return (data);
  } catch (e) {
    logger.error(e);
  }
  return {}
}