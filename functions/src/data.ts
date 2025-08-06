/* eslint-disable import/no-anonymous-default-export */
// pages/api/data.js

import {Request, Response} from "express";
import {supperFilter} from "./supperFilter";
import clientPromise, { jobCollection } from "./util/mongo";


export default async (req: Request, res: Response) => {
  try {
    const client = await clientPromise;
    const db = client.db("linkedinjobs");

    const limit = parseInt(String(req.body.limit || "100"));
    const offset = parseInt(String(req.query.offset || "0"));
    const sort = /* req.query ||*/ {lastupdate: -1};

    const query = [
      {
        "$match": {
        },
      }, {
        "$sort": sort,
      }, {
        "$limit": limit,
      }, {
        "$skip": offset,
      }, {
        "$lookup": {
          "from": "skils",
          "let": {
            "id": "$_id",
          },
          "pipeline": [
            {
              "$match": {
                "$expr": {
                  "$and": [
                    {
                      "$eq": [
                        "$$id", "$_id",
                      ],
                    },
                  ],
                },
              },
            }, {
              "$project": {
                "skils": {
                  "$objectToArray": "$applicantSkillsMatchStatuses",
                },
              },
            }, {
              "$unwind": {
                "path": "$skils",
              },
            }, {
              "$project": {
                "_id": 0,
                "skillUrn": "$skils.v.skillUrn",
                "localizedSkillDisplayName": "$skils.v.localizedSkillDisplayName",
              },
            },
          ],
          "as": "skills",
        },
      },
      {
        "$project":
        {
          description: "$description.text",
          lang: "$description.lang.lang",
          formattedLocation: 1,
          title: 1,
          employmentStatus: {
            $replaceAll: {
              input: "$employmentStatus",
              find: "urn:li:fs_employmentStatus:",
              replacement: "",
            },
          },
          country: {
            $replaceAll: {
              input: "$country",
              find: "urn:li:fs_country:",
              replacement: "",
            },
          },
          companyId: {
            $replaceAll: {
              input:
                "$companyDetails.comlinkedinvoyagerdecojobswebsharedWebJobPostingCompany.company",
              find: "urn:li:fs_normalized_company:",
              replacement: "",
            },
          },
          expireAt: 1,
          lastupdate: 1,
          ignore: 1,
          appliedByMe: 1,
          formattedExperienceLevel: 1,
          companyName:
            "$companyDetails.comlinkedinvoyagerdecojobswebsharedWebJobPostingCompany.companyResolutionResult.name",
          listedAt: 1,
          originalListedAt: 1,
          workRemoteAllowed: 1,
          standardizedTitle: {
            $replaceAll: {
              input: "$standardizedTitle",
              find: "urn:li:fs_title:",
              replacement: "",
            },
          },
          applied: "$applyingInfo.applied",
          closed: "$applyingInfo.closed",
          applies: 1,
          new: 1,
          headquartercountry:
            "$companyDetails.comlinkedinvoyagerdecojobswebsharedWebJobPostingCompany.companyResolutionResult.headquarter.country",
          headquartergeographicArea:
            "$companyDetails.comlinkedinvoyagerdecojobswebsharedWebJobPostingCompany.companyResolutionResult.headquarter.geographicArea",
          headquartercity:
            "$companyDetails.comlinkedinvoyagerdecojobswebsharedWebJobPostingCompany.companyResolutionResult.headquarter.city",
          workplaceTypes: {
            $switch: {
              branches: [
                {
                  case: {
                    $eq: [
                      "urn:li:fs_workplaceType:3",
                      "$workplaceTypes.0",
                    ],
                  },
                  then: "H",
                },
                {
                  case: {
                    $eq: [
                      "urn:li:fs_workplaceType:2",
                      "$workplaceTypes.0",
                    ],
                  },
                  then: "R",
                },
                {
                  case: {
                    $eq: [
                      "urn:li:fs_workplaceType:1",
                      "$workplaceTypes.0",
                    ],
                  },
                  then: "O",
                },
              ],
              default: "NW",
            },
          },
          llm: 1,
          wait: 1,
          salaryInsights: 1,
          applicantTrackingSystem: 1,
        },
      },
    ];

    await supperFilter(req, query, db);


    const data = await jobCollection
      .aggregate(
        query
      ).toArray();

    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({message: "Internal Server Error"});
  }
};
