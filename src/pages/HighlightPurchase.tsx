import React, { useEffect, useState } from "react";
import api from "../services/api";
import { ToastNotification } from "../components/UI/ToastNotification";

export default function HighlightPurchasePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [plan, setPlan] = useState('7d');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  useEffect(() => {
    api.get('/user/products').then(res => setProducts(res.data));
  }, []);

  const handlePurchase = async () => {
    if (!selectedProduct) return;
    setLoading(true);
    try {
      await api.post('/highlights/purchase', { productId: selectedProduct, plan });
      setToast({ type: 'success', message: 'Destaque adquirido!' });
    } catch {
      setToast({ type: 'error', message: 'Erro ao adquirir destaque.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Comprar Destaque</h2>
      {toast && <ToastNotification type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
      <div className="mb-4">
        <label className="block mb-1">Selecione o produto:</label>
        <select value={selectedProduct} onChange={e => setSelectedProduct(e.target.value)} className="w-full p-2 rounded bg-zinc-800 text-white">
          <option value="">Selecione</option>
          {products.map((p: any) => <option key={p.id} value={p.id}>{p.title}</option>)}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1">Plano de destaque:</label>
        <select value={plan} onChange={e => setPlan(e.target.value)} className="w-full p-2 rounded bg-zinc-800 text-white">
          <option value="7d">7 dias - R$ 19,90</option>
          <option value="15d">15 dias - R$ 34,90</option>
          <option value="30d">30 dias - R$ 59,90</option>
        </select>
      </div>
      <button className="bg-yellow-700 px-6 py-2 rounded text-white w-full" onClick={handlePurchase} disabled={loading}>{loading ? 'Processando...' : 'Comprar Destaque'}</button>
    </div>
  );
} 