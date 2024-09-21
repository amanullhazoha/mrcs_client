import { API, FAPI } from "../config/axiosConfig"

const getReviews = (id)=>{
  return API.get(`/reviews`)
}

const getLoggedInUserReview = ()=>{
  return API.get(`/reviews/logged-in-user`);
}

const addReview = (values)=>{
  return API.post(`/reviews/add`, values);
}

const ReviewService = { 
  addReview,
  getReviews,
  getLoggedInUserReview
};

export default ReviewService;
