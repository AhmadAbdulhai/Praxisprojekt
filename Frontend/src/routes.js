import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TaskPage from './pages/TaskPage';
import Header from './components/common/Header';
import Footer from './components/common/Footer';


const AppRoutes = () => {
  return (
    <Router>
      <Header />
      <div className="container flex-grow-1">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/tasks" element={<TaskPage />} />
        <Route path="*" element={<TaskPage />} />
      </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default AppRoutes;
