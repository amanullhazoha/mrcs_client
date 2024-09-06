import * as Yup from "yup";

const contactUsValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email("** Invalid email address")
        .required("** Email is Required"),
    phone: Yup.number()
        .required("** Phone number is Required"),
    subject: Yup.string()
        .required("** Subject is Required"),
    message: Yup.string()
        .required("** Message is Required"),
    full_name: Yup.string()
        .required("** Full name is Required"),
});

export default contactUsValidationSchema;
