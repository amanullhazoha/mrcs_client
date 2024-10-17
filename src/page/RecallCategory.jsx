import Cookie from "js-cookie";
import { Fragment } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "../config/axiosConfig";
import Card from "../components/common/Card";
import { BsBoxSeamFill } from "react-icons/bs";
import { Box, Breadcrumbs } from "@mui/material";
import UserService from "../service/UserService";
import NotFound from "../components/common/NotFound";
import { CommonProgress } from "../components/common/CommonProgress";
import PackageBreadcrumb from "../components/common/PackageBreadcrumb";

const RecallCategory = () => {
  const id = localStorage.getItem("userid");
  const [userType, setUserType] = useState("");
  const access_token = Cookie.get("mrcs_cookie");

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await UserService.getSingleUser(access_token);
        setUserType(res?.data?.usertype);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUserData();
  }, [id]);

  const { data, isLoading, isError } = useQuery("recall-category-data", () =>
    API.get("/recall-category").then((res) =>
      res.data.filter((item) => item.cat_status === "active")
    )
  );

  if (isLoading) {
    return (
      <div>
        <CommonProgress />
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <NotFound />
      </div>
    );
  }

  return (
    <Fragment>
      <div>
        <PackageBreadcrumb>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="grey" href="/recall-category">
              <Box sx={{ justifyContent: "center", display: "flex" }}>
                <BsBoxSeamFill
                  size={23}
                  className="min-w-max text-emerald-500"
                />
                <span className="text-emerald-400 ">
                  &nbsp; Recall Categories{" "}
                </span>
              </Box>
            </Link>
          </Breadcrumbs>
        </PackageBreadcrumb>
        <div className="grid lg:grid-cols-5 gap-6 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-2 mt-5">
          {data
            ?.sort((a, b) =>
              a.accessibility === b.accessibility
                ? 0
                : a.accessibility === "unpaid"
                ? -1
                : 1
            )
            ?.map((item) => (
              <Card
                number={""}
                title={item?.cat_name}
                key={item._id}
                title2={"recall questions"}
                image={item?.image}
                link={`/recall-category/recall?category=${item?.cat_name}`}
                disabled={
                  item?.accessibility === "paid" && userType === "unpaid"
                }
              />
            ))}
        </div>
      </div>
    </Fragment>
  );
};

export default RecallCategory;
