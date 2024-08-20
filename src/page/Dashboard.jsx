import React, { Fragment, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { API } from "../config/axiosConfig";
import { CommonProgress } from "../components/common/CommonProgress";

import CommonButton from "../components/common/CommonButton";
import Card from "../components/common/Card";
import SliderService from "../service/SliderService";
import StudyService from "../service/StudyService";
import { Link } from "react-router-dom";
import { hero } from "../assets";
import UserService from "../service/UserService";
import PopupModal from "../components/common/PopupModal";
import ControlService from "../service/ControlService";

const Dashboard = () => {
  const [slider, setSlider] = useState([]);
  const [study, setStudy] = useState([]);
  const [control, setControl] = useState([]);
  const [userType, setUserType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const id = localStorage.getItem("userid");

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await UserService.getSingleUser(id);

        // Convert the string value to a boolean
        const modalShownFlag = localStorage.getItem("modalShown") === "true";

        setUserType(res?.data?.usertype);

        if (res?.data?.usertype === "unpaid" && !modalShownFlag) {
          setIsModalOpen(true);
          // Set the flag in localStorage to prevent modal from showing again
        }
      } catch (error) {
        // Handle any error that might occur while fetching user data
        console.error("Error fetching user data:", error);
      }
    };

    getUserData(id);
  }, [id]);

  useEffect(() => {
    const fetchSlider = async () => {
      try {
        const response = await SliderService.getSlider();
        setSlider(response?.data);
      } catch (error) {
        console.error("Error fetching slider:", error);
      }
    };
    const fetchStudy = async () => {
      try {
        const response = await StudyService.getStudy();
        setStudy(response?.data);
      } catch (error) {
        console.log("Error fetching study:", error);
      }
    };
    const fetchControl = async () => {
      try {
        const response = await ControlService.getControl();
        const activeControl = response?.data?.filter(
          (item) => item.status === "active",
        );
        setControl(activeControl);
      } catch (error) {
        console.error("Error fetching slider:", error);
      }
    };

    fetchSlider();
    fetchStudy();
    fetchControl();
  }, []);

  const {
    data: popularquiz,
    isLoading,
    isError,
  } = useQuery("myData", () =>
    API.get("/category").then((res) =>
      res.data.filter((item) => item.cat_status === "active"),
    ),
  );

  const closeModal = () => {
    setIsModalOpen(false);
    localStorage.setItem("modalShown", "true");
  };

  if (isLoading) {
    return (
      <div>
        <CommonProgress />
      </div>
    );
  }
  if (isError) {
    return <div>Error fetching data </div>;
  }
  return (
    <Fragment>
      <div className="xl:px-12 xs:px-0 lg:px-10">
        <div className="flex lg:flex-row md:flex-row space-x-5 xs:flex-col border-2 rounded-lg mb-8">
          {slider?.map((slider, i) =>
            slider.status === "active" ? (
              <div
                key={i + 1}
                className="bg-white rounded-lg justify-center items-center  p-5 flex flex-col w-full shadow-sm  "
              >
                {slider?.imageUrl && (
                  <div className="h-auto  w-full top-0 ">
                    <img
                      src={slider?.imageUrl}
                      alt="slider"
                      className="w-full h-full  object-contain rounded-2xl "
                    />
                  </div>
                )}
                {slider?.text && (
                  <span className="lg:text-xl text-sm text-gray-700 font-semibold font-sans justify-center flex items-center text-center  px-5 pt-3">
                    {" 👋 "}
                    {slider?.text}
                  </span>
                )}
              </div>
            ) : null,
          )}
        </div>

        <div className="px-4 rounded-lg bg-white mb-8 border-2 xs:pb-5">
          <div className=" overflow-hidden h-full w-full">
            <div className="flex-col lg:flex-row flex xs:flex-col lg:justify-between xs:justify-center justify-center items-center h-full w-full">
              <div className="lg:w-full xs:w-full w-full flex justify-center items-center ">
                <div className="w-full flex flex-col h-full items-center text-center ">
                  <span className="pt-5 lg:text-[30px] xs:text-[25px] md:text-[35px] sm:text-[30px] text-center pb-2 md:pb-5 font-sans font-bold inline-block bg-gradient-to-r from-purple-400 to-emerald-700 text-transparent bg-clip-text">
                    {control
                      ? control[0]?.title
                      : "Making Your MRCS Journey Easiest"}
                  </span>

                  <span className="text-center pt-4 lg:text-[25px] xs:text-[20px] text-[30px] xs:pl-0 items-center font-sans font-semibold inline-block bg-clip-text text-[#363431]">
                    {control
                      ? control[0]?.subtitle
                      : "If you never try, You will never win"}
                  </span>

                  <br />

                  <Link to="/studyplan">
                    <button className="py-3 rounded-full px-16  bg-gradient-to-r from-emerald-500 to-indigo-400 text-lg font-bold text-white ">
                      {control[0]?.buttonName}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Study material  */}

        <div className="w-full  mt-10 flex justify-between ">
          <span className="lg:text-xl xs:text-md md:text-lg font-medium font-sans text-emerald-600 ">
            📚 Study Material
          </span>
          <Link to="/allstudy">
            <CommonButton
              color="secondary"
              width={120}
              height={40}
              className="mr-5"
            >
              View More
            </CommonButton>
          </Link>
        </div>
        <div className="grid lg:grid-cols-5 gap-6 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-2 mt-3 w-full items-center mx-auto">
          {study?.slice(0, 8).map((study, i) => (
            <Card
              key={i}
              title={study?.study_name}
              image={study?.image}
              title2={study?.study_title}
              link={`/allstudy/study/${study?._id} `}
            />
          ))}
        </div>

        <div className="w-full  mt-10 flex justify-between ">
          <span className="lg:text-xl xs:text-lg md:text-lg font-medium font-sans text-emerald-600 ">
            ⭐ Recall Questions
          </span>
          <Link to="/allquiz">
            <CommonButton color="secondary" width={120} height={40}>
              View More
            </CommonButton>
          </Link>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-2 mt-3">
          {popularquiz?.slice(0, 8).map((item) => (
            <Card
              number={""}
              key={item._id}
              title2={"quizes"}
              image={item?.image}
              title={item?.cat_name}
              link={`/category/quiz?category=${item?.cat_name}`}
              disabled={item?.accessibility === "paid" && userType === "unpaid"}
            />
          ))}
        </div>

        {/* popular quiz category */}
        <div className="w-full  mt-10 flex justify-between ">
          <span className="lg:text-xl xs:text-lg md:text-lg font-medium font-sans text-emerald-600 ">
            ⭐ Popular Mock Test
          </span>
          <Link to="/allquiz">
            <CommonButton color="secondary" width={120} height={40}>
              View More
            </CommonButton>
          </Link>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-2 mt-3">
          {popularquiz?.slice(0, 8).map((item) => (
            <Card
              number={""}
              key={item._id}
              title2={"quizes"}
              image={item?.image}
              title={item?.cat_name}
              link={`/category/quiz?category=${item?.cat_name}`}
              disabled={item?.accessibility === "paid" && userType === "unpaid"}
            />
          ))}
        </div>

        {isModalOpen && (
          <PopupModal isOpen={isModalOpen} onClose={closeModal} />
        )}
      </div>
    </Fragment>
  );
};

export default Dashboard;
