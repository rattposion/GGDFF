import { useState } from 'react';
import api from '../services/api';

export function useSteamInventory() {
  const [inventory, setInventory] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchInventory() {
    setLoading(true);
    const { data } = await api.get('/steam/inventory');
    setInventory(data);
    setLoading(false);
  }

  return { inventory, loading, fetchInventory };
} 