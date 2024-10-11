import { API, FAPI } from "../config/axiosConfig";

const addQuestion = (values) => {
  return FAPI.post("/questions/add", values);
};

const getQuestion = () => {
  return API.get("/questions");
};

const getSingleQuestion = (id) => {
  return API.get(`/quiz/${id}`);
};

const updateQuestion = (id, values) => {
  return FAPI.put(`/questions/update/${id}`, values);
};

const deleteQuestion = (id) => {
  return API.delete(`/questions/delete/${id}`);
};

const addResult = (values) => {
  return API.post("/result/add", values);
};

const getResultbyId = (id) => {
  return API.get(`/result/singleresult/${id}`);
};

const getResult = (userid) => {
  return API.get(`/result/${userid}`);
};

const QuestionService = {
  getResult,
  addResult,
  getQuestion,
  addQuestion,
  getResultbyId,
  deleteQuestion,
  updateQuestion,
  getSingleQuestion,
};

export default QuestionService;
