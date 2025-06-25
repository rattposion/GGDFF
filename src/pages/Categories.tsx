import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CategoryCard from '../components/UI/CategoryCard';

const categories = [
  {
    slug: 'skins',
    title: 'Skins de Jogos',
    description: 'CS:GO, Dota 2, Rust, TF2, Fortnite e mais. Skins e itens virtuais com entrega automática.',
    icon: '🎨',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-500',
    subcategories: [
      'CS:GO', 'Dota 2', 'Rust', 'TF2', 'Fortnite', 'GTA V', 'Outros'
    ],
  },
  {
    slug: 'contas',
    title: 'Contas de Jogos',
    description: 'Steam, Epic Games, Riot, PSN, Xbox, Netflix, Disney+ e mais. Contas prontas para uso.',
    icon: '👤',
    gradient: 'bg-gradient-to-br from-blue-500 to-cyan-500',
    subcategories: [
      'Steam', 'Epic Games', 'Riot', 'PSN', 'Xbox', 'Netflix', 'Disney+', 'Spotify', 'Outros'
    ],
  },
  {
    slug: 'servicos',
    title: 'Serviços Digitais',
    description: 'Boost, configs, design, scripts, edição, instalação, macros, bots e mais.',
    icon: '🛠️',
    gradient: 'bg-gradient-to-br from-purple-500 to-pink-500',
    subcategories: [
      'Boost', 'Design', 'Configuração', 'Macros', 'Bots', 'Edição', 'Instalação', 'Outros'
    ],
  },
  {
    slug: 'keys',
    title: 'Keys de Jogos',
    description: 'Steam, Uplay, Battle.net, Xbox, PSN, Gift Cards, Google Play, códigos e licenças.',
    icon: '🔑',
    gradient: 'bg-gradient-to-br from-green-500 to-teal-500',
    subcategories: [
      'Steam', 'Uplay', 'Battle.net', 'Xbox', 'PSN', 'Gift Card', 'Google Play', 'Outros'
    ],
  },
  {
    slug: 'assinaturas',
    title: 'Assinaturas',
    description: 'Game Pass, PS Plus, Spotify, Netflix, HBO Max, Disney+, licenças mensais e lifetime.',
    icon: '📦',
    gradient: 'bg-gradient-to-br from-pink-500 to-rose-500',
    subcategories: [
      'Game Pass', 'PS Plus', 'Spotify', 'Netflix', 'HBO Max', 'Disney+', 'Lifetime', 'Outros'
    ],
  },
  {
    slug: 'outros',
    title: 'Outros Produtos',
    description: 'Templates, packs, scripts, bots, macros, produtos únicos e personalizados.',
    icon: '🌟',
    gradient: 'bg-gradient-to-br from-yellow-500 to-orange-500',
    subcategories: [
      'Templates', 'Packs', 'Bots', 'Macros', 'Scripts', 'Personalizados', 'Outros'
    ],
  },
];

// Grid SVG MCP/Context7
const GridBackground = () => (
  <svg className="fixed inset-0 w-full h-full -z-20 pointer-events-none" style={{opacity:0.18}} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#fff" strokeWidth="1" opacity="0.08" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />
  </svg>
);

export default function CategoriesPage() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] w-full overflow-x-hidden">
      {/* Fundo gradiente MCP/Context7 real + grid SVG */}
      <div className="fixed inset-0 -z-30 bg-gradient-to-br from-[#2e335a] via-[#1b233a] to-[#232946] opacity-80" />
      <div className="fixed inset-0 -z-20 pointer-events-none" style={{background: 'radial-gradient(circle at 60% 40%, #3b82f6 0%, transparent 70%)', opacity:0.45}} />
      <GridBackground />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-extrabold text-center mb-4 bg-gradient-to-br from-primary-400 via-blue-400 to-secondary-400 bg-clip-text text-transparent drop-shadow-lg">
            Explore <span className="">Categorias</span>
          </h2>
          <p className="text-dark-400 text-center mb-12 max-w-2xl mx-auto">
            Encontre skins, contas, serviços, keys, assinaturas e muito mais. Tudo digital, seguro e gamer!
          </p>
        </motion.div>
        <div className="h-1 w-full bg-gradient-to-r from-primary-400 via-blue-400 to-secondary-400 rounded-full mb-8 opacity-60" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="relative group">
                <CategoryCard
                  title={category.title}
                  description={category.description}
                  icon={category.icon}
                  gradient={category.gradient}
                  productCount={Math.floor(Math.random()*1000+100)}
                  onClick={() => navigate(`/categoria/${category.slug}`)}
                />
                {/* Subcategorias em hover */}
                <div className="absolute left-0 right-0 top-full z-20 hidden group-hover:flex flex-wrap gap-2 bg-dark-900/95 border border-dark-700 rounded-b-xl p-4 shadow-xl animate-fade-in">
                  {category.subcategories.map((sub, i) => (
                    <button
                      key={sub}
                      className="px-3 py-1 bg-dark-800 hover:bg-primary-600 text-xs rounded-lg text-white border border-dark-700 hover:border-primary-400 transition"
                      onClick={e => { e.stopPropagation(); navigate(`/categoria/${category.slug}/${sub.toLowerCase().replace(/\s+/g, '-')}`); }}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 