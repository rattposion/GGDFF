import { useEffect, useState } from 'react';
import api from '../services/api';

export function useWallet() {
  const [wallet, setWallet] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get('/auth/users/me/wallet')
      .then(res => setWallet(res.data))
      .finally(() => setLoading(false));
  }, []);

  return { wallet, loading };
} 