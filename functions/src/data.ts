/* eslint-disable import/no-anonymous-default-export */
import { Request, Response, Router } from "express";
import { supperFilter } from "./supperFilter";
import { Db } from "mongodb";
import { config } from "./util/env";
import { logger } from "firebase-functions";

export const projectData = {
            description: "$description.text",
            lang: "$description.lang",
            skills:1,
            formattedEmploymentStatus: 1,
            formattedLocation: 1,
            title: 1,
            expireAt: 1,
            lastupdate: 1,
            ignore: 1,
            appliedbyme: '$appliedByMe',
            formattedExperienceLevel: 1,
            listedAt: 1,
            originalListedAt: 1,
            workRemoteAllowed: 1,
            applies: 1,
            new: 1,
            llm: 1,
            wait: 1,
            salaryInsights: 1,
            applicantTrackingSystem: 1,
            foto: {
              $concat: [
                "$companyDetails.comlinkedinvoyagerdecojobswebsharedWebJobPostingCompany.companyResolutionResult.logo.image.comlinkedincommonVectorImage.rootUrl",
                "$companyDetails.comlinkedinvoyagerdecojobswebsharedWebJobPostingCompany.companyResolutionResult.logo.image.comlinkedincommonVectorImage.artifacts.1.fileIdentifyingUrlPathSegment"]
            },
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
            companyName:
              "$companyDetails.comlinkedinvoyagerdecojobswebsharedWebJobPostingCompany.companyResolutionResult.name",
            standardizedTitle: {
              $replaceAll: {
                input: "$standardizedTitle",
                find: "urn:li:fs_title:",
                replacement: "",
              },
            },
            applied: "$applyingInfo.applied",
            closed: "$applyingInfo.closed",
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
          };

export default (db: Db) => {

  const router = Router();

  // GET /data endpoint - returns paginated job data
  router.post("/", async (req: Request, res: Response) => {
    try {
      const limit = parseInt(String(req.body.limit || "50"));
      const offset = parseInt(String(req.query.offset || "0"));
      const sort = req.body.sort && Object.keys(req.body.sort) ? req.body.sort : { lastupdate: -1 };

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
       },
        {
          "$project":
          projectData,
        },
      ];

      await supperFilter(req, query, db);


      const data = await db.collection(config.mongodb.collection)
        .aggregate(
          query
        ).toArray();

      res.status(200).json(data);
    } catch (e) {
      logger.error(e);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // POST /count endpoint - returns count of jobs matching filter criteria
  router.post("/count", async (req: Request, res: Response) => {
    try {

      const query = [
        {
          "$match": {
          },
        },
        {
          "$count": "total"
        }
      ];

      await supperFilter(req, query, db);

      const result = await db.collection(config.mongodb.collection)
        .aggregate(query)
        .toArray();

      const count = result.length > 0 ? result[0].total : 0;

      res.status(200).json({ count });
    } catch (e) {
      logger.error(e);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  return router;
};
