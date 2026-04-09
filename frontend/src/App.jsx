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
import ForgotPassword from "./pages/ForgotPassword";

import { Toaster } from "sonner";

export default function App() {
  return (
    <>
      <Routes>

        {/* dashboard default route */}
        <Route path="/" element={<Navigate to="/dashboard" />} />

        <Route path="/dashboard" element={<Dashboard />} />

        {/* authentication */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* protected routes */}
        <Route path="/builder" element={
          <ProtectedRoute>
            <Builder />
          </ProtectedRoute>
        } />

        <Route path="/catalog" element={
          <ProtectedRoute>
            <Catalog />
          </ProtectedRoute>
        } />

        <Route path="/compare-builds" element={
          <ProtectedRoute>
            <CompareBuilds />
          </ProtectedRoute>
        } />

        <Route path="/3d-builder" element={
          <ProtectedRoute>
            <ThreeDBuilder />
          </ProtectedRoute>
        } />

        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />

        {/*admin only */}
        <Route path="/admin" element={
          <ProtectedRoute roleRequired="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />

      </Routes>

      <Toaster />
    </>
  );
}