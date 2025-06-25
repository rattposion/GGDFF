import { useEffect, useState } from 'react';
import api from '../services/api';
import socket from '../services/socket';
import { ToastNotification } from '../components/UI/ToastNotification';

const typeLabels: any = {
  all: 'Todos',
  dispute: 'Disputas',
  review: 'Avaliações',
  info: 'Perguntas',
  delivery: 'Entregas',
  payment: 'Pagamentos',
};

export default function AdminPanel() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [orderBy, setOrderBy] = useState('date-desc');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const pageSize = 10;

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await api.get('/notifications?admin=true');
      setNotifications(res.data);
    } catch {
      setToast({ type: 'error', message: 'Erro ao carregar notificações.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    socket.on('notification', (data) => {
      setNotifications((prev) => [data, ...prev]);
    });
    return () => socket.off('notification');
  }, []);

  // Filtros, busca e ordenação
  let filtered = notifications.filter(n =>
    (filter === 'all' || n.type === filter) &&
    (search === '' || n.title.toLowerCase().includes(search.toLowerCase()) || n.message.toLowerCase().includes(search.toLowerCase()))
  );
  if (orderBy === 'date-desc') filtered = filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  if (orderBy === 'date-asc') filtered = filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filtered.length / pageSize);

  // KPIs
  const kpi = {
    total: notifications.length,
    disputes: notifications.filter(n => n.type === 'dispute').length,
    reviews: notifications.filter(n => n.type === 'review').length,
    questions: notifications.filter(n => n.type === 'info').length,
    deliveries: notifications.filter(n => n.type === 'delivery').length,
  };

  // Ações rápidas reais
  async function handleAction(n: any, action: string) {
    setLoading(true);
    try {
      if (action === 'remover') {
        if (n.type === 'review') await api.delete(`/admin/reviews/${n.id}`);
        if (n.type === 'info') await api.delete(`/admin/questions/${n.id}`);
      } else if (action === 'resolver') {
        await api.put(`/admin/disputes/${n.id}/resolve`, { orderId: n.orderId, resolution: 'Resolvido pelo admin' });
      } else if (action === 'aprovar') {
        await api.put(`/admin/products/${n.productId}/approve`);
      }
      setToast({ type: 'success', message: 'Ação realizada com sucesso!' });
      await fetchNotifications();
    } catch {
      setToast({ type: 'error', message: 'Erro ao executar ação.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: 24 }}>
      <h2>Painel Admin</h2>
      {toast && <ToastNotification type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
      <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
        <input placeholder="Buscar..." value={search} onChange={e => setSearch(e.target.value)} style={{ flex: 1, padding: 8, minWidth: 180 }} />
        <select value={filter} onChange={e => setFilter(e.target.value)} style={{ padding: 8 }}>
          {Object.keys(typeLabels).map(type => <option key={type} value={type}>{typeLabels[type]}</option>)}
        </select>
        <select value={orderBy} onChange={e => setOrderBy(e.target.value)} style={{ padding: 8 }}>
          <option value="date-desc">Mais recentes</option>
          <option value="date-asc">Mais antigos</option>
        </select>
      </div>
      <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
        <div style={{ background: '#222', color: '#fff', padding: 12, borderRadius: 6 }}>Total: {kpi.total}</div>
        <div style={{ background: '#222', color: '#fff', padding: 12, borderRadius: 6 }}>Disputas: {kpi.disputes}</div>
        <div style={{ background: '#222', color: '#fff', padding: 12, borderRadius: 6 }}>Avaliações: {kpi.reviews}</div>
        <div style={{ background: '#222', color: '#fff', padding: 12, borderRadius: 6 }}>Perguntas: {kpi.questions}</div>
        <div style={{ background: '#222', color: '#fff', padding: 12, borderRadius: 6 }}>Entregas: {kpi.deliveries}</div>
      </div>
      {loading ? <div style={{ color: '#4fd1c5', marginBottom: 16 }}>Carregando...</div> : null}
      <ul>
        {paginated.map((n: any, i: number) => (
          <li key={i} style={{ marginBottom: 12, background: '#222', color: '#fff', padding: 12, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <div>
              <strong>{n.title}</strong> — {n.message}
              {n.actionUrl && <a href={n.actionUrl} style={{ color: '#4fd1c5', marginLeft: 8 }} target="_blank" rel="noopener noreferrer">Ver</a>}
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {n.type === 'dispute' && <button onClick={() => handleAction(n, 'resolver')}>Resolver</button>}
              {n.type === 'review' && <button onClick={() => handleAction(n, 'remover')}>Remover</button>}
              {n.type === 'info' && <button onClick={() => handleAction(n, 'remover')}>Remover</button>}
              {n.type === 'delivery' && <button onClick={() => handleAction(n, 'aprovar')}>Aprovar</button>}
            </div>
          </li>
        ))}
      </ul>
      <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Anterior</button>
        <span>Página {page} de {totalPages}</span>
        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Próxima</button>
      </div>
    </div>
  );
} 