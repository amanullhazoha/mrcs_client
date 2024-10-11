import { debounce } from "lodash";
import { Link } from "react-router-dom";
import { BsTrophyFill } from "react-icons/bs";
import resultHeader from "../constants/resultHeader";
import { Box, Breadcrumbs, Stack } from "@mui/material";
import QuestionService from "../service/QuestionService";
import CommonTable from "../components/common/CommonTable";
import React, { Fragment, useEffect, useState } from "react";
import CustomSearchField from "../components/common/SearchField";
import PackageBreadcrumb from "../components/common/PackageBreadcrumb";

const Results = () => {
  const [data, setData] = useState([]);
  const userid = localStorage.getItem("userid");
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchData(userid);
  }, [userid]);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const res = await QuestionService.getResult(userid);
      setData(res?.data?.results);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  const handleSearchQueryChange = debounce((query) => {
    setSearchQuery(query);
  }, 500);

  const filteredData = data?.filter((result) =>
    result.quizName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Fragment>
      <div>
        <PackageBreadcrumb>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="grey" href="/">
              <Box
                sx={{
                  justifyContent: "center",
                  display: "flex",
                  color: "green",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                <BsTrophyFill
                  size={23}
                  className="min-w-max text-emerald-500"
                />
                &nbsp; Result
              </Box>
            </Link>
          </Breadcrumbs>
        </PackageBreadcrumb>
        <Stack
          direction={{
            lg: "row",
            xs: "column",
            sm: "column",
            md: "row",
          }}
          justifyContent={"space-between"}
        >
          <CustomSearchField
            name={"Search by QuizName"}
            onChange={handleSearchQueryChange}
          />
        </Stack>
        <div className="pt-5">
          <CommonTable
            isLoading={isLoading}
            columns={resultHeader}
            data={filteredData}
            typeData={"result"}
            onDeleted={fetchData}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Results;
