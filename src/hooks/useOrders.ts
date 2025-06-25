import { useEffect, useState } from 'react';
import api from '../services/api';

export function useOrders(role: 'buyer' | 'seller' | undefined = undefined) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    api.get('/orders', { params: role ? { role } : {} })
      .then(res => setOrders(res.data))
      .catch(err => setError('Erro ao buscar pedidos'))
      .finally(() => setLoading(false));
  }, [role]);

  return { orders, loading, error };
} 