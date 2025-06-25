import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { useNotifications } from './hooks/useNotifications';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import { ToastNotification } from './components/UI/ToastNotification';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import CategoriesPage from './pages/Categories';
import ProductFormPage from './pages/ProductForm';
import FavoritesPage from './pages/Favorites';
import ProductsPage from './pages/Products';

function AppContent() {
  const { notifications } = useNotifications();
  const [toast, setToast] = useState<any>(null);

  // Exibe toast para a notificação mais recente não lida
  useEffect(() => {
    if (notifications.length > 0 && !notifications[0].read) {
      setToast(notifications[0]);
    }
  }, [notifications]);

  return (
    <div className="min-h-screen bg-dark-950">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/explorar" element={<CategoriesPage />} />
          <Route path="/produtos" element={<ProductsPage />} />
          <Route path="/vender" element={<ProductFormPage />} />
          <Route path="/meus-anuncios" element={<FavoritesPage />} />
        </Routes>
      </main>
      <Footer />
      {toast && <ToastNotification notification={toast} onClose={() => setToast(null)} />}
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}

export default App;