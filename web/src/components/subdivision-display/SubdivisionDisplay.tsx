import React, { useEffect, useState } from "react";

import { Subdivision } from "../../../../Shared/models/subdivison";
import { SubdivisionsClient } from "../../Clients/SubdivisionClient";

import "./SubdivisionDisplay.css";
import { DropDownComponent } from "../Dropdown/Dropdown";
import { SubdivisionTableComponent } from "../Table/SubdivisionTable";

const subdivisionStatusCodes: string[] = ["Active", "Future", "Builtout"];
const sortParams: string[] = ["Name", "Near Map Image Date", "Longitude", "Latitude"];
const { getAllSubdivisions, getSubdivisionsCount } = new SubdivisionsClient();

export const SubdivisionDisplay = () => {
  const [subdivisionStatusCodeFilter, setSubdivisionStatusCodeFilter] =
    useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [sortParam, setSortParam] = useState<string>("");

  useEffect(() => {
    fetchSubdivisions(
      subdivisionStatusCodeFilter,
      pageNumber,
      limit,
      sortParam
    );
    fetchSubdivisionsCount(subdivisionStatusCodeFilter);
  }, [subdivisionStatusCodeFilter, pageNumber, limit, sortParam]);

  const [subdivisions, setSubdivisions] = React.useState<Subdivision[]>([]);
  const [subdivisionsCount, setSubdivisionsCount] = React.useState<number>(0);

  const fetchSubdivisions = async (
    filter: string,
    pageNumber: number,
    limit: number,
    sortParam: string
  ) => {
    try {
      const subdivisions = await getAllSubdivisions(
        filter,
        pageNumber,
        limit,
        sortParam.toLowerCase().replace(/\s/g, "")
      );
      setSubdivisions(subdivisions);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSubdivisionsCount = async (filter: string) => {
    try {
      const subdivisionsCount = await getSubdivisionsCount(filter);
      setSubdivisionsCount(subdivisionsCount);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div
        style={{
          margin: 12,
          display: "flex",
          flexDirection: "row",
          gap: 12
        }}
      >
        <DropDownComponent
          buttonText={"Subdivision status code filter"}
          list={subdivisionStatusCodes}
          onSelect={(value) => setSubdivisionStatusCodeFilter(value)}
          displayClearOption={subdivisionStatusCodeFilter.length > 0}
        />
        <DropDownComponent
          buttonText={"Sort"}
          list={sortParams}
          onSelect={(value) => setSortParam(value)}
          displayClearOption={sortParam.length > 0}
        />
      </div>
      <SubdivisionTableComponent
        subdivisions={subdivisions}
        pageNumber={pageNumber}
        limit={limit}
        subdivisionsCount={subdivisionsCount}
        setPageNumber={setPageNumber}
        setLimit={setLimit}
      />
    </div>
  );
};
