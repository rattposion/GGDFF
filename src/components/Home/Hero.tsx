import React from 'react';
import { Search, TrendingUp, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />
      <div className="absolute inset-0 bg-cyber-gradient opacity-5" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-500 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-400 via-secondary-400 to-success-400 bg-clip-text text-transparent">
            DIGITALDROP.gg
          </h1>
          
          <p className="text-xl md:text-2xl text-dark-300 mb-4">
            Skins, Contas, Serviços.
          </p>
          
          <p className="text-3xl md:text-4xl font-bold text-white mb-8">
            Tudo num só <span className="text-primary-400">drop</span>.
          </p>
          
          <p className="text-lg text-dark-400 mb-12 max-w-2xl mx-auto">
            O maior marketplace de produtos digitais do Brasil. Compre e venda com segurança e praticidade.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar skins, contas, serviços e muito mais..."
              className="w-full pl-12 pr-4 py-4 bg-dark-800/80 backdrop-blur-sm border border-dark-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white placeholder-dark-400 text-lg"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-600 hover:bg-primary-700 px-6 py-2 rounded-xl text-white font-medium transition-colors">
              Buscar
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center space-x-3 text-center">
            <div className="p-3 bg-primary-500/20 rounded-full">
              <TrendingUp className="w-6 h-6 text-primary-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">100K+</div>
              <div className="text-dark-400">Transações</div>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-3 text-center">
            <div className="p-3 bg-success-500/20 rounded-full">
              <Shield className="w-6 h-6 text-success-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">99.9%</div>
              <div className="text-dark-400">Segurança</div>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-3 text-center">
            <div className="p-3 bg-secondary-500/20 rounded-full">
              <Zap className="w-6 h-6 text-secondary-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-dark-400">Entrega Auto</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}