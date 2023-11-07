import { Subdivision } from "../../../Shared/models/subdivison";
import axios, { AxiosResponse } from "axios";

const subdivisionsUrl = "http://localhost:3001/api/subdivisions/";

export class SubdivisionsClient {
  async getAllSubdivisions(
    subdivisionStatusCodeFilter: string,
    pageNumber: number,
    limit: number,
    sortParam: string
  ): Promise<Subdivision[]> {
    try {
      const axiosResponse = await axios.get<AxiosResponse<Subdivision[]>>(
        subdivisionsUrl,
        {
          params: {
            subdivisionStatusCodeFilter,
            pageNumber,
            limit,
            sortParam
          }
        }
      );
      const subdivisionResponse = axiosResponse.data;
      // npm i lru-cache for caching subdivisions

      return subdivisionResponse.data;
    } catch (err) {
      console.log(err);
    }
    return [];
  }

  async getSubdivisionsCount(
    subdivisionStatusCodeFilter: string
  ): Promise<number> {
    const axiosResponse = await axios.get<AxiosResponse<string>>(
      subdivisionsUrl + "count",
      {
        params: {
          subdivisionStatusCodeFilter
        }
      }
    );
    const subdivisionsCount = await axiosResponse.data;
    return parseFloat(subdivisionsCount.data);
  }
}
