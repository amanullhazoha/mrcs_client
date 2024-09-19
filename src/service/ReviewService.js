import { API, FAPI } from "../config/axiosConfig"

const getReviews = (id)=>{
  return API.get(`/reviews`)
}

const addReview = (values)=>{
  return API.post(`/reviews/add`, values);
}

const ReviewService = { 
  getReviews,
  addReview,
};

export default ReviewService;
