import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";
import Layout from "./components/Layout";
import "./App.css";

const PrivateRoute = ({ children }) => {
  const hasToken = document.cookie.includes("auth_token=");
  return hasToken ? children : <Navigate to="/" />;
};

const PublicRoute = ({ children }) => {
  const hasToken = document.cookie.includes("auth_token=");
  return hasToken ? <Navigate to="/dashboard" /> : children;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <PublicRoute>
              <div className="sign-in-container">
                <div className="sign-in-card">
                  <SignIn />
                </div>
              </div>
            </PublicRoute>
          }
        />
        <Route
          path="dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
