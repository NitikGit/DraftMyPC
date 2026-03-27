import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";

import SignIn from "./pages/SignIn";
import Signup from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Builder from "./pages/Builder";
import Catalog from "./pages/Catalog";
import CompareBuilds from "./pages/CompareBuilds";
import ThreeDBuilder from "./pages/ThreeDBuilder";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./pages/ProtectedRoutes";

import { Toaster } from "sonner";

export default function App() {
  return (
    <>
      <Routes>

        {/* make Dashboard default route*/}
        <Route path="/" element={<Navigate to="/dashboard" />} />

        {/* PUBLIC ROUTES */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/compare-builds" element={<CompareBuilds />} />
        <Route path="/3d-builder" element={<ThreeDBuilder />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />

        {/* protected routes */}
        <Route
          path="/builder"
          element={
            <ProtectedRoute>
              <Builder />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* admin only pages */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute roleRequired="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>

      <Toaster />
    </>
  );
}