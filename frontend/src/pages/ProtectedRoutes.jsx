import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, roleRequired }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  //Not logged in
  if (!user) {
    return <Navigate to="/signin" />;
  }

  //Role check (for admin)
  if (roleRequired && user.role !== roleRequired) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default ProtectedRoute;