import Cookie from "js-cookie";
import { toast } from "react-toastify";
import { API } from "../config/axiosConfig";

const signin = (values) => {
  return API.post("/login", values);
};

const signup = (values) => {
  return API.post("/users/adduser", values);
};

const forgotPassword = (values) => {
  return API.post("/auth/forgot-password", values);
};

const resetPassword = (token, values) => {
  return API.post(`/auth/reset-password/${token}`, values);
};

const handleLogout = () => {
  API.delete("/logout")
    .then((response) => {
      localStorage.removeItem("token");
      Cookie.remove("mrcs_cookie");

      toast.success("Logout Successfully!");

      return window.location.replace("/login");
    })
    .catch((err) => {
      toast.error("Something is Wrong,");
    });
};

const getCurrentUser = () => {
  const token = localStorage.getItem("token");

  if (token) {
    return true;
  } else {
    return false;
  }
};

const AuthService = {
  signin,
  signup,
  handleLogout,
  resetPassword,
  getCurrentUser,
  forgotPassword,
};
export default AuthService;
