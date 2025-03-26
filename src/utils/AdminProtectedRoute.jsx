import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

function AdminProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (!user || !token) {
        setLoading(false);
        setIsAuthenticated(false);
        toast.error("session expired");
        return;
      }

      setIsAuthenticated(true);
      setLoading(false);
    };

    checkToken();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="flex flex-col items-center gap-4">
          {/* Loader Animation */}
          <div className="loader relative w-20 h-20 rounded-full border-4 border-teal-500 border-t-transparent animate-spin"></div>

          {/* Loading Text */}
          <p className="text-lg font-medium text-gray-400">Loading, please wait...</p>
        </div>

        <style>
          {`
              .loader {
                box-shadow: 0 0 10px 0 #14b8a6;
              }
            `}
        </style>
      </div>
    );
  }

  // If not authenticated, redirect to login
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate
      to="/adminCare"
      replace
    />
  );
}

export default AdminProtectedRoute;
