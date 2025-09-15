/* eslint-disable require-jsdoc */
/* eslint-disable no-useless-escape */
/* eslint-disable no-dupe-else-if */
import { Request } from "express";
import { Db } from "mongodb";
import { config } from "./util/env";

export const supperFilter = async (req: Request, query: any, db: Db) => {
  (query as any)[0].$match["applyingInfo.closed"] = false;


  if (req.body.country) {
    (query as any)[0].$match["country"] = `urn:li:fs_country:${req.body.country}`;
  }

  if (req.body.systemRecruter) {
    switch (req.body.systemRecruter) {
      case "LinkedIn":
        (query as any)[0].$match["applicantTrackingSystem"] = "LinkedIn";
        break;
      case "Others":
        (query as any)[0].$match["applicantTrackingSystem"] = { $ne: "LinkedIn" };
        break;
      case "Empty":
        (query as any)[0].$match["applicantTrackingSystem"] = { $exists: false };
        break;
      default:
        break;
    }
  }

  if (req.body.id) {
    (query as any)[0].$match["_id"] = { "$in": req.body.id.split(",") };
  } if (req.body.ids) {
    (query as any)[0].$match["_id"] = { "$in": req.body.ids };
  }

  if (req.body.lang) {
    (query as any)[0].$match["description.lang"] = req.body.lang;
  }


  if (req.body.title) {
    (query as any)[0].$match["title"] = { $regex: req.body.title, $options: "i" };
  }
  if (req.body.companyName) {
    (query as any)[0].$match["companyDetails.comlinkedinvoyagerdecojobswebsharedWebJobPostingCompany.companyResolutionResult.name"] = { $regex: req.body.companyName, $options: "i" };
  }
  if (req.body.workTypes && req.body.workTypes.length > 0) {
    (query as any)[0].$match["formattedEmploymentStatus"] = { $in: req.body.workTypes };
  }

  if (req.body.formattedLocation) {
    (query as any)[0].$match["formattedLocation"] = { $regex: req.body.formattedLocation, $options: "i" };
  }

  if (req.body.remote) {
    switch (req.body.remote) {
      case "H":


        (query as any)[0].$match["workplaceTypes.0"] = "urn:li:fs_workplaceType:3";
        break;
      case "R":


        (query as any)[0].$match["workplaceTypes.0"] = "urn:li:fs_workplaceType:2";
        break;
      case "O":


        (query as any)[0].$match["workplaceTypes.0"] = "urn:li:fs_workplaceType:1";
        break;
      default:
        break;
    }
  }
  if (req.body.ignore !== undefined || req.body.applied !== undefined || req.body.wait !== undefined || req.body.nostatus !== undefined) {
    const filterStatus: any = (query as any)[0].$match[(req.body.nostatus) || (req.body.ignore ||
      req.body.applied ||
      req.body.wait) ? "$and" : "$or"] = [];
    if (!req.body.ignore) {
      filterStatus.push({
        "ignore": {
          "$exists": false,
        },
      });
    } else if (!req.body.nostatus) {
      filterStatus.push({
        "ignore": {
          "$exists": true,
        },
      });
    }
    if (!req.body.applied) {
      filterStatus.push({
        "appliedByMe": {
          "$exists": false,
        },
      });
    } else if (!req.body.nostatus) {
      filterStatus.push({
        "appliedByMe": {
          "$exists": true,
        },
      });
    }
    if (!req.body.wait) {
      filterStatus.push({
        "wait": {
          "$exists": false,
        },
      });
    } else if (!req.body.nostatus) {
      filterStatus.push({
        "wait": {
          "$exists": true,
        },
      });
    }

    if (filterStatus.length === 0) {
      delete (query as any)[0].$match[(!req.body.nostatus) ? "$or" : "$and"];
    }
  }

  if (req.body.locationGranular && !(query as any)[0].$match["formattedLocation"]) {
    const locations = await db.collection(config.mongodb.collectionLocalCode).find({ codes: req.body.locationGranular }).toArray();
    (query as any)[0].$match["formattedLocation"] = { "$in": locations.map((x: { _id: any; }) => x._id) };
  }

  if (req.body.percentualMatch) {
    query.splice(1, 0,
      {
        $lookup: {
          from: "skils",
          let: {
            id: "$_id"
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ["$$id", "$_id"]
                    }
                  ]
                }
              }
            },
            {
              $project: {
                _id: 0,
                match: {
                  $map: {
                    as: "match",
                    input: {
                      $objectToArray: "$skillMatchStatuses"
                    },
                    in: {
                      $cond: [
                        "$$match.v.skillOnProfile",
                        1,
                        0
                      ]
                    }
                  }
                }
              }
            },
            {
              $project: {
                sum: {
                  $sum: "$match"
                },
                size: {
                  $size: "$match"
                }
              }
            },
            {
              $match:
              {
                size: {
                  $gt: 0
                }
              }
            },
            {
              $project:
              {
                perc: {
                  $divide: ["$sum", "$size"]
                }
              }
            }
          ],
          as: "skills"
        }
      }
    );
    query.splice(2, 0,
      {
        $match:
        /**
         * query: The query in MQL.
         */
        {
          "skills.0.perc": req.body.percentualMatchGreaterThan  ?
            { $gte: req.body.percentualMatch / 100 } :
            { $lte: req.body.percentualMatch / 100 }
        }
      },
    )
  }

  dateQuery(req, query);

  return query;
};


const dateQuery = (req: Request, result: any) => {
  if (req.body.datai || req.body.dataf) {
    let datai; let dataf;


    if (req.body.dataf) {
      dataf = transformDate(req.body.dataf, req.body.datai, 1);
    } else if (req.body.dataf && req.body.datai.includes("*")) {
      dataf = new Date(transformDate(req.body.datai, req.body.dataf, -1));
      dataf.setDate(dataf.getDate() + 1);
    } else if (req.body.datai && !req.body.datai.includes("*")) {
      dataf = new Date(req.body.datai);
      dataf.setDate(dataf.getDate() + 1);
    } else {
      dataf = new Date();
    }

    if (req.body.datai) {
      datai = transformDate(req.body.datai, dataf, -1);
    } else {
      datai = new Date(dataf);
      datai.setDate(datai.getDate() - 1);
    }


    if (!isNaN(datai.getTime())) {
      result[0].$match["lastupdate"] = {};
      result[0].$match.lastupdate["$gt"] = datai.getTime();
      result[0].$match.lastupdate["$lt"] = dataf.getTime();
    }
  }
  return result;
};

function transformDate(dateBase: string, dateContral: Date, diff: number) {
  let dataFinal;
  if (dateBase.includes("*")) {
    const group = /([\d\-]+)(\w+)/g.exec(dateBase);
    if (!group) return new Date(1970, 0, 1);
    let base = 1;
    const intergerToCalculate = parseInt(group[1]);
    if (intergerToCalculate != 0) {
      switch (group[2]) {
        case "y":
          base = 365 * 24 * 60 * 60 * 1000;
          break;
        case "M":
          base = 30 * 24 * 60 * 60 * 1000;
          break;
        case "d":
          base = 24 * 60 * 60 * 1000;
          break;
        case "h":
          base = 60 * 60 * 1000;
          break;
        case "m":
          base = 60 * 1000;
          break;
        case "s":
          base = 1000;
          break;
      }
      dataFinal = new Date(dateContral);
      if (isNaN(dataFinal.getTime())) {
        dataFinal = new Date();
      }
      dataFinal.setTime(dataFinal.getTime() + (diff * base * intergerToCalculate));
    } else {
      dataFinal = new Date();
      dataFinal.setHours(0);
      dataFinal.setMinutes(0);
      dataFinal.setSeconds(0);
      dataFinal.setMilliseconds(0);
    }
  } else {
    dataFinal = new Date(dateBase);
  }
  return dataFinal;
}
