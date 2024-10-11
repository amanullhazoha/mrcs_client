import { API } from "../config/axiosConfig";

const getReviews = () => {
  return API.get(`/reviews/show`);
};

const getLoggedInUserReview = (token) => {
  return API.get(`/reviews/logged-in-user`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

const addReview = (values, token) => {
  return API.post(`/reviews/add`, values, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

const ReviewService = {
  addReview,
  getReviews,
  getLoggedInUserReview,
};

export default ReviewService;
