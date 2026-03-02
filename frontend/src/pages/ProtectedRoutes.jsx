import { Navigate } from "react-router-dom";


export default function ProtectedRoute({ children, roleRequired }) {
  const role = localStorage.getItem("role");

  if (!role) {
    return <Navigate to="/signin" />;
  }

  if (roleRequired && role !== roleRequired) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}