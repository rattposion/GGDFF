import React from 'react';
import { Star, Eye, Heart, Shield, Clock, Zap } from 'lucide-react';
import { Product } from '../../types';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'skin':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'account':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'service':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'key':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'subscription':
        return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'skin':
        return '🎨';
      case 'account':
        return '👤';
      case 'service':
        return '🛠️';
      case 'key':
        return '🔑';
      case 'subscription':
        return '📦';
      default:
        return '📄';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-dark-800/50 backdrop-blur-sm rounded-xl border border-dark-700 overflow-hidden hover:border-primary-500/50 transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Overlays */}
        <div className="absolute top-3 left-3 flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(product.type)}`}>
            {getTypeIcon(product.type)} {product.type.toUpperCase()}
          </span>
          {product.hasAutoDelivery && (
            <span className="bg-success-500/20 text-success-400 border border-success-500/30 px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
              <Zap className="w-3 h-3" />
              <span>AUTO</span>
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3">
          <button className="p-1.5 bg-dark-900/80 backdrop-blur-sm rounded-full hover:bg-red-500/20 transition-colors">
            <Heart className="w-4 h-4 text-dark-400 hover:text-red-400" />
          </button>
        </div>

        <div className="absolute bottom-3 left-3 flex items-center space-x-3 text-white/80">
          <div className="flex items-center space-x-1">
            <Eye className="w-4 h-4" />
            <span className="text-xs">{product.views}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Heart className="w-4 h-4" />
            <span className="text-xs">{product.likes}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-primary-400 transition-colors">
          {product.title}
        </h3>
        
        <p className="text-dark-300 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Seller Info */}
        <div className="flex items-center space-x-2 mb-3">
          <img
            src={product.seller.avatar || 'https://images.pexels.com/photos/3775156/pexels-photo-3775156.jpeg?auto=compress&cs=tinysrgb&w=30&h=30&dpr=2'}
            alt={product.seller.username}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm text-dark-300">{product.seller.username}</span>
          {product.seller.isVerified && (
            <Shield className="w-4 h-4 text-success-500" />
          )}
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-xs text-dark-300">{product.seller.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-xl font-bold text-primary-400">
              {formatPrice(product.price)}
            </div>
            {product.guarantee && (
              <div className="flex items-center space-x-1 text-xs text-success-400">
                <Shield className="w-3 h-3" />
                <span>{product.guarantee}</span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {product.stock !== undefined && product.stock > 0 && (
              <span className="text-xs text-dark-400">
                {product.stock} disponível
              </span>
            )}
            {product.type === 'service' && (
              <div className="flex items-center space-x-1 text-xs text-orange-400">
                <Clock className="w-3 h-3" />
                <span>Sob encomenda</span>
              </div>
            )}
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-dark-700">
          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-3 h-3 ${
                    star <= Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-dark-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-dark-300">
              ({product.totalReviews} avaliações)
            </span>
          </div>
          
          <button className="px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white text-sm rounded-lg transition-colors">
            Ver Mais
          </button>
        </div>
      </div>
    </motion.div>
  );
}