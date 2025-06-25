import React, { useEffect, useState } from "react";
import api from "../services/api";
import { ToastNotification } from "../components/UI/ToastNotification";

export default function SubscriptionsPage() {
  const [subs, setSubs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const fetchSubs = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/subscriptions');
      setSubs(data);
    } catch {
      setToast({ type: 'error', message: 'Erro ao carregar assinaturas.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubs();
  }, []);

  const handleRenew = async (id: string) => {
    try {
      await api.post(`/subscriptions/${id}/renew`);
      setToast({ type: 'success', message: 'Assinatura renovada!' });
      await fetchSubs();
    } catch {
      setToast({ type: 'error', message: 'Erro ao renovar assinatura.' });
    }
  };

  const handleCancel = async (id: string) => {
    try {
      await api.post(`/subscriptions/${id}/cancel`);
      setToast({ type: 'success', message: 'Assinatura cancelada!' });
      await fetchSubs();
    } catch {
      setToast({ type: 'error', message: 'Erro ao cancelar assinatura.' });
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Minhas Assinaturas</h2>
      {toast && <ToastNotification type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
      {loading ? <div>Carregando assinaturas...</div> : null}
      <ul className="space-y-3">
        {subs.length === 0 && <li>Nenhuma assinatura encontrada.</li>}
        {subs.map((s: any) => (
          <li key={s.id} className="bg-zinc-900 rounded p-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
            <div className="flex-1">
              <div className="font-semibold">{s.product?.title || 'Produto'}</div>
              <div className="text-xs text-zinc-400">Plano: {s.plan?.name} ({s.plan?.duration})</div>
              <div className="text-xs text-zinc-400">Validade: {s.validUntil?.slice(0, 10) || 'N/A'}</div>
              <div className="text-xs text-zinc-400">Status: <span className="font-bold text-white">{s.status}</span></div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {s.status === 'active' && <button className="bg-blue-700 px-2 py-1 rounded text-white" onClick={() => handleRenew(s.id)}>Renovar</button>}
              {s.status === 'active' && <button className="bg-red-700 px-2 py-1 rounded text-white" onClick={() => handleCancel(s.id)}>Cancelar</button>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
} 