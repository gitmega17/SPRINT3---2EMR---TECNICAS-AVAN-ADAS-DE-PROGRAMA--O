import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SensorDataChart from './SensorDataChart.jsx';
import BotaoLimparDados from './BotaoLimparDados';
import BotaoPausarReiniciarServico from './BotaoPausarReiniciarServico.jsx'; // Corrigido o import
import HomePage from './HomePage';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

import './App.css';

function App() {
  const isAuthenticated = () => {
    // Verifica se o token está presente no localStorage
    return !!localStorage.getItem('token');
  };

  const PrivateRoute = ({ element }) => {
    // Redireciona para o login se o usuário não estiver autenticado
    return isAuthenticated() ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Rota inicial redireciona para a página de registro */}
          <Route path="/" element={<Navigate to="/register" />} />

          {/* Página de registro */}
          <Route path="/register" element={<RegisterForm />} />

          {/* Página de login */}
          <Route path="/login" element={<LoginForm />} />

          {/* Página de sensores, acessível apenas se o usuário estiver autenticado */}
          <Route path="/sensores" element={
            <PrivateRoute element={
              <>
                <h1>Challenge Sprint 3-Dados Dos Sensores</h1>
                <h2>Techforge: Samuel Victor, José Manuel, Yuri Yve</h2>
                <div style={{ display: 'flex', gap: '10px', marginTop: '20px', marginBottom:'20px', justifyContent: 'center' }}>
                <BotaoLimparDados />
                <BotaoPausarReiniciarServico />
                </div>
                <SensorDataChart />
              </>
            } />
          } />

          {/* Página Home protegida */}
          <Route path="/home" element={<PrivateRoute element={<HomePage />} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
