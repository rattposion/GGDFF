import React, { useEffect, useState } from 'react';
import { useOrders } from '../hooks/useOrders';
import { useAuth } from '../hooks/useAuth';
import { ToastNotification } from '../components/UI/ToastNotification';

export default function OrdersPage() {
  const { user } = useAuth();
  const { orders, loading, refresh } = useOrders();
  const [filter, setFilter] = useState('all');
  const [toast, setToast] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const filteredOrders = orders?.filter((o: any) => {
    if (filter === 'all') return true;
    return o.status === filter;
  }) || [];

  const handleOpenDispute = async (orderId: string) => {
    // Chamar API real para abrir disputa
    setToast({ type: 'success', message: 'Disputa aberta!' });
    await refresh();
  };

  const handleViewDelivery = (order: any) => {
    if (order.deliveryType === 'file') {
      window.open(order.deliveryFile, '_blank');
    } else if (order.deliveryType === 'link') {
      window.open(order.deliveryContent, '_blank');
    } else if (order.deliveryType === 'text') {
      alert(order.deliveryContent);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Meus Pedidos</h2>
      {toast && <ToastNotification type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
      <div className="flex gap-2 mb-4">
        <select value={filter} onChange={e => setFilter(e.target.value)} className="p-2 rounded bg-zinc-800 text-white">
          <option value="all">Todos</option>
          <option value="pending">Pendente</option>
          <option value="paid">Pago</option>
          <option value="delivered">Entregue</option>
          <option value="dispute">Disputa</option>
          <option value="resolved">Resolvido</option>
        </select>
        <button onClick={refresh} className="bg-blue-700 px-4 rounded text-white">Atualizar</button>
      </div>
      {loading ? (
        <div>Carregando pedidos...</div>
      ) : (
        <ul className="space-y-3">
          {filteredOrders.length === 0 && <li>Nenhum pedido encontrado.</li>}
          {filteredOrders.map((o: any) => (
            <li key={o.id} className="bg-zinc-900 rounded p-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
              <div className="flex-1">
                <div className="font-semibold">{o.product?.title || 'Produto'}</div>
                <div className="text-xs text-zinc-400">{o.createdAt?.slice(0, 10)}</div>
                <div className="text-xs text-zinc-400">{o.buyerId === user?.id ? 'Comprador' : 'Vendedor'}</div>
                <div className="text-xs text-zinc-400">Status: <span className="font-bold text-white">{o.status}</span></div>
                {o.status === 'delivered' && o.deliveryType && (
                  <button onClick={() => handleViewDelivery(o)} className="bg-green-700 px-2 py-1 rounded text-white mt-2">Ver Entrega</button>
                )}
                {o.status === 'dispute' && (
                  <span className="bg-yellow-700 px-2 py-1 rounded text-white mt-2">Em disputa</span>
                )}
              </div>
              <div className="flex gap-2 flex-wrap">
                {o.status === 'paid' && (
                  <button onClick={() => handleOpenDispute(o.id)} className="bg-yellow-700 px-2 py-1 rounded text-white">Abrir Disputa</button>
                )}
                {o.status === 'delivered' && (
                  <button className="bg-blue-700 px-2 py-1 rounded text-white">Avaliar</button>
                )}
                <button className="bg-zinc-700 px-2 py-1 rounded text-white">Chat</button>
                <button className="bg-zinc-700 px-2 py-1 rounded text-white">Detalhes</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 