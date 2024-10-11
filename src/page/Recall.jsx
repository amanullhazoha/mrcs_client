import Cookie from "js-cookie";
import { useQuery } from "react-query";
import { API } from "../config/axiosConfig";
import Card from "../components/common/Card";
import { Box, Breadcrumbs } from "@mui/material";
import UserService from "../service/UserService";
import { Link, useLocation } from "react-router-dom";
import NotFound from "../components/common/NotFound";
import React, { Fragment, useState, useEffect } from "react";
import { CommonProgress } from "../components/common/CommonProgress";
import PackageBreadcrumb from "../components/common/PackageBreadcrumb";
import { BsBoxSeamFill, BsFillPatchQuestionFill } from "react-icons/bs";

const Recall = () => {
  const location = useLocation();
  const id = localStorage.getItem("userid");
  const [userType, setUserType] = useState("");
  const access_token = Cookie.get("mrcs_cookie");
  const category = new URLSearchParams(location.search).get("category");

  const { data, isLoading, isError } = useQuery(["myData", category], () =>
    API.get(`/recall/recallbycategory?category=${category}`).then(
      (res) => res.data
    )
  );

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await UserService.getSingleUser(access_token);

        setUserType(res?.data?.usertype);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUserData(id);
  }, [id]);

  return (
    <Fragment>
      <div>
        <PackageBreadcrumb>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="grey" to="/recall-category">
              <Box sx={{ justifyContent: "center", display: "flex" }}>
                <BsBoxSeamFill
                  size={23}
                  className="min-w-max text-emerald-500"
                />
                <span className="text-emerald-400 ">
                  &nbsp; All Recall Category{" "}
                </span>
              </Box>
            </Link>
            <Box sx={{ justifyContent: "center", display: "flex" }}>
              <BsFillPatchQuestionFill
                size={23}
                className="min-w-max text-emerald-700"
              />
              <span className="text-emerald-700 ">&nbsp; {category}</span>
            </Box>
          </Breadcrumbs>
        </PackageBreadcrumb>
        {isLoading ? (
          <CommonProgress />
        ) : (
          <div>
            {data ? (
              <div className="grid lg:grid-cols-5 gap-5 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-2 mt-5">
                {data?.map((item) => (
                  <Card
                    title={item?.recall_name}
                    number={""}
                    image={item?.image}
                    desc={item?.recall_description}
                    title2={"questions"}
                    link={`/recall-detail?id=${item?._id}`}
                    key={item?._id}
                    disabled={
                      item?.accessibility === "paid" && userType === "unpaid"
                    }
                  />
                ))}
              </div>
            ) : (
              <NotFound />
            )}
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Recall;
