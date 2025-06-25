import React from 'react';
import { Shield, Zap, Headphones, Award, Lock, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Shield,
    title: 'Pagamentos Seguros',
    description: 'Sistema de escrow que protege compradores e vendedores em todas as transações.',
    color: 'text-success-400',
    bgColor: 'bg-success-500/20',
  },
  {
    icon: Zap,
    title: 'Entrega Automática',
    description: 'Receba seus produtos digitais instantaneamente após a confirmação do pagamento.',
    color: 'text-primary-400',
    bgColor: 'bg-primary-500/20',
  },
  {
    icon: Headphones,
    title: 'Suporte 24/7',
    description: 'Nossa equipe está sempre disponível para ajudar com qualquer dúvida ou problema.',
    color: 'text-secondary-400',
    bgColor: 'bg-secondary-500/20',
  },
  {
    icon: Award,
    title: 'Vendedores Verificados',
    description: 'Todos os vendedores passam por um processo rigoroso de verificação.',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
  },
  {
    icon: Lock,
    title: 'Dados Protegidos',
    description: 'Suas informações pessoais e financeiras são protegidas com criptografia avançada.',
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
  },
  {
    icon: Smartphone,
    title: 'App Mobile',
    description: 'Acesse a plataforma de qualquer lugar com nosso aplicativo otimizado.',
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/20',
  },
];

export default function Features() {
  return (
    <section className="py-20 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-900/50 to-transparent" />
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Por que escolher a <span className="text-primary-400">DIGITALDROP</span>?
          </h2>
          <p className="text-dark-400 text-center mb-16 max-w-2xl mx-auto">
            Oferecemos a melhor experiência em marketplace de produtos digitais com segurança e praticidade
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative p-6 bg-dark-800/50 backdrop-blur-sm rounded-xl border border-dark-700 hover:border-primary-500/50 transition-all duration-300 hover:transform hover:scale-105">
                  <div className={`w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-primary-400 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-dark-300 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* Hover effect */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-secondary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-xl" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}