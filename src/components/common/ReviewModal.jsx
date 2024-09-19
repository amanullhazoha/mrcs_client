import Box from "@mui/material/Box";
import { Formik, Form } from "formik";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import { MdClose } from "react-icons/md";
import { Rating } from "@smastrom/react-rating";
import ReviewService from "../../service/ReviewService";

function ReviewModal({ isOpen, onClose }) {
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            console.log(values)
          const response = await ReviewService.addReview(values);
    
          if (response.status === 201) {
            resetForm()
            onClose();
            toast.success("Review add successfully");
          } else if (response.status === 200) {
            resetForm()
            onClose();
            toast.success("Review add successfully");
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

    const modalStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };

    const contentStyle = {
        width: 550,
        height: "auto",
        backgroundColor: "white",
        borderRadius: "8px",
        padding: "16px",
        position: "relative",
    };

    const closeIconStyle = {
        position: "absolute",
        top: "10px",
        right: "10px",
        cursor: "pointer",
        color: "red",
    };

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            style={modalStyle}
        >
            <Box sx={contentStyle}>
            <MdClose size={24} onClick={onClose} style={closeIconStyle} />

            <h3 className="mb-4 mt-2 w-full text-2xl font-semibold">
                Add your review
            </h3>  

            <Formik
                initialValues={{
                    rating: 0,
                    review: "",
                }}
                onSubmit={handleSubmit}
            >
                {({
                    values,
                    isSubmitting,
                    setFieldValue,
                }) => (
                    <Form className="w-full grid grid-cols-2 gap-5">
                        <div className="w-full col-span-2">
                            <label
                            htmlFor="question_name"
                            className="block text-gray-800  font-md mb-2"
                            >
                                Rating:
                            </label>

                            <Rating
                                value={values.rating}
                                style={{ maxWidth: 120 }}
                                onChange={(value) => setFieldValue("rating", value)}
                            />
                        </div> 

                        <div className="mb-4 pt-2 w-full col-span-2">
                            <label
                            htmlFor="question_name"
                            className="block text-gray-800  font-md mb-2"
                            >
                                Review Message:
                            </label>

                            <textarea 
                                value={values.review}
                                name="review" rows="4" cols="50"
                                placeholder="Enter your contact subject"
                                onChange={(e) => setFieldValue("review", e.target.value)}
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
            </Box>
        </Modal>
    );
}

export default ReviewModal;
