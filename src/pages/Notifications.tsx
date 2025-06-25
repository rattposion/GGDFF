import React, { useEffect, useState } from "react";
import api from "../services/api";
import { ToastNotification } from "../components/UI/ToastNotification";

const typeLabels: any = {
  sale: 'Venda',
  message: 'Mensagem',
  dispute: 'Disputa',
  question: 'Pergunta',
  delivery: 'Entrega',
  review: 'Avaliação',
  other: 'Outro',
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await api.get('/notifications');
      setNotifications(res.data);
    } catch {
      setToast({ type: 'error', message: 'Erro ao carregar notificações.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleRead = async (id: string) => {
    try {
      await api.put(`/notifications/${id}/read`);
      setNotifications(n => n.map(x => x.id === id ? { ...x, read: true } : x));
    } catch {
      setToast({ type: 'error', message: 'Erro ao marcar como lida.' });
    }
  };

  const handleAction = (n: any) => {
    if (n.actionUrl) window.location.href = n.actionUrl;
  };

  // Agrupamento por tipo
  const grouped = notifications.reduce((acc: any, n: any) => {
    const type = n.type || 'other';
    if (!acc[type]) acc[type] = [];
    acc[type].push(n);
    return acc;
  }, {});

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Notificações</h2>
      {toast && <ToastNotification type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
      {loading ? <div>Carregando notificações...</div> : null}
      {Object.keys(grouped).length === 0 && <div>Nenhuma notificação encontrada.</div>}
      {Object.entries(grouped).map(([type, list]: any) => (
        <div key={type} className="mb-6">
          <h3 className="font-semibold mb-2">{typeLabels[type] || type}</h3>
          <ul className="space-y-2">
            {list.map((n: any) => (
              <li key={n.id} className={`bg-zinc-900 rounded p-3 flex items-center gap-4 ${n.read ? 'opacity-60' : ''}`}>
                <div className="flex-1 cursor-pointer" onClick={() => handleAction(n)}>
                  <div className="font-semibold">{n.title}</div>
                  <div className="text-xs text-zinc-400">{n.message}</div>
                  <div className="text-xs text-zinc-500">{n.createdAt?.slice(0, 16)}</div>
                </div>
                {!n.read && <button className="bg-blue-700 px-2 py-1 rounded text-white" onClick={() => handleRead(n.id)}>Marcar como lida</button>}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
} 