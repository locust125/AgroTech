import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import { isTokenValid } from "./utils/auth";
import AuthenticatedLayout from "./components/layout/AuthenticatedLayout";
import NotFound from "./pages/404";
import Admin from "./pages/admin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // nuevo estado

  useEffect(() => {
    const valid = isTokenValid();
    setIsAuthenticated(valid);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return null; // o un loader/spinner si quieres
  }

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route element={<AuthenticatedLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer position="bottom-left" autoClose={5000} theme="dark" />
    </>
  );
}

