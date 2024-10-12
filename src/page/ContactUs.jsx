import React, { Fragment } from "react";
import { Formik, Form, Field } from "formik";
import ContactUsService from "../service/ContactUsService";
import { Box, Breadcrumbs, Typography } from "@mui/material";
import PackageBreadcrumb from "../components/common/PackageBreadcrumb";
import contactUsValidationSchema from "../utils/validation/contactUsValidation";

const ContactUs = () => {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await ContactUsService.sendContactMessage(values);

      if (response.status === 201) {
        resetForm();
        toast.success("Contact message send successfully");
      } else if (response.status === 200) {
        resetForm();
        toast.success("Contact message send successfully");
      } else {
        toast.error("Something went wrong while sending the message");
      }
    } catch (error) {
      console.log("Error while sending message: ", error);
      toast.error("Something went wrong while sending the message");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Fragment>
      <div>
        <PackageBreadcrumb>
          <Breadcrumbs aria-label="breadcrumb">
            <Typography color="green">Contact Us</Typography>
          </Breadcrumbs>
        </PackageBreadcrumb>

        <div className="w-full bg-white flex flex-col rounded-md">
          <div className="py-5 px-5">
            <Formik
              initialValues={{
                email: "",
                phone: null,
                subject: "",
                message: "",
                full_name: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={contactUsValidationSchema}
            >
              {({ values, errors, touched, isSubmitting, setFieldValue }) => (
                <Form className="grid md:grid-cols-2 gap-5">
                  <div className="mb-4 pt-2 w-full max-sm:col-span-2">
                    <label
                      htmlFor="question_name"
                      className="block text-gray-800  font-md mb-2"
                    >
                      Full Name:
                    </label>

                    <Field
                      type="text"
                      name="full_name"
                      placeholder="Enter full name"
                      error={touched.full_name && errors.full_name}
                      className={`appearance-none block w-full px-3 py-2 border border-gray-300 
                                      rounded-md shadow-sm placeholder-gray-400 
                                      focus:ring-green-500 focus:border-green-500 focus:ring-1 sm:text-sm ${
                                        touched.full_name && errors.full_name
                                          ? "border-red-500"
                                          : ""
                                      }`}
                    />

                    {touched.full_name && errors.full_name && (
                      <p className="mt-2 text-sm text-red-600 ">
                        {errors.full_name}
                      </p>
                    )}
                  </div>

                  <div className="mb-4 pt-2 w-full  max-sm:col-span-2">
                    <label
                      htmlFor="question_name"
                      className="block text-gray-800  font-md mb-2"
                    >
                      Email:
                    </label>

                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      error={touched.email && errors.email}
                      className={`appearance-none block w-full px-3 py-2 border border-gray-300 
                                      rounded-md shadow-sm placeholder-gray-400 
                                      focus:ring-green-500 focus:border-green-500 focus:ring-1 sm:text-sm ${
                                        touched.email && errors.email
                                          ? "border-red-500"
                                          : ""
                                      }`}
                    />

                    {touched.email && errors.email && (
                      <p className="mt-2 text-sm text-red-600 ">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="mb-4 pt-2 w-full  max-sm:col-span-2">
                    <label
                      htmlFor="question_name"
                      className="block text-gray-800  font-md mb-2"
                    >
                      Phone:
                    </label>

                    <Field
                      name="phone"
                      type="number"
                      placeholder="Enter your phone number"
                      error={touched.phone && errors.phone}
                      className={`appearance-none block w-full px-3 py-2 border border-gray-300 
                                      rounded-md shadow-sm placeholder-gray-400 
                                      focus:ring-green-500 focus:border-green-500 focus:ring-1 sm:text-sm ${
                                        touched.phone && errors.phone
                                          ? "border-red-500"
                                          : ""
                                      }`}
                    />

                    {touched.phone && errors.phone && (
                      <p className="mt-2 text-sm text-red-600 ">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="mb-4 pt-2 w-full  max-sm:col-span-2">
                    <label
                      htmlFor="question_name"
                      className="block text-gray-800  font-md mb-2"
                    >
                      Subject:
                    </label>

                    <Field
                      type="text"
                      name="subject"
                      placeholder="Enter your contact subject"
                      error={touched.subject && errors.subject}
                      className={`appearance-none block w-full px-3 py-2 border border-gray-300 
                                      rounded-md shadow-sm placeholder-gray-400 
                                      focus:ring-green-500 focus:border-green-500 focus:ring-1 sm:text-sm ${
                                        touched.subject && errors.subject
                                          ? "border-red-500"
                                          : ""
                                      }`}
                    />

                    {touched.subject && errors.subject && (
                      <p className="mt-2 text-sm text-red-600 ">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div className="mb-4 pt-2 w-full col-span-2">
                    <label
                      htmlFor="question_name"
                      className="block text-gray-800  font-md mb-2"
                    >
                      Message:
                    </label>

                    <textarea
                      value={values.message}
                      name="message"
                      rows="4"
                      cols="50"
                      placeholder="Enter your contact subject"
                      onChange={(e) => setFieldValue("message", e.target.value)}
                      className={`appearance-none block w-full px-3 py-2 border border-gray-300 
                                rounded-md shadow-sm placeholder-gray-400 
                                focus:ring-green-500 focus:border-green-500 focus:ring-1 sm:text-sm ${
                                  touched.message && errors.message
                                    ? "border-red-500"
                                    : ""
                                }`}
                    />

                    {touched.message && errors.message && (
                      <p className="mt-2 text-sm text-red-600 ">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-[#02b455] hover:bg-[#22c55e] outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 col-span-2"
                  >
                    Send
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ContactUs;
