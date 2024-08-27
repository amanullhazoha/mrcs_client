import { API } from "../config/axiosConfig";


const getFaq = () => {
  return API.get("/faq");
};


const FaqService = {
    getFaq,
};

export default FaqService;
