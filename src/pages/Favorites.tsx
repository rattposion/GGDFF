import React, { useEffect, useState } from "react";
import api from "../services/api";
import { ToastNotification } from "../components/UI/ToastNotification";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';

const statusLabels = {
  active: 'Ativo',
  pending: 'Pendente',
  blocked: 'Bloqueado',
};

export default function MyListingsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [filter, setFilter] = useState({ status: '', type: '', category: '' });
  const navigate = useNavigate();

  const fetchMyProducts = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/products?mine=1');
      setProducts(data);
    } catch {
      setToast({ type: 'error', message: 'Erro ao carregar anúncios.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const handleRemove = async (id: string) => {
    try {
      await api.delete(`/products/${id}`);
      setToast({ type: 'success', message: 'Anúncio removido!' });
      setProducts(products.filter(f => f.id !== id));
    } catch {
      setToast({ type: 'error', message: 'Erro ao remover anúncio.' });
    }
  };

  const filtered = products.filter(p =>
    (!filter.status || p.status === filter.status) &&
    (!filter.type || p.type === filter.type) &&
    (!filter.category || p.category === filter.category)
  );

  return (
    <section className="py-12 min-h-[80vh] bg-dark-950">
      <div className="max-w-5xl mx-auto px-4">
        <motion.h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-primary-400" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          Meus Anúncios
        </motion.h2>
        {toast && <ToastNotification type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
        <div className="flex flex-wrap gap-4 mb-6 justify-center">
          <select value={filter.status} onChange={e => setFilter(f => ({ ...f, status: e.target.value }))} className="p-2 rounded bg-zinc-800 text-white">
            <option value="">Status</option>
            <option value="active">Ativo</option>
            <option value="pending">Pendente</option>
            <option value="blocked">Bloqueado</option>
          </select>
          <select value={filter.type} onChange={e => setFilter(f => ({ ...f, type: e.target.value }))} className="p-2 rounded bg-zinc-800 text-white">
            <option value="">Tipo</option>
            <option value="skin">Skin</option>
            <option value="conta">Conta</option>
            <option value="key">Key</option>
            <option value="servico">Serviço</option>
            <option value="assinatura">Assinatura</option>
            <option value="outro">Outro</option>
          </select>
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded font-semibold" onClick={() => navigate('/vender')}>+ Novo Anúncio</button>
        </div>
        {loading ? <div className="text-center text-zinc-400">Carregando anúncios...</div> : null}
        {filtered.length === 0 && !loading && (
          <div className="text-center text-zinc-400 mt-12">
            Nenhum anúncio encontrado.<br />
            <button className="mt-4 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded font-semibold" onClick={() => navigate('/vender')}>Cadastrar Novo Anúncio</button>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p: any) => (
            <motion.div key={p.id} className="bg-dark-900 rounded-xl border border-dark-700 p-5 flex flex-col shadow-xl relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <img src={p.images?.[0] || 'https://via.placeholder.com/80x80'} alt={p.title} className="w-16 h-16 rounded-lg object-cover border border-dark-700" />
                <div className="flex-1">
                  <div className="font-bold text-lg text-white group-hover:text-primary-400 cursor-pointer" onClick={() => navigate(`/produto/${p.id}`)}>{p.title}</div>
                  <div className="text-xs text-dark-400">{p.category?.name || p.type}</div>
                  <div className="text-xs text-dark-400">Status: <span className="font-semibold text-primary-400">{statusLabels[p.status] || p.status}</span></div>
                </div>
              </div>
              <div className="flex-1 text-sm text-zinc-300 mb-2">{p.description?.slice(0, 80)}...</div>
              <div className="flex items-center justify-between mt-auto">
                <div className="font-bold text-lg text-green-400">R$ {p.price?.toFixed(2)}</div>
                <div className="flex gap-2">
                  <button className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-1 rounded text-xs" onClick={() => navigate(`/vender?edit=${p.id}`)}>Editar</button>
                  <button className="bg-yellow-700 hover:bg-yellow-800 text-white px-3 py-1 rounded text-xs" onClick={() => setToast({ type: 'success', message: 'Função pausar/despausar em breve!' })}>Pausar</button>
                  <button className="bg-red-700 hover:bg-red-800 text-white px-3 py-1 rounded text-xs" onClick={() => handleRemove(p.id)}>Remover</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 