import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./SignIn";
import Signup from "./SignUp";

export default function App() {
  return (
      <Routes>
        {/* Using React Dom router to navigate between pages */} 
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
  );
}