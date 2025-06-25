import { useOrders } from '../hooks/useOrders';
import { useState } from 'react';
import { useOrderDelivery } from '../hooks/useOrderDelivery';
import { useWallet } from '../hooks/useWallet';
import { useReviews } from '../hooks/useReviews';
import { useQuestions } from '../hooks/useQuestions';
import { renewSubscription, cancelSubscription } from '../hooks/useSubscriptionActions';

export default function UserPanel() {
  const { orders: purchases, loading: loadingPurchases } = useOrders('buyer');
  const { orders: sales, loading: loadingSales } = useOrders('seller');
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [delivery, setDelivery] = useState<any>(null);
  const { wallet, loading: loadingWallet } = useWallet();
  const { reviews: receivedReviews } = useReviews('received');
  const { reviews: sentReviews } = useReviews('sent');
  const { questions: receivedQuestions } = useQuestions('received');
  const { questions: sentQuestions } = useQuestions('sent');
  const [loadingRenew, setLoadingRenew] = useState<string | null>(null);
  const [loadingCancel, setLoadingCancel] = useState<string | null>(null);

  async function handleShowDelivery(orderId: string) {
    const data = await useOrderDelivery(orderId);
    setDelivery(data);
    setSelectedOrder(orderId);
  }

  async function handleRenew(orderId: string) {
    setLoadingRenew(orderId);
    await renewSubscription(orderId);
    setLoadingRenew(null);
    alert('Assinatura renovada!');
  }

  async function handleCancel(orderId: string) {
    setLoadingCancel(orderId);
    await cancelSubscription(orderId);
    setLoadingCancel(null);
    alert('Assinatura cancelada!');
  }

  return (
    <div>
      <h2>Painel do Usuário</h2>
      <section>
        <h3>Wallet</h3>
        {loadingWallet ? <p>Carregando saldo...</p> : (
          <div>
            <p>Saldo: R$ {wallet?.balance?.toFixed(2) ?? '0,00'}</p>
            {/* Histórico de transações e botão de saque Pix aqui */}
          </div>
        )}
      </section>
      <section>
        <h3>Histórico de Compras</h3>
        {loadingPurchases ? <p>Carregando...</p> : (
          <ul>
            {purchases.map((order: any) => (
              <li key={order.id}>
                Produto: {order.product.title} | Status: {order.status}
                <button onClick={() => handleShowDelivery(order.id)}>Ver Entrega</button>
                {order.subscriptionPlanId && (
                  <>
                    <button onClick={() => handleRenew(order.id)} disabled={loadingRenew === order.id} style={{ opacity: loadingRenew === order.id ? 0.7 : 1 }}>
                      {loadingRenew === order.id ? 'Renovando...' : 'Renovar'}
                    </button>
                    <button onClick={() => handleCancel(order.id)} disabled={loadingCancel === order.id} style={{ opacity: loadingCancel === order.id ? 0.7 : 1 }}>
                      {loadingCancel === order.id ? 'Cancelando...' : 'Cancelar'}
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
      <section>
        <h3>Histórico de Vendas</h3>
        {loadingSales ? <p>Carregando...</p> : (
          <ul>
            {sales.map((order: any) => (
              <li key={order.id}>
                Produto: {order.product.title} | Comprador: {order.buyer.username} | Status: {order.status}
              </li>
            ))}
          </ul>
        )}
      </section>
      <section>
        <h3>Avaliações Recebidas</h3>
        <ul>
          {receivedReviews.map((review: any) => (
            <li key={review.id}>
              Nota: {review.rating} - {review.comment}
            </li>
          ))}
        </ul>
        <h3>Avaliações Enviadas</h3>
        <ul>
          {sentReviews.map((review: any) => (
            <li key={review.id}>
              Produto: {review.productId} - Nota: {review.rating} - {review.comment}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h3>Perguntas Recebidas</h3>
        <ul>
          {receivedQuestions.map((q: any) => (
            <li key={q.id}>
              Produto: {q.productId} - Pergunta: {q.question} - Resposta: {q.answer ?? 'Aguardando resposta'}
            </li>
          ))}
        </ul>
        <h3>Perguntas Feitas</h3>
        <ul>
          {sentQuestions.map((q: any) => (
            <li key={q.id}>
              Produto: {q.productId} - Pergunta: {q.question} - Resposta: {q.answer ?? 'Aguardando resposta'}
            </li>
          ))}
        </ul>
      </section>
      {delivery && selectedOrder && (
        <div>
          <h3>Entrega do Pedido #{selectedOrder}</h3>
          {delivery.deliveryType === 'file' && (
            <a href={delivery.deliveryFile} download>Baixar Arquivo</a>
          )}
          {delivery.deliveryType === 'text' && (
            <p>{delivery.deliveryContent}</p>
          )}
          {delivery.deliveryType === 'link' && (
            <a href={delivery.deliveryContent} target="_blank" rel="noopener noreferrer">Acessar Link</a>
          )}
        </div>
      )}
    </div>
  );
} 