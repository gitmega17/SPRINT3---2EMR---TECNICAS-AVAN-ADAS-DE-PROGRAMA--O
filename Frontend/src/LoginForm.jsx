import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token); // Armazena o token JWT
        setErrorMessage('');
        navigate('/sensores'); // Redireciona para a página inicial
      } else {
        setErrorMessage(data.message || 'Erro ao fazer login');
      }
    } catch (error) {
      setErrorMessage('Erro ao conectar ao servidor');
    }
  };

  return (
    <div>
      <h1>Challenge Sprint 3-Dados Dos Sensores</h1>
      <h2>Techforge: Samuel Victor, José Manuel, Yuri Yve</h2>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Usuário:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default LoginForm;
