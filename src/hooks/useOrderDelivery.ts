import api from '../services/api';

export async function useOrderDelivery(orderId: string) {
  const { data } = await api.get(`/orders/${orderId}/delivery`);
  return data;
} 