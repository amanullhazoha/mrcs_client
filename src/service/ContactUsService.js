import { API } from "../config/axiosConfig";


const sendContactMessage = (values) => {
  return API.post("/contact-us", values);
};


const ContactUsService = {
    sendContactMessage,
};

export default ContactUsService;
