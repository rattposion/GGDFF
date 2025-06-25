import { useEffect, useState } from 'react';
import api from '../services/api';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    api.get('/products')
      .then(res => setProducts(res.data))
      .catch(err => setError('Erro ao buscar produtos'))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
} 