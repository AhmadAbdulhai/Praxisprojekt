import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage = () => {
    let navigate = useNavigate();

  const handleRegisterSuccess = () => {
    // Umleitung zur Anmeldeseite oder Anzeige einer Erfolgsmeldung
    navigate('/login');
  };

  return (
    <div className="container mt-5">
      <h2>Registrieren</h2>
      <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
      <p className="mt-3">
        Bereits registriert? <a href="/login">Anmelden</a>
      </p>
    </div>
  );
};

export default RegisterPage;
