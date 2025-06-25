import React from 'react';
import { motion } from 'framer-motion';

interface CategoryCardProps {
  title: string;
  description: string;
  icon: string;
  gradient: string;
  productCount: number;
  onClick?: () => void;
}

export default function CategoryCard({ 
  title, 
  description, 
  icon, 
  gradient, 
  productCount,
  onClick 
}: CategoryCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4, boxShadow: '0 8px 32px 0 rgba(58, 97, 246, 0.25)' }}
      whileTap={{ scale: 0.98 }}
      className={
        `relative overflow-hidden rounded-2xl border border-white/10 shadow-xl cursor-pointer group transition-all duration-300
        bg-white/10 backdrop-blur-xl
        hover:border-primary-400/60 hover:shadow-primary-400/30
        `
      }
      onClick={onClick}
      style={{ minHeight: 170 }}
    >
      {/* Background gradient overlay */}
      <div className={`absolute inset-0 opacity-30 group-hover:opacity-40 transition-opacity ${gradient}`} />
      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-xl" />
      {/* Content */}
      <div className="relative p-7 flex flex-col h-full justify-between z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="text-3xl drop-shadow-lg">{icon}</div>
          <div className="text-right">
            <div className="text-xs text-dark-300">Produtos</div>
            <div className="text-xl font-bold text-cyan-300 drop-shadow-lg">{productCount}</div>
          </div>
        </div>
        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary-400 transition-colors drop-shadow">
          {title}
        </h3>
        <p className="text-dark-200 text-sm leading-relaxed mb-1 drop-shadow">
          {description}
        </p>
      </div>
      {/* Glow border on hover */}
      <div className="absolute inset-0 pointer-events-none rounded-2xl border-2 border-transparent group-hover:border-primary-400/60 group-hover:shadow-[0_0_32px_0_rgba(58,97,246,0.25)] transition-all duration-300" />
    </motion.div>
  );
}