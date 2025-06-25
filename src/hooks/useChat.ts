import { useEffect, useState } from 'react';
import api from '../services/api';
import socket from '../services/socket';

export function useChat(orderId: string) {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get(`/chat/${orderId}`)
      .then(res => setMessages(res.data))
      .finally(() => setLoading(false));
  }, [orderId]);

  useEffect(() => {
    socket.emit('join', orderId);
    socket.on('chat:receive', (msg) => {
      setMessages((msgs) => [...msgs, msg]);
    });
    return () => {
      socket.off('chat:receive');
    };
  }, [orderId]);

  function sendMessage(message: string, type: string = 'text') {
    socket.emit('chat:send', { orderId, message, type });
    // Opcional: adicionar mensagem localmente para UX instantânea
    setMessages((msgs) => [...msgs, { message, type, senderId: 'me', createdAt: new Date().toISOString() }]);
  }

  return { messages, loading, sendMessage };
} 