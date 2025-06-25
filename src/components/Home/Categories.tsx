import React from 'react';
import { motion } from 'framer-motion';
import CategoryCard from '../UI/CategoryCard';

const categories = [
  {
    title: 'Skins de Jogos',
    description: 'CS:GO, Dota 2, Rust e muito mais. As melhores skins com os melhores preços.',
    icon: '🎨',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-500',
    productCount: 1234,
  },
  {
    title: 'Contas de Jogos',
    description: 'Steam, Epic Games, Riot Games. Contas verificadas e seguras.',
    icon: '👤',
    gradient: 'bg-gradient-to-br from-blue-500 to-cyan-500',
    productCount: 856,
  },
  {
    title: 'Serviços Digitais',
    description: 'Boost, design, configurações e muito mais. Profissionais qualificados.',
    icon: '🛠️',
    gradient: 'bg-gradient-to-br from-purple-500 to-pink-500',
    productCount: 432,
  },
  {
    title: 'Keys de Jogos',
    description: 'Steam, Xbox, PlayStation. Keys originais com garantia.',
    icon: '🔑',
    gradient: 'bg-gradient-to-br from-green-500 to-teal-500',
    productCount: 789,
  },
  {
    title: 'Assinaturas',
    description: 'Netflix, Spotify, Game Pass. Planos mensais e anuais.',
    icon: '📦',
    gradient: 'bg-gradient-to-br from-pink-500 to-rose-500',
    productCount: 324,
  },
  {
    title: 'Outros Produtos',
    description: 'Templates, bots, scripts e produtos únicos.',
    icon: '🌟',
    gradient: 'bg-gradient-to-br from-yellow-500 to-orange-500',
    productCount: 567,
  },
];

export default function Categories() {
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
            Explore Nossas <span className="text-primary-400">Categorias</span>
          </h2>
          <p className="text-dark-400 text-center mb-12 max-w-2xl mx-auto">
            Encontre exatamente o que você precisa em nossa ampla seleção de produtos digitais
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <CategoryCard
                title={category.title}
                description={category.description}
                icon={category.icon}
                gradient={category.gradient}
                productCount={category.productCount}
                onClick={() => console.log(`Navigate to ${category.title}`)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}