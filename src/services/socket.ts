import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_API_URL?.replace('/api', '') || 'ggdf-production.up.railway.app', {
  auth: { token: localStorage.getItem('token') }
});

export default socket; 