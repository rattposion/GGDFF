import React, { useState } from 'react';
import { Bell, Search, User, ShoppingCart, Menu, X, Gamepad2, Shield } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { state } = useApp();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const unreadNotifications = state.notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-50 bg-dark-900/80 backdrop-blur-md border-b border-dark-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                DIGITALDROP.gg
              </span>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar skins, contas, serviços..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white placeholder-dark-400"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex items-center space-x-6">
              <button onClick={() => navigate('/explorar')} className="text-dark-300 hover:text-white transition-colors">Explorar</button>
              <button onClick={() => navigate('/produtos')} className="text-dark-300 hover:text-white transition-colors">Produtos</button>
              <button onClick={() => navigate('/vender')} className="text-dark-300 hover:text-white transition-colors">Vender</button>
              <button onClick={() => navigate('/meus-anuncios')} className="text-dark-300 hover:text-white transition-colors">Meus Anúncios</button>
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="relative p-2 text-dark-300 hover:text-white transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {unreadNotifications}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                <AnimatePresence>
                  {isNotificationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-80 bg-dark-800 rounded-lg shadow-lg border border-dark-600 z-50"
                    >
                      <div className="p-4 border-b border-dark-600">
                        <h3 className="font-semibold">Notificações</h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {state.notifications.length > 0 ? (
                          state.notifications.slice(0, 5).map((notification) => (
                            <div
                              key={notification.id}
                              className={`p-4 border-b border-dark-700 hover:bg-dark-700 cursor-pointer ${
                                !notification.read ? 'bg-dark-750' : ''
                              }`}
                            >
                              <div className="flex items-start space-x-3">
                                <div className={`w-2 h-2 rounded-full mt-2 ${
                                  !notification.read ? 'bg-primary-500' : 'bg-dark-600'
                                }`} />
                                <div className="flex-1">
                                  <h4 className="font-medium text-sm">{notification.title}</h4>
                                  <p className="text-dark-300 text-xs mt-1">{notification.message}</p>
                                  <p className="text-dark-400 text-xs mt-2">
                                    {new Date(notification.createdAt).toLocaleString('pt-BR')}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-4 text-center text-dark-400">
                            Nenhuma notificação
                          </div>
                        )}
                      </div>
                      {state.notifications.length > 5 && (
                        <div className="p-3 border-t border-dark-600 text-center">
                          <button className="text-primary-400 hover:text-primary-300 text-sm">
                            Ver todas as notificações
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Cart */}
              <button className="relative p-2 text-dark-300 hover:text-white transition-colors">
                <ShoppingCart className="w-5 h-5" />
                {state.cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-secondary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {state.cart.length}
                  </span>
                )}
              </button>

              {/* User Profile */}
              {state.user ? (
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-sm font-medium">{state.user.username}</div>
                    <div className="text-xs text-dark-400">
                      R$ {state.user.balance.toFixed(2)}
                    </div>
                  </div>
                  <div className="relative">
                    <img
                      src={state.user.avatar || 'https://images.pexels.com/photos/3775156/pexels-photo-3775156.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2'}
                      alt={state.user.username}
                      className="w-10 h-10 rounded-full border-2 border-primary-500"
                    />
                    {state.user.isVerified && (
                      <Shield className="absolute -bottom-1 -right-1 w-4 h-4 text-success-500 bg-dark-900 rounded-full" />
                    )}
                  </div>
                </div>
              ) : (
                <button
                  className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-lg transition-colors"
                  onClick={() => navigate('/login')}
                >
                  <User className="w-4 h-4" />
                  <span>Entrar</span>
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-dark-300 hover:text-white"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-dark-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white placeholder-dark-400"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-800 border-t border-dark-700"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              <a href="#" className="block py-2 text-dark-300 hover:text-white">Explorar</a>
              <a href="#" className="block py-2 text-dark-300 hover:text-white">Vender</a>
              <a href="#" className="block py-2 text-dark-300 hover:text-white">Meus Anúncios</a>
              
              {state.user ? (
                <div className="pt-4 border-t border-dark-600">
                  <div className="flex items-center space-x-3 mb-4">
                    <img
                      src={state.user.avatar || 'https://images.pexels.com/photos/3775156/pexels-photo-3775156.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2'}
                      alt={state.user.username}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="font-medium">{state.user.username}</div>
                      <div className="text-sm text-dark-400">R$ {state.user.balance.toFixed(2)}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <a href="#" className="block py-2 text-dark-300 hover:text-white">Meu Perfil</a>
                    <a href="#" className="block py-2 text-dark-300 hover:text-white">Carteira</a>
                    <a href="#" className="block py-2 text-dark-300 hover:text-white">Configurações</a>
                  </div>
                </div>
              ) : (
                <button className="w-full bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-lg transition-colors">
                  Entrar
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}