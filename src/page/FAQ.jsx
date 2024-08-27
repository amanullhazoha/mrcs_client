import { BsBookFill } from "react-icons/bs";
import FaqService from "../service/FaqService";
import { Link, useParams } from "react-router-dom";
import React, { Fragment, useEffect, useState } from "react";
import { Box, Breadcrumbs, Typography } from "@mui/material";
import PackageBreadcrumb from "../components/common/PackageBreadcrumb";

const Faq = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();

  // Fetch User Data
  useEffect(() => {
    fetchData(id);
  }, [id]);

  const fetchData = async () => {
    const res = await FaqService.getFaq();

    setData(res.data);
  };

  return (
    <Fragment>
      <div>
        <PackageBreadcrumb>
          <Breadcrumbs aria-label="breadcrumb">
            <Typography color="green">FAQ</Typography>
          </Breadcrumbs>
        </PackageBreadcrumb>

        <div className="w-full bg-white flex flex-col rounded-md justify-center items-center">
          <div className="flex justify-center items-center flex-col ">
            <span className="py-2 text-sm font-sans text-teal-400">
              🌟{data?.faq_title}🌟
            </span>
          </div>
          {/* <div className="flex justify-center items-center ">
            <img src={data?.image} alt="" className="w-60 h-48" />
          </div> */}
          <div className="flex flex-col justify-center items-center px-4 w-full mt-5 mx-auto">
            {/* <div className="flex flex-col px-4 w-full mx-auto">
              <div className="text-lg text-emerald-500 font-medium font-sans mr-2 ">
                {"Description :"}
              </div>
              <div className="">{data?.study_description}</div>
            </div> */}
            <div className="w-full px-4 mt-5">
              {data?.faq_description ? (
                <div dangerouslySetInnerHTML={{ __html: data?.faq_description }} />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Faq;
