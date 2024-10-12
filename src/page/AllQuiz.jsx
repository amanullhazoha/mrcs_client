import Cookie from "js-cookie";
import { Link } from "react-router-dom";
import Card from "../components/common/Card";
import { MdOutlineQuiz } from "react-icons/md";
import UserService from "../service/UserService";
import QuizService from "../service/QuizService";
import { Box, Breadcrumbs } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { CommonProgress } from "../components/common/CommonProgress";
import PackageBreadcrumb from "../components/common/PackageBreadcrumb";

const AllQuiz = () => {
  const [data, setData] = useState([]);
  const id = localStorage.getItem("userid");
  const [userType, setUserType] = useState("");
  const access_token = Cookie.get("mrcs_cookie");
  const [isLoading, setIsLoading] = useState(true);

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
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUserData();

    fetchData();
  }, [access_token]);

  return (
    <Fragment>
      <div>
        <PackageBreadcrumb>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="grey" href="/category">
              <Box sx={{ justifyContent: "center", display: "flex" }}>
                <MdOutlineQuiz
                  size={23}
                  className="min-w-max text-emerald-500"
                />
                <span className="text-emerald-400 ">&nbsp;All Mock Test </span>
              </Box>
            </Link>
          </Breadcrumbs>
        </PackageBreadcrumb>

        {isLoading ? (
          <div>
            <CommonProgress />
          </div>
        ) : (
          <div className="grid lg:grid-cols-5 gap-5 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-2 mt-5">
            {data.map((quiz, i) => (
              <Card
                key={i}
                title={quiz?.quiz_name}
                number={""}
                image={quiz?.image}
                title2={"Question"}
                link={`/questions?id=${quiz?.quiz_name}`}
                disabled={
                  quiz?.accessibility === "paid" && userType === "unpaid"
                }
              />
            ))}
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default AllQuiz;
