import api from '../services/api';

export async function criarCobrancaPix(amount: number, description: string) {
  const { data } = await api.post('/pix/charge', { amount, description });
  return data; // data.qrCodeImage ou data.qrCode
} 