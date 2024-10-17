import Cookie from "js-cookie";
import React, { Fragment, useEffect, useState } from "react";
import { Box, Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import ShuffleArray from "../constants/ShuffleArray";
import UserService from "../service/UserService";

//Internal Import
import PackageBreadcrumb from "../components/common/PackageBreadcrumb";

import StudyService from "../service/StudyService";

import Card from "../components/common/Card";
import { BsBookFill } from "react-icons/bs";
import { CommonProgress } from "../components/common/CommonProgress";
const AllStudy = () => {
  const [data, setData] = useState([]);
  const [userType, setUserType] = useState("");
  const access_token = Cookie.get("mrcs_cookie");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch User Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await StudyService.getStudy();
        const suffleData = ShuffleArray(res.data);
        setData(suffleData);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await QuizService.getQuiz();

        setData(res.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    const getUserData = async () => {
      try {
        const res = await UserService.getSingleUser(access_token);

        setUserType(res?.data?.usertype);
      } catch (error) {}
    };

    getUserData();
  }, [access_token]);

  return (
    <Fragment>
      <div>
        <PackageBreadcrumb>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="grey" href="/allstudy">
              <Box sx={{ justifyContent: "center", display: "flex" }}>
                <BsBookFill size={23} className="min-w-max text-emerald-500" />
                <span className="text-emerald-400 ">&nbsp;All Study </span>
              </Box>
            </Link>
            {/* <Typography color="grey">sdfgh</Typography> */}
          </Breadcrumbs>
        </PackageBreadcrumb>
        {isLoading ? (
          <div>
            <CommonProgress />
          </div>
        ) : (
          <div className="grid lg:grid-cols-5 gap-4 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-2  mt-5">
            {data?.map((study, i) => (
              <Card
                key={i}
                title={study?.study_name}
                image={study?.image}
                title2={study?.study_title}
                link={`/allstudy/study/${study?._id} `}
                disabled={
                  study?.accessibility === "paid" && userType === "unpaid"
                }
              />
            ))}
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default AllStudy;
