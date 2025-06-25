import api from '../services/api';

export async function renewSubscription(orderId: string) {
  const { data } = await api.post(`/orders/${orderId}/renew`);
  return data;
}

export async function cancelSubscription(orderId: string) {
  const { data } = await api.post(`/orders/${orderId}/cancel`);
  return data;
} 