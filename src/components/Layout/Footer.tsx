import React from 'react';
import { Gamepad2, Shield, Zap, Users, Mail, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-dark-900 border-t border-dark-700 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                DIGITALDROP.gg
              </span>
            </div>
            <p className="text-dark-400 text-sm">
              O maior marketplace de produtos digitais do Brasil. Skins, contas, serviços. Tudo num só drop.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-success-400">
                <Shield className="w-4 h-4" />
                <span className="text-xs">Pagamentos Seguros</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-dark-400 hover:text-white transition-colors">Explorar Produtos</a></li>
              <li><a href="#" className="text-dark-400 hover:text-white transition-colors">Como Vender</a></li>
              <li><a href="#" className="text-dark-400 hover:text-white transition-colors">Como Comprar</a></li>
              <li><a href="#" className="text-dark-400 hover:text-white transition-colors">Taxas e Tarifas</a></li>
              <li><a href="#" className="text-dark-400 hover:text-white transition-colors">Central de Ajuda</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categorias</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-dark-400 hover:text-white transition-colors">Skins de Jogos</a></li>
              <li><a href="#" className="text-dark-400 hover:text-white transition-colors">Contas de Jogos</a></li>
              <li><a href="#" className="text-dark-400 hover:text-white transition-colors">Serviços Digitais</a></li>
              <li><a href="#" className="text-dark-400 hover:text-white transition-colors">Keys de Jogos</a></li>
              <li><a href="#" className="text-dark-400 hover:text-white transition-colors">Assinaturas</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Suporte</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-dark-400 hover:text-white transition-colors flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>suporte@digitaldrop.gg</span>
              </a></li>
              <li><a href="#" className="text-dark-400 hover:text-white transition-colors flex items-center space-x-2">
                <MessageCircle className="w-4 h-4" />
                <span>Chat ao Vivo</span>
              </a></li>
            </ul>
            
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Estatísticas</h4>
              <div className="space-y-1 text-sm text-dark-400">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>50.000+ usuários ativos</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4" />
                  <span>100.000+ transações</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-dark-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-dark-400 text-sm">
            © 2024 DIGITALDROP.gg. Todos os direitos reservados.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-dark-400 hover:text-white text-sm transition-colors">Termos de Uso</a>
            <a href="#" className="text-dark-400 hover:text-white text-sm transition-colors">Política de Privacidade</a>
            <a href="#" className="text-dark-400 hover:text-white text-sm transition-colors">Política de Reembolso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}