import { Request, Response, NextFunction } from "express";
import * as service from "../services/subdivisionService";

export interface GetAllSubdivisionsRequest {
  pageNumber: string;
  limit: string;
  sortParam: string;
  subdivisionStatusCodeFilter: string;
  ascOrDesc: string;
}

export interface GetSubdivisionsCountRequest {
  subdivisionStatusCodeFilter: string;
}

export const getAllSubdivisons = (req: Request, res: Response) => {
  const { subdivisionStatusCodeFilter, pageNumber, limit, sortParam } =
    req.query;

  try {
    const subdivisions = service.getAllSubdivisons({
      pageNumber,
      limit,
      sortParam,
      subdivisionStatusCodeFilter
    } as GetAllSubdivisionsRequest);

    res.send({ status: "OK", data: subdivisions });
  } catch (error) {
    console.error(error, "Error getting subdivision data");
    res.status(500).send({ status: "FAILED", data: { error } });
  }
};

export const getSubdivisonsCount = (req: Request, res: Response) => {
  const { subdivisionStatusCodeFilter } = req.query;
  try {
    const subdivisionsCount = service.getSubdivisonsCount({
      subdivisionStatusCodeFilter
    } as GetSubdivisionsCountRequest);

    res.send({ status: "OK", data: subdivisionsCount });
  } catch (error) {
    console.error(error, "Error getting subdivision count");
    res.status(500).send({ status: "FAILED", data: { error } });
  }
};
