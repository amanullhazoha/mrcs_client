import Cookie from "js-cookie";
import { Profile } from "../assets";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { HiOutlineKey } from "react-icons/hi";
import { Box, Breadcrumbs } from "@mui/material";
import UserService from "../service/UserService";
import AddUser from "../components/Users/AddUser";
import React, { Fragment, useEffect, useState } from "react";
import ChangePassword from "../components/Users/ChangePassword";
import PackageBreadcrumb from "../components/common/PackageBreadcrumb";

const User = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [popen, setPopen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const access_token = Cookie.get("mrcs_cookie");

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handlePOpen = () => setPopen(true);

  const handlePClose = () => setPopen(false);

  const fetchData = async (access_token) => {
    try {
      const res = await UserService.getSingleUser(access_token);

      return res.data;
    } catch (error) {
      throw error;
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));

    uploadImage(file);
  };

  const uploadImage = async (file) => {
    try {
      const formData = new FormData();

      formData.append("image", file);

      await UserService.UploadImage(formData, access_token);

      toast.success("Profile Image Upload Successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await fetchData();

        setData(userData);
      } catch (error) {
        // Handle the error here or display an error message to the user.
      }
    };

    getUserData();
  }, [access_token]);

  return (
    <Fragment>
      <div>
        <PackageBreadcrumb>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="grey" href="/">
              <Box sx={{ justifyContent: "center", display: "flex" }}>
                <FaUserAlt size={23} className="min-w-max text-emerald-500" />
                &nbsp; Profile
              </Box>
            </Link>
          </Breadcrumbs>
        </PackageBreadcrumb>

        <div className="mt-10">
          <div className="lg:flex  justify-around   rounded-md px-4 py-4 w-full ">
            <div className="lg:flex hidden">
              <img src={Profile} alt="profile" width={500} height={100} />
            </div>
            <div className="lg:w-1/2 rounded-xl px-4 py-4 bg-white">
              <div className="w-full">
                <MdEdit
                  className="cursor-pointer w-10 h-10 rounded-full bg-teal-600 hover:bg-teal-500 px-2 py-2 text-white mr-2 float-right"
                  onClick={handleOpen}
                />
              </div>
              <div className="md:lg:ml-5 py-4 flex justify-center items-center relative">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="profileImage"
                    className="w-48 h-48 rounded-full border border-emerald-500"
                  />
                ) : (
                  <div className="w-48 h-48 rounded-full border border-emerald-500 bg-gray-200 flex justify-center items-center">
                    <img
                      src={
                        data?.profile
                          ? data?.profile
                          : "https://res.cloudinary.com/dpc1nydxn/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1685778058/Flowentech/about2_ap8hdw.jpg"
                      }
                      alt="profileImage"
                      className="w-48 h-48 rounded-full border border-emerald-500"
                    />
                  </div>
                )}
                <div className="flex space-x-2 text-sm mt-24">
                  <label htmlFor="imageUpload">
                    <BiEdit className="text-gray-200 w-6 h-6 -ml-5 cursor-pointer" />
                  </label>
                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>
              <div className=" px-4 py-2 rounded-md  flex flex-col justify-center items-center w-full bg-slate-200">
                <span className="md:lg:font-bold sm:font-semibold  font-sans text-2xl text-emerald-500 ">
                  {data?.name}
                </span>

                <span className="font-medium font-sans md:lg:text-xl sm:text-lg xs:text-md text-emerald-500 py-2">
                  {data?.email}
                </span>

                <span className="font-medium font-sans text-lg text-emerald-500 py-2">
                  {data?.mobile}
                </span>
                <button
                  className="
                lg:hover:bg-teal-400 lg:hover:text-white xs:hover:text-emerald-600 font-normal md:lg:text-lg xs:text-sm sm:text-md md:border lg:border border-emerald-600  md:lg:px-4 py-1  text-emerald-600 rounded-full flex my-2"
                  type="submit"
                  onClick={handlePOpen}
                >
                  <HiOutlineKey className="w-6 h-6 rounded-full bg-purple-500 px-1 py-1 text-white mr-2" />{" "}
                  {"Change Password"}
                </button>
              </div>
            </div>
          </div>

          <ChangePassword
            open={popen}
            data={data}
            onClose={handlePClose}
            fetchData={fetchData}
          />

          <AddUser
            data={data}
            open={open}
            onClose={handleClose}
            fetchData={fetchData}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default User;
