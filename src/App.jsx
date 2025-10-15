import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import "./App.css";

import Home from "./pages/user/Home";
import About from "./pages/user/About";
import Packages from "./pages/user/Packages";
import Schedule from "./pages/user/Schedule";
import Gallery from "./pages/user/Gallery";
import Testimony from "./pages/user/Testimony";

import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import AdminPackages from "./pages/admin/Packages";
import AdminSchedules from "./pages/admin/Schedules";
import AdminGallery from "./pages/admin/Gallery";
import AdminTestimony from "./pages/admin/Testimony";

import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = Cookies.get("token");
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/review/gallery" element={<Gallery />} />
        <Route path="/review/testimony" element={<Testimony />} />
        <Route path="/loginadminkeren" element={<Login />} />

        {/* Admin Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/packages"
          element={
            <ProtectedRoute>
              <AdminPackages />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/schedules"
          element={
            <ProtectedRoute>
              <AdminSchedules />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/gallery"
          element={
            <ProtectedRoute>
              <AdminGallery />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/testimony"
          element={
            <ProtectedRoute>
              <AdminTestimony />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
