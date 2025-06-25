import { useEffect, useState } from 'react';
import api from '../services/api';
import socket from '../services/socket';

export function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    api.get('/notifications')
      .then(res => setNotifications(res.data))
      .catch(err => setError('Erro ao buscar notificações'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    socket.on('notification', (data) => {
      setNotifications((prev) => [data, ...prev]);
      // Opcional: exibir toast ou alerta
    });
    return () => {
      socket.off('notification');
    };
  }, []);

  async function markAsRead(id: string) {
    await api.put(`/notifications/${id}/read`);
    setNotifications(notifications => notifications.map(n => n.id === id ? { ...n, read: true } : n));
  }

  return { notifications, loading, error, markAsRead };
} 