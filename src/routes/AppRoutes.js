import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import Access from '../screens/Access';
import EmailBox from '../screens/EmailBoxes';
import AddEmailBox from '../screens/AddMailBox';
import Webhook from '../screens/Webhook';
import LogScreen from '../screens/LogScreen';
import MainLayout from './MainLayout'; 
import CallBackScreen from '../screens/CallBackScreen';
import PrivateRoute from './PrivateRoute'; 

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/callback" element={<CallBackScreen />} />

        <Route path="/" element={<PrivateRoute><MainLayout /></PrivateRoute>}>
          <Route path="dashboard" element={<PrivateRoute><DashboardScreen /></PrivateRoute>} />
          <Route path="access" element={<PrivateRoute><Access /></PrivateRoute>} />
          <Route path="mailbox" element={<PrivateRoute><EmailBox /></PrivateRoute>} />
          <Route path="mailbox/create" element={<PrivateRoute><AddEmailBox /></PrivateRoute>} />
          <Route path="webhook" element={<PrivateRoute><Webhook /></PrivateRoute>} />
          <Route path="log" element={<PrivateRoute><LogScreen /></PrivateRoute>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
