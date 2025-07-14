import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { BookListsProvider } from "./contexts/BookListsContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Biblioteca from "./pages/Biblioteca";
import Perfil from "./pages/Perfil";
import NotFound from "./pages/NotFound";
import Toast from "./components/Toast";
import "./styles/index.css";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BookListsProvider>
          <Router basename="/folium">
            <div className="App">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/biblioteca" element={<Biblioteca />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toast />
            </div>
          </Router>
        </BookListsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
