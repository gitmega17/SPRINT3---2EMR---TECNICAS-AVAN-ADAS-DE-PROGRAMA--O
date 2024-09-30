import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Verifica se todos os campos foram preenchidos
    if (!username || !password || !confirmPassword) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    // Verifica se as senhas coincidem
    if (password !== confirmPassword) {
      setErrorMessage('As senhas não coincidem.');
      return;
    }

    setIsLoading(true); // Ativa o estado de carregamento

    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setErrorMessage('');
        navigate('/login'); // Redireciona para a página de login após o registro bem-sucedido
      } else {
        setErrorMessage(data.message || 'Erro ao registrar. Por favor, tente novamente.');
      }
    } catch (error) {
      setErrorMessage('Erro ao conectar ao servidor. Por favor, tente mais tarde.');
    } finally {
      setIsLoading(false); // Desativa o estado de carregamento
    }
  };

  return (
    <div>
      <h1>Challenge Sprint 3-Dados Dos Sensores</h1>
      <h2>Techforge: Samuel Victor, José Manuel, Yuri Yve</h2>
      <h1>Registrar</h1>
      <form onSubmit={handleRegister}>
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
        <div>
          <label>Confirmar Senha:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Registrando...' : 'Registrar'}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
