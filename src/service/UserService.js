import { API, FAPI } from "../config/axiosConfig";

// const getSingleUser = (id)=>{
//   return API.get(`/users/${id}`)
// }

const getSingleUser = (token) => {
  return API.get(`/users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

const UploadImage = (values, token) => {
  return FAPI.put(`/users/profile/update`, values, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

const updateUser = (values, token) => {
  return API.put(`/users/profile/update`, values, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

const getSubscription = () => {
  return API.get("/subscription");
};

const UserService = {
  updateUser,
  UploadImage,
  getSingleUser,
  getSubscription,
};

export default UserService;
