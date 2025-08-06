/* eslint-disable import/no-anonymous-default-export */
// pages/api/data.js
import clientPromise, { jobCollection } from "./util/mongo";
import {Request, Response} from "express";
import {supperFilter} from "./supperFilter";


const salary = async (req: Request, res: Response) => {
  const query = [
    {
      "$match": {
        "salaryInsights.compensationBreakdown": {
          "$exists": true,
        },
      },
    }, {
      "$project": {
        "path": {
          "$objectToArray": "$salaryInsights.compensationBreakdown",
        },
        "workplaceTypes": {
          "$switch": {
            "branches": [
              {
                "case": {
                  "$eq": [
                    "urn:li:fs_workplaceType:3", "$workplaceTypes.0",
                  ],
                },
                "then": "H",
              }, {
                "case": {
                  "$eq": [
                    "urn:li:fs_workplaceType:2", "$workplaceTypes.0",
                  ],
                },
                "then": "R",
              },
            ],
            "default": "NW",
          },
        },
        "standardizedTitle": "$standardizedTitleResolutionResult.localizedName",
        "title": 1,
        "employmentStatus": {
          "$replaceAll": {
            "input": "$employmentStatus",
            "find": "urn:li:fs_employmentStatus:",
            "replacement": "",
          },
        },
        "country": {
          "$replaceAll": {
            "input": "$country",
            "find": "urn:li:fs_country:",
            "replacement": "",
          },
        },
        "companyId": {
          "$replaceAll": {
            "input": "$companyDetails.comlinkedinvoyagerdecojobswebsharedWebJobPostingCompany.company",
            "find": "urn:li:fs_normalized_company:",
            "replacement": "",
          },
        },
        "lang": "$description.lang.lang",
        "lastupdate": {"$toDate": "$lastupdate"},
      },
    }, {
      "$unwind": {
        "path": "$path",
      },
    }, {
      "$project": {
        "_id": 1,
        "title": 1,
        "workplaceTypes": 1,
        "standardizedTitle": 1,
        "employmentStatus": 1,
        "country": 1,
        "companyId": 1,
        "lang": 1,
        "lastupdate": 1,
        "minSalary": "$path.v.minSalary",
        "maxSalary": "$path.v.maxSalary",
        "payPeriod": "$path.v.payPeriod",
        "currencyCode": "$path.v.currencyCode",
        "compensationType": "$path.v.compensationType",
      },
    },
  ];

  return query;
};


const countries = async (req: Request, res: Response) => {
  const days = parseInt(String(req.query.days || "5"));
  const query = [
    {
      "$match": {
        "lastupdate": {
          $gte:
            new Date().getTime() -
            days * 24 * 60 * 60 * 1000,
        },
        "description.lang.lang": {
          $in: ["pt", "it", "en"],
        },
      },
    },
    {
      $group:
      /**
       * _id: The id of the group.
       * fieldN: The first field name.
       */
      {
        _id: "$country",
        count: {
          $sum: 1,
        },
        deleted: {
          $sum: {
            $cond: [
              {
                $not: "$ignore",
              },
              0,
              1,
            ],
          },
        },
        wait: {
          $sum: {
            $cond: [
              {
                $not: "$wait",
              },
              0,
              1,
            ],
          },
        },
        appliedByMe: {
          $sum: {
            $cond: [
              {
                $not: "$appliedByMe",
              },
              0,
              1,
            ],
          },
        },
      },
    },
    {
      $lookup:
      /**
       * from: The target collection.
       * localField: The local join field.
       * foreignField: The target join field.
       * as: The name for the results.
       * pipeline: Optional pipeline to run on the foreign collection.
       * let: Optional variables to use in the pipeline field stages.
       */
      {
        from: "countries_abbreviation",
        localField: "_id",
        foreignField: "_id",
        as: "result",
      },
    },
    {
      $unwind:
      /**
       * path: Path to the array field.
       * includeArrayIndex: Optional name for index.
       * preserveNullAndEmptyArrays: Optional
       *   toggle to unwind null and empty values.
       */
      {
        path: "$result",
      },
    },
    {
      $project:
      /**
       * specifications: The fields to
       *   include or exclude.
       */
      {
        _id: "$result.Country",
        count: 1,
        deleted: 1,
        wait: 1,
        appliedByMe: 1,
      },
    },
  ];

  return query;
};

const countryLocal = async (req: Request, res: Response) => {
  const days = parseInt(String(req.query.days || "5"));
  const query = [
    {
      "$match": {
        "lastupdate": {
          $gte:
            new Date().getTime() -
            days * 24 * 60 * 60 * 1000,
        },
        "description.lang.lang": {
          $in: ["pt", "it", "en"],
        },
      },
    }, {
      "$lookup": {
        "from": "local_code",
        "localField": "formattedLocation",
        "foreignField": "_id",
        "as": "result",
      },
    }, {
      "$unwind": {
        "path": "$result",
      },
    }, {
      "$unwind": {
        "path": "$result.codes",
      },
    }, {
      "$group": {
        "_id": "$result.codes",
        "count": {
          "$sum": 1,
        },
        "deleted": {
          "$sum": {
            "$cond": [
              {
                "$not": "$ignore",
              }, 0, 1,
            ],
          },
        },
        "wait": {
          "$sum": {
            "$cond": [
              {
                "$not": "$wait",
              }, 0, 1,
            ],
          },
        },
        "appliedByMe": {
          "$sum": {
            "$cond": [
              {
                "$not": "$appliedByMe",
              }, 0, 1,
            ],
          },
        },
      },
    },
  ];

  return query;
};

const base = async (req: Request, res: Response) => {
  const days = parseInt(String(req.query.days || "5"));
  const query = [
    {
      $match:
      /**
       * query: The query in MQL.
       */
      {
        "lastupdate": {
          $gte:
            new Date().getTime() -
            days * 24 * 60 * 60 * 1000,
        },
        "description.lang.lang": {
          $in: ["pt", "it", "en"],
        },
        "ignore": {
          "$exists": false,
        },
      },
    },
    {
      $group:
      /**
       * _id: The id of the group.
       * fieldN: The first field name.
       */
      {
        _id: {
          lang: "$description.lang.lang",
          country: "$country",
        },
        count: {
          $sum: 1,
        },
      },
    },
  ];


  return query;
};

export default async (req: Request, res: Response) => {
  try {
    const client = await clientPromise;
    const db = client.db("linkedinjobs");


    const query = req.url?.includes("salary") ?
      await salary(req, res) :
      req.url?.includes("countries") ?
        await countries(req, res) :
        req.url?.includes("countryLocal") ?
          await countryLocal(req, res) : await base(req, res);


    await supperFilter(req, query, db);

    let data = await jobCollection
      .aggregate(
        query
      ).toArray();

    if (!req.url?.includes("salary") &&
      !req.url?.includes("countries") &&
      !req.url?.includes("countryLocal")) {
      data = data.map((item: any) => {
        return {
          lang: item._id.lang,
          country: item._id.country.replace("urn:li:fs_country:", ""),
          count: item.count,
        };
      });
    }

    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({message: "Internal Server Error"});
  }
};
