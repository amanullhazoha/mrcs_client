import { API } from "../config/axiosConfig";

const getRecall = () => {
  return API.get("/recall");
};

const getSingleRecall = (id) => {
  return API.get(`/recall/${id}`);
};

const RecallService = {
  getRecall,
  getSingleRecall
};

export default RecallService;