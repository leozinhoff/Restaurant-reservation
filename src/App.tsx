import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RestaurantsPage from './pages/RestaurantsPage';
import RestaurantDashboard from './pages/restaurant/Dashboard';
import FloorPlanEditor from './pages/restaurant/FloorPlanEditor';
import ScheduleManager from './pages/restaurant/ScheduleManager';
import ReservationManager from './pages/restaurant/ReservationManager';
import BookingPage from './pages/client/BookingPage';
import ConfirmationPage from './pages/client/ConfirmationPage';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/restaurants" element={<RestaurantsPage />} />
          <Route path="/book/:restaurantId" element={<BookingPage />} />
          <Route path="/confirmation/:reservationId" element={<ConfirmationPage />} />
          
          {/* Restaurant Routes */}
          <Route path="/restaurant/dashboard" element={<RestaurantDashboard />} />
          <Route path="/restaurant/floor-plan" element={<FloorPlanEditor />} />
          <Route path="/restaurant/schedule" element={<ScheduleManager />} />
          <Route path="/restaurant/reservations" element={<ReservationManager />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
