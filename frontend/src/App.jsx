import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Signup from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Builder from "./pages/Builder";
import Catalog from "./pages/Catalog";
import CompareBuilds from "./pages/CompareBuilds";
import ThreeDBuilder from "./pages/ThreeDBuilder";

import { Toaster } from "sonner";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/builder" element={<Builder />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/compare-builds" element={<CompareBuilds />} />
        <Route path="/3d-builder" element={<ThreeDBuilder />} />

      </Routes>

      <Toaster />
    </>
  );
}
