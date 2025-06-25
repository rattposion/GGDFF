import React, { useEffect, useState } from 'react';
import api from '../services/api';
import ProductCard from '../components/UI/ProductCard';
import { motion } from 'framer-motion';

const tipos = [
  { value: '', label: 'Todos' },
  { value: 'skin', label: 'Skins' },
  { value: 'account', label: 'Contas' },
  { value: 'service', label: 'Serviços' },
  { value: 'key', label: 'Keys' },
  { value: 'subscription', label: 'Assinaturas' },
  { value: 'other', label: 'Outros' },
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

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [filtered, setFiltered] = useState<any[]>([]);

  useEffect(() => {
    setLoading(true);
    api.get('/products').then(res => setProducts(res.data)).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = products;
    if (search) result = result.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()));
    if (type) result = result.filter(p => p.type === type);
    if (minPrice) result = result.filter(p => p.price >= parseFloat(minPrice));
    if (maxPrice) result = result.filter(p => p.price <= parseFloat(maxPrice));
    setFiltered(result);
  }, [products, search, type, minPrice, maxPrice]);

  return (
    <section className="relative min-h-[90vh] w-full overflow-x-hidden">
      {/* Fundo gradiente MCP/Context7 real + grid SVG */}
      <div className="fixed inset-0 -z-30 bg-gradient-to-br from-[#2e335a] via-[#1b233a] to-[#232946] opacity-80" />
      <div className="fixed inset-0 -z-20 pointer-events-none" style={{background: 'radial-gradient(circle at 60% 40%, #3b82f6 0%, transparent 70%)', opacity:0.45}} />
      <GridBackground />
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2 className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-br from-primary-400 via-blue-400 to-secondary-400 bg-clip-text text-transparent drop-shadow-lg" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          Produtos
        </motion.h2>
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar por nome ou descrição..." className="p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white w-64 shadow focus:ring-2 focus:ring-primary-400 transition" />
          <select value={type} onChange={e => setType(e.target.value)} className="p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white shadow">
            {tipos.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
          <input value={minPrice} onChange={e => setMinPrice(e.target.value)} placeholder="Preço mín." type="number" className="p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white w-28 shadow" />
          <input value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="Preço máx." type="number" className="p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white w-28 shadow" />
        </div>
        <div className="h-1 w-full bg-gradient-to-r from-primary-400 via-blue-400 to-secondary-400 rounded-full mb-8 opacity-60" />
        {loading ? <div className="text-center text-zinc-400">Carregando produtos...</div> : null}
        {filtered.length === 0 && !loading && (
          <div className="text-center text-zinc-400 mt-12">Nenhum produto encontrado.</div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
          {filtered.map((p: any) => (
            <ProductCard key={p.id} product={p} onClick={() => window.location.href = `/produto/${p.id}`} />
          ))}
        </div>
      </div>
    </section>
  );
} 