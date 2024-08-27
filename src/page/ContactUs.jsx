import { BsBookFill } from "react-icons/bs";
import ContactUsService from "../service/ContactUsService";
import { Link, useParams } from "react-router-dom";
import React, { Fragment, useEffect, useState } from "react";
import { Box, Breadcrumbs, Typography } from "@mui/material";
import PackageBreadcrumb from "../components/common/PackageBreadcrumb";
import { Formik, Form, Field } from "formik";

const ContactUs = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
          setIsLoading(true);
    
          const response = await ContactUsService.sendContactMessage(values);
    
          if (response.status === 201) {
            resetForm()
            toast.success("Contact message send successfully");
          } else if (response.status === 200) {
            resetForm()
            toast.success("Contact message send successfully");
          } else {
            toast.error("Something went wrong while sending the message");
          }
        } catch (error) {
          console.log("Error while sending message: ", error);
          toast.error("Something went wrong while sending the message");
        } finally {
          setIsLoading(false);
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
                        phone: "",
                        subject: "",
                        message: "",
                        full_name: "",
                    }}
                    onSubmit={handleSubmit}
                >
                    {({
                        values,
                        isSubmitting,
                        setFieldValue,
                    }) => (
                    <Form className="w-full grid grid-cols-2 gap-5">
                        <div className="mb-4 pt-2 w-full">
                            <label
                            htmlFor="question_name"
                            className="block text-gray-800  font-md mb-2"
                            >
                            Full Name :
                            </label>

                            <Field
                            type="text"
                            name="full_name"
                            placeholder="Enter full_name"
                            className={`appearance-none block w-full px-3 py-4 border border-gray-300 
                                rounded-md shadow-sm placeholder-gray-400 focus:ring-green-500
                            focus:border-green-500 focus:ring-1 sm:text-sm`}
                            />
                        </div>  

                        <div className="mb-4 pt-2 w-full">
                            <label
                            htmlFor="question_name"
                            className="block text-gray-800  font-md mb-2"
                            >
                            Email :
                            </label>

                            <Field
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className={`appearance-none block w-full px-3 py-4 border border-gray-300 
                                rounded-md shadow-sm placeholder-gray-400 focus:ring-green-500
                            focus:border-green-500 focus:ring-1 sm:text-sm`}
                            />
                        </div> 

                        <div className="mb-4 pt-2 w-full">
                            <label
                            htmlFor="question_name"
                            className="block text-gray-800  font-md mb-2"
                            >
                            Phone :
                            </label>

                            <Field
                            type="text"
                            name="phone"
                            placeholder="Enter your phone number"
                            className={`appearance-none block w-full px-3 py-4 border border-gray-300 
                                rounded-md shadow-sm placeholder-gray-400 focus:ring-green-500
                            focus:border-green-500 focus:ring-1 sm:text-sm`}
                            />
                        </div> 


                        <div className="mb-4 pt-2 w-full">
                            <label
                            htmlFor="question_name"
                            className="block text-gray-800  font-md mb-2"
                            >
                            Subject :
                            </label>

                            <Field
                            type="text"
                            name="subject"
                            placeholder="Enter your contact subject"
                            className={`appearance-none block w-full px-3 py-4 border border-gray-300 
                                rounded-md shadow-sm placeholder-gray-400 focus:ring-green-500
                            focus:border-green-500 focus:ring-1 sm:text-sm`}
                            />
                        </div> 

                        <div className="mb-4 pt-2 w-full col-span-2">
                            <label
                            htmlFor="question_name"
                            className="block text-gray-800  font-md mb-2"
                            >
                            Message :
                            </label>

                            <textarea 
                                value={values.message}
                                name="message" rows="4" cols="50"
                                placeholder="Enter your contact subject"
                                onChange={(e) => setFieldValue("message", e.target.value)}
                                className={`appearance-none block w-full px-3 py-4 border border-gray-300 
                                rounded-md shadow-sm placeholder-gray-400 focus:ring-green-500
                              focus:border-green-500 focus:ring-1 sm:text-sm`}
                            />
                        </div> 

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 col-span-2"
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
