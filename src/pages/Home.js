import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/dashboard.css';

const Home = () => {
  return (
    <div className="container">
      <section className="hero-section py-4">
        <div className="hero-content text-center">
          <h1 className="hero-title">Witaj w systemie AI Dashboard</h1>
          <p className="hero-subtitle mt-2">
            Kompleksowe rozwiązanie AI dla twojego biznesu
          </p>
          <div className="hero-actions mt-4">
            <Link to="/dashboard" className="btn btn-primary">
              Przejdź do panelu
            </Link>
          </div>
        </div>
      </section>

      <section className="features-section py-4">
        <h2 className="section-title text-center mb-4">Korzyści z AI Dashboard</h2>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#e63946" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <h3 className="feature-title">Oszczędność czasu</h3>
            <p className="feature-description">
              Automatyzuj powtarzalne zadania i pracuj wydajniej.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#e63946" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                <line x1="16" y1="8" x2="2" y2="22"></line>
                <line x1="17.5" y1="15" x2="9" y2="15"></line>
              </svg>
            </div>
            <h3 className="feature-title">Zwiększona wydajność</h3>
            <p className="feature-description">
              Optymalizuj procesy biznesowe dzięki analizie AI.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#e63946" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className="feature-title">Lepsze relacje z klientami</h3>
            <p className="feature-description">
              Personalizuj doświadczenia i zwiększ satysfakcję klientów.
            </p>
          </div>
        </div>
      </section>

      <section className="cta-section py-4">
        <div className="cta-card">
          <h2 className="cta-title">Gotowy na transformację z AI?</h2>
          <p className="cta-description">
            Wypróbuj nasz panel narzędzi AI i zobacz, jak możemy pomóc Twojej firmie.
          </p>
          <div className="cta-actions">
            <Link to="/dashboard" className="btn btn-primary">
              Rozpocznij teraz
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;