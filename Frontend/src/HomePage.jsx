import React, { useState, useEffect } from 'react';
import SensorDataChart from './SensorDataChart';

const HomePage = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [token, setToken] = useState('');

  // Função para pausar/reiniciar o serviço
  const toggleServiceStatus = async (status) => {
    try {
      const response = await fetch('http://localhost:3000/pausar-servico', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ status })
      });

      const data = await response.json();
      if (response.ok) {
        setIsPaused(status === 'pausar');
        console.log(data.message);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Erro ao alterar o status do serviço:', error);
    }
  };

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  return (
    <div>
      <h1>Monitoramento de Dados de Sensores</h1>
      <SensorDataChart isPaused={isPaused} />
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => toggleServiceStatus('pausar')} disabled={isPaused}>
          Pausar Serviço
        </button>
        <button onClick={() => toggleServiceStatus('reiniciar')} disabled={!isPaused}>
          Reiniciar Serviço
        </button>
      </div>
    </div>
  );
};

export default HomePage;
