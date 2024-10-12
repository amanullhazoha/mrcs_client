import Cookie from "js-cookie";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const access_token = Cookie.get("access_token");

  return access_token ? (
    <>
      <div>{children}</div>
    </>
  ) : (
    <>
      <Navigate to="/login" />{" "}
    </>
  );
};

export default ProtectedRoute;
