//External Import
import React, { Fragment, useEffect, useState } from "react";
import { Box, Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";

//Internal Import
import PackageBreadcrumb from "../components/common/PackageBreadcrumb";
import { MdOutlineQuiz } from "react-icons/md";

import RecallService from "../service/RecallService";
import Card from "../components/common/Card";
import UserService from "../service/UserService";
import { CommonProgress } from "../components/common/CommonProgress";
import ShuffleArray from "../constants/ShuffleArray";

const AllRecall = () => {
  const [data, setData] = useState([]);
  const [userType, setUserType] = useState("");
  const id = localStorage.getItem("userid");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch User Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await RecallService.getRecall();
        // const suffleData = ShuffleArray(res.data);
        setData(res.data);
        setIsLoading(false); // After fetching data, set isLoading to false
      } catch (error) {
        // Handle any error that might occur during data fetching
        console.error("Error fetching data:", error);
        setIsLoading(false); // Set isLoading to false even if there's an error
      }
    };

    const getUserData = async () => {
      try {
        const res = await UserService.getSingleUser(id);
        setUserType(res?.data?.usertype);
      } catch (error) {
        // Handle any error that might occur while fetching user data
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
                <span className="text-emerald-400 ">&nbsp;All Recall Question </span>
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
