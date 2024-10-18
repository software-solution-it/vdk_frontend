import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import Access from '../screens/Access';
import EmailBox from '../screens/EmailBoxes';
import AddEmailBox from '../screens/AddMailBox';
import Webhook from '../screens/Webhook';
import LogScreen from '../screens/LogScreen';
import MainLayout from './MainLayout'; // Importando o layout persistente

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="dashboard" element={<DashboardScreen />} />
          <Route path="access" element={<Access />} />
          <Route path="mailbox" element={<EmailBox />} />
          <Route path="mailbox/create" element={<AddEmailBox />} />
          <Route path="webhook" element={<Webhook />} />
          <Route path="log" element={<LogScreen />} />
        </Route>
        
        {/* Rota de Login que não precisa do layout */}
        <Route path="/login" element={<LoginScreen />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
