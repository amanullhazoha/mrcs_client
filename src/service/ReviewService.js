import { API, FAPI } from "../config/axiosConfig"

const getReviews = (id)=>{
  return API.get(`/reviews`)
}

const addReview = (values)=>{
  return FAPI.put(`/reviews/add`,values);
}

const ReviewService = { 
  getReviews,
  addReview,
};

export default ReviewService;
