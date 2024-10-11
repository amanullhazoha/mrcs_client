import Cookie from "js-cookie";
import { Link } from "react-router-dom";
import Card from "../components/common/Card";
import { MdOutlineQuiz } from "react-icons/md";
import { Box, Breadcrumbs } from "@mui/material";
import UserService from "../service/UserService";
import RecallService from "../service/RecallService";
import React, { Fragment, useEffect, useState } from "react";
import { CommonProgress } from "../components/common/CommonProgress";
import PackageBreadcrumb from "../components/common/PackageBreadcrumb";

const AllRecall = () => {
  const [data, setData] = useState([]);
  const id = localStorage.getItem("userid");
  const [userType, setUserType] = useState("");
  const access_token = Cookie.get("mrcs_cookie");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await RecallService.getRecall();

        setData(res.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);

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

    getUserData(id);
    fetchData();
  }, [id]);

  return (
    <Fragment>
      <div>
        <PackageBreadcrumb>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="grey" href="/recall-category">
              <Box sx={{ justifyContent: "center", display: "flex" }}>
                <MdOutlineQuiz
                  size={23}
                  className="min-w-max text-emerald-500"
                />
                <span className="text-emerald-400 ">
                  &nbsp;All Recall Question{" "}
                </span>
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
            {data.map((recall, i) => (
              <Card
                key={i}
                title={recall?.recall_name}
                number={""}
                image={recall?.image}
                title2={"Question"}
                link={`/recall-detail?id=${recall?._id}`}
                disabled={
                  recall?.accessibility === "paid" && userType === "unpaid"
                }
              />
            ))}
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default AllRecall;
