// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App.jsx'; // Comente ou remova esta linha se App.jsx for o de produção
import AppDashboard from './pages/Dashboard/AppDashboard'; 
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/*
      DURANTE O DESENVOLVIMENTO:
      Renderize AppDashboard diretamente para testar suas telas.
      Quando for para produção, DESCOMENTE A LINHA DO App e REMOVA/COMENTE ESTA LINHA.
    */}
    <AppDashboard />

    {/*
      QUANDO FOR PARA PRODUÇÃO, use assim (assumindo que App.jsx é o entry point principal):
      <App />
    */}
  </React.StrictMode>,
);