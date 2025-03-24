import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Dashboard from './components/dashboard/Dashboard';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import BiuroAI from './pages/modules/office';
import './styles/globals.css';
import './styles/dashboard.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/logowanie" element={<LoginPage />} />
            
            {/* Placeholder routes for the dashboard modules */}
            <Route path="/office" element={<BiuroAI />} />
            <Route path="/sales" element={<h1>Sprzedaż AI - Coming Soon</h1>} />
            <Route path="/client" element={<h1>Klient AI - Coming Soon</h1>} />
            <Route path="/logistics" element={<h1>Logistyka AI - Coming Soon</h1>} />
            <Route path="/production" element={<h1>Produkcja AI - Coming Soon</h1>} />
            <Route path="/catering" element={<h1>Gastronomia AI - Coming Soon</h1>} />
            
            {/* 404 route */}
            <Route path="*" element={<h1>404 - Strona nie znaleziona</h1>} />
          </Routes>
        </main>
        <footer className="footer">
          <div className="footer-content">
            <p>© 2025 AI Dashboard. Wszelkie prawa zastrzeżone.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;