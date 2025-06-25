import { useEffect, useState } from 'react';
import api from '../services/api';

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    api.get('/categories')
      .then(res => setCategories(res.data))
      .catch(err => setError('Erro ao buscar categorias'))
      .finally(() => setLoading(false));
  }, []);

  return { categories, loading, error };
} 