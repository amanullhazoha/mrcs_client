import Cookie from "js-cookie";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { API } from "../config/axiosConfig";
import Card from "../components/common/Card";
import UserService from "../service/UserService";
import StudyService from "../service/StudyService";
import SliderService from "../service/SliderService";
import { FaClipboardQuestion } from "react-icons/fa6";
import ControlService from "../service/ControlService";
import { FaFileCircleQuestion } from "react-icons/fa6";
import ReviewCard from "../components/common/ReviewCard";
import PopupModal from "../components/common/PopupModal";
import ReviewModal from "../components/common/ReviewModal";
import React, { Fragment, useEffect, useState } from "react";
import CommonButton from "../components/common/CommonButton";
import ReviewCarousel from "../components/common/ReviewCarousel";
import { CommonProgress } from "../components/common/CommonProgress";

const Dashboard = () => {
  const id = localStorage.getItem("userid");
  const access_token = Cookie.get("mrcs_cookie");

  const [slider, setSlider] = useState([]);
  const [study, setStudy] = useState([]);
  const [control, setControl] = useState([]);
  const [userType, setUserType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
    localStorage.setItem("modalShown", "true");
  };

  const {
    data: popularquiz,
    isLoading,
    isError,
  } = useQuery("myData", () =>
    API.get("/category").then((res) =>
      res.data.filter((item) => item.cat_status === "active")
    )
  );

  const {
    data: recallCategories,
    isLoading: recallLoading,
    isError: isRecallError,
  } = useQuery("recall_categories", () =>
    API.get("/recall-category").then((res) =>
      res.data.filter((item) => item.cat_status === "active")
    )
  );

  const {
    data: reviews,
    isReviewLoading,
    isReviewError,
  } = useQuery("reviews", () =>
    API.get("/reviews/show").then((res) => res.data)
  );

  const {
    data: loginUserReview,
    isLoginUserReviewLoading,
    isLoginUserReview,
  } = useQuery("myReview", () =>
    API.get("/reviews/logged-in-user", {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.data)
  );

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await UserService.getSingleUser(access_token);

        const modalShownFlag = localStorage.getItem("modalShown") === "true";

        setUserType(res?.data?.usertype);

        if (res?.data?.usertype === "unpaid" && !modalShownFlag) {
          setIsModalOpen(true);
        }
      } catch (error) {
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
          (item) => item.status === "active"
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
      <Helmet>
        <title>
          MRCS Part A Exam Preparation | Comprehensive Resources and Study
          Guides - mrcsaid.com
        </title>

        <meta
          name="description"
          content="Prepare for the MRCS Part A exam with mrcsaid.com. Access expert guidelines, study tips, mock tests, and an extensive recall question bank to boost your success."
        />
      </Helmet>

      <div className="xl:px-12 xs:px-0 lg:px-10">
        <div className="flex lg:flex-row md:flex-row space-x-5 xs:flex-col border-2 rounded-lg mb-8">
          {slider?.map((slider, i) =>
            slider.status === "active" ? (
              <div
                key={i + 1}
                className="bg-white rounded-lg justify-center items-center  p-[5px] md:p-5 flex flex-col w-full shadow-sm  "
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
            ) : null
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

                  <span className="text-center lg:text-[25px] xs:text-[20px] text-[30px] xs:pl-0 items-center font-sans font-semibold inline-block bg-clip-text text-[#363431]">
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

        <div className="w-full  mt-10 flex justify-between ">
          <span className="lg:text-xl xs:text-md md:text-lg font-medium font-sans text-emerald-600 ">
            📚 Study Materials
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
          {study
            ?.slice(0, 8)
            ?.sort((a, b) =>
              a.accessibility === b.accessibility
                ? 0
                : a.accessibility === "unpaid"
                ? -1
                : 1
            )
            .map((study, i) => (
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

        <div className="w-full  mt-10 flex justify-between ">
          <span className="lg:text-xl xs:text-lg md:text-lg font-medium font-sans text-emerald-600 flex items-center gap-1.5">
            <FaClipboardQuestion className="text-red-500" />
            Recall Questions
          </span>
          <Link to="/all-recall-question">
            <CommonButton color="secondary" width={120} height={40}>
              View More
            </CommonButton>
          </Link>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-2 mt-3">
          {recallCategories
            ?.slice(0, 8)
            ?.sort((a, b) =>
              a.accessibility === b.accessibility
                ? 0
                : a.accessibility === "unpaid"
                ? -1
                : 1
            )
            .map((item) => (
              <Card
                number={""}
                key={item._id}
                title2={"recall questions"}
                image={item?.image}
                title={item?.cat_name}
                link={`/recall-category/recall?category=${item?.cat_name}`}
                disabled={
                  item?.accessibility === "paid" && userType === "unpaid"
                }
              />
            ))}
        </div>

        <div className="w-full  mt-10 flex justify-between ">
          <span className="lg:text-xl xs:text-lg md:text-lg font-medium font-sans text-emerald-600 flex items-center gap-1.5">
            <FaFileCircleQuestion className="text-red-900" />
            Mock Tests
          </span>
          <Link to="/allquiz">
            <CommonButton color="secondary" width={120} height={40}>
              View More
            </CommonButton>
          </Link>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-2 mt-3">
          {popularquiz
            ?.slice(0, 8)
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
                key={item._id}
                title2={"quizes"}
                image={item?.image}
                title={item?.cat_name}
                link={`/category/quiz?category=${item?.cat_name}`}
                disabled={
                  item?.accessibility === "paid" && userType === "unpaid"
                }
              />
            ))}
        </div>

        <div className="w-full mt-10 pt-5 flex justify-between bg-[#FAF6E8] rounded-t-lg">
          <span className="lg:text-4xl text-2xl font-medium font-sans text-emerald-600 text-center w-full">
            Candidate's Feedback
          </span>

          {userType === "paid" && !loginUserReview && (
            // <div className="w-full">
            <button
              className="w-[230px] h-[40px] bg-red-600 text-white rounded-full font-bold font-[Roboto, Helvetica, Arial, sans-serif] hover:bg-red-500"
              onClick={() => setIsReviewOpen(true)}
            >
              <span className="xs:text-xs md:text-sm lg:text-xs xl:text-sm">
                ADD YOUR REVIEW
              </span>
            </button>
            // </div>
          )}
        </div>

        {reviews?.length > 0 && <ReviewCarousel reviews={reviews} />}

        {isModalOpen && (
          <PopupModal isOpen={isModalOpen} onClose={closeModal} />
        )}

        {isReviewOpen && (
          <ReviewModal
            isOpen={isReviewOpen}
            onClose={() => setIsReviewOpen(false)}
          />
        )}
      </div>
    </Fragment>
  );
};

export default Dashboard;
