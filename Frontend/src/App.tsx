import LoginUI from "./Components/LoginUI"
import UserPage from "./Components/UserPage";
import AdminPage from "./Components/AdminPage";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthProvider } from "./Config/AuthContext";
import { ProtectedRoute } from "./Components/ProtectedRoutes";
import "./App.css"

export default function () {
  return (
    <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginUI />} />
            <Route path="/homepage" element={
                <ProtectedRoute allowedRoles={["user", "admin"]}>
                  <UserPage />
                </ProtectedRoute>
              } /> 
            <Route path="/adminpage" element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminPage />
                </ProtectedRoute>
              }/>
          </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}