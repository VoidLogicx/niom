import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="container">
      <div className="login-container">
        <div className="card login-card">
          <h2 className="card-title text-center">Logowanie</h2>
          <form>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" placeholder="Twój email" />
            </div>
            <div className="form-group">
              <label className="form-label">Hasło</label>
              <input type="password" className="form-control" placeholder="Twoje hasło" />
            </div>
            <div className="form-group">
              <Link to="/dashboard" className="btn btn-primary w-100">Zaloguj się</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;