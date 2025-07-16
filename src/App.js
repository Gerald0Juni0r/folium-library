import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { BookListsProvider } from "./contexts/BookListsContext";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Biblioteca from "./pages/Biblioteca";
import Perfil from "./pages/Perfil";
import NotFound from "./pages/NotFound";
import Toast from "./components/Toast";
import "./styles/index.css";

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ children }) {
  const { user } = useAuth();
  return !user ? children : <Navigate to="/biblioteca" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/cadastro"
        element={
          <PublicRoute>
            <Cadastro />
          </PublicRoute>
        }
      />
      <Route
        path="/biblioteca"
        element={
          <ProtectedRoute>
            <Biblioteca />
          </ProtectedRoute>
        }
      />
      <Route
        path="/perfil"
        element={
          <ProtectedRoute>
            <Perfil />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BookListsProvider>
          <Router>
            <div className="App">
              <AppRoutes />
              <Toast />
            </div>
          </Router>
        </BookListsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
