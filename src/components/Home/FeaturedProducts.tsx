import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../contexts/AppContext';
import ProductCard from '../UI/ProductCard';

export default function FeaturedProducts() {
  const { state } = useApp();

  // Get featured products (first 6 products for demo)
  const featuredProducts = state.products.slice(0, 6);

  if (featuredProducts.length === 0) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-dark-700 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-dark-700 rounded w-96 mx-auto mb-12"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-dark-700 rounded-xl aspect-video mb-4"></div>
                  <div className="h-4 bg-dark-700 rounded mb-2"></div>
                  <div className="h-4 bg-dark-700 rounded w-2/3 mb-4"></div>
                  <div className="h-6 bg-dark-700 rounded w-1/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Produtos em <span className="text-primary-400">Destaque</span>
          </h2>
          <p className="text-dark-400 text-center mb-12 max-w-2xl mx-auto">
            Confira os produtos mais populares e bem avaliados da nossa plataforma
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ProductCard
                product={product}
                onClick={() => console.log(`View product ${product.id}`)}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <button className="px-8 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105">
            Ver Todos os Produtos
          </button>
        </motion.div>
      </div>
    </section>
  );
}