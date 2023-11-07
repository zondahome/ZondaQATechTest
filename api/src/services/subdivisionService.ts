import { Subdivision } from "../../../Shared/models/subdivison";
import {
  GetAllSubdivisionsRequest,
  GetSubdivisionsCountRequest
} from "../controllers/subdivisionController";

const subdivisionsData = require("../../sample-data/subdivision.json");

// Service layer is a bit overkill
export const getAllSubdivisons = (params: GetAllSubdivisionsRequest) => {
  const pageNumber = parseFloat(params.pageNumber);
  const limit = parseFloat(params.limit);
  const startingIndex = (pageNumber - 1) * limit;
  const endingIndex = startingIndex + limit;
  const sortParam = params.sortParam;
  const ascOrDesc = params.ascOrDesc;

  try {
    // There is a bug here - when clearing sort param, subdivisions don't reset.
    let subdivisions: Subdivision[] = subdivisionsData.subdivisions;

    // if filter selected, filter by subdivision status code
    if (params.subdivisionStatusCodeFilter) {
      subdivisions = subdivisions.filter(
        (s) => s.subdivisionStatusCode === params.subdivisionStatusCodeFilter
      );
    }

    // if sort parameter selected, sort by name or near map image date
    switch (sortParam) {
      case "name": {
        subdivisions = subdivisions.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;
      }
      case "longitude": {
        subdivisions = subdivisions.sort((a, b) =>
            b.longitude - a.longitude
        );
        break;
      }
      case "latitude": {
        subdivisions = subdivisions.sort((a, b) =>
            b.longitude - a.longitude
        );
        break;
      }
      case "nearmapimagedate": {
        subdivisions = subdivisions.sort(
          (a, b) =>
            new Date(a.nearMapImageDate).getTime() -
            new Date(b.nearMapImageDate).getTime()
        );
        break;
      }
      default: {
        break;
      }
    }

    return subdivisions.slice(startingIndex, endingIndex);
  } catch (error) {
    // error being handled in controller layer
    throw error;
  }
};

export const getSubdivisonsCount = (params: GetSubdivisionsCountRequest) => {
  try {
    let subdivisions: Subdivision[] = subdivisionsData.subdivisions;
    if (params.subdivisionStatusCodeFilter) {
      subdivisions = subdivisions.filter(
        (s) => s.subdivisionStatusCode === params.subdivisionStatusCodeFilter
      );
    }
    return subdivisions.length;
  } catch (error) {
    // error being handled in controller layer
    throw error;
  }
};
