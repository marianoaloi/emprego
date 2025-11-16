
import { Request } from "express";

export const skillFilter = async (req: Request, query: any) => {
    const subLookUp: any = {
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
                        },
                        skillMatchStatuses:{$exists:true}
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
                        ,
                        skills: {
                            $map: {
                                as: "match",
                                input: {
                                    $objectToArray: "$skillMatchStatuses"
                                },
                                in:
                                    "$$match.v.localizedSkillDisplayName"

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
                        },
                        skills: 1
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
    };

    if (req.body.skillsFilter && req.body.skillsFilter.length !== 0) {
        subLookUp.$lookup.pipeline[3].$match["skills"] = { "$in": req.body.skillsFilter };
    }

    query.splice(1, 0,
        subLookUp
    );
    const subQuery: any =
    {
        $match:
        /**
         * query: The query in MQL.
         */
        {
            "skills.0.perc": req.body.percentualMatchGreaterThan ?
                { $gte: req.body.percentualMatch / 100 } :
                { $lte: req.body.percentualMatch / 100 }
        }
    };


    query.splice(2, 0, subQuery);
    return query;
};