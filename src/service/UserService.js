import { API, FAPI } from "../config/axiosConfig"




// const getSingleUser = (id)=>{
//   return API.get(`/users/${id}`)
// }

const getSingleUser = ()=>{
  return API.get(`/users/profile`)
}

const UploadImage = (id,values)=>{
  return FAPI.put(`/users/profile/update`,values);
}

const updateUser = (id,values)=>{
  return API.put(`/users/profile/update`,values);
}

const getSubscription = ()=>{
  return API.get('/subscription');
}


const UserService = { 
  getSingleUser,
  UploadImage,
  updateUser,
  getSubscription
};

export default UserService;
