import { useState, useEffect } from 'react';
import api from '../services/api';
import { criarCobrancaPix } from '../hooks/usePix';
import { useAuth } from '../hooks/useAuth';
import { useQuestions } from '../hooks/useQuestions';
import { useReviews } from '../hooks/useReviews';
import { ToastNotification } from '../components/UI/ToastNotification';
import { motion } from 'framer-motion';
import { Star, Heart, Share2, Flag, Copy, Steam } from 'lucide-react';

export default function ProductPage({ product }: { product: any }) {
  const { user } = useAuth();
  const [selectedVariation, setSelectedVariation] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [showDelivery, setShowDelivery] = useState(false);
  const [delivery, setDelivery] = useState<any>(null);
  const [loadingBuy, setLoadingBuy] = useState(false);
  const [buySuccess, setBuySuccess] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const { questions, addQuestion, addAnswer, loading: loadingQuestions } = useQuestions(product?.id);
  const { reviews, addReview, loading: loadingReviews } = useReviews(product?.id);
  const [questionText, setQuestionText] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [imgIndex, setImgIndex] = useState(0);  

  useEffect(() => {
    // Checar se favorito (mock)
    setFavorite(false);
  }, [product]);

  const handleBuy = async () => {
    setLoadingBuy(true);
    setBuySuccess(false);
    try {
      const { data: order } = await api.post('/orders', {
        productId: product.id,
        variationId: selectedVariation,
        subscriptionPlanId: selectedPlan,
        amount: product.price, // ou preço da variação/plano
        paymentMethod: 'pix',
      });
      setOrderId(order.id);
      const pix = await criarCobrancaPix(order.amount, `Pedido #${order.id}`);
      setQrCode(pix.qrCodeImage);
      setBuySuccess(true);
    } finally {
      setLoadingBuy(false);
    }
  };

  const handleCheckDelivery = async () => {
    const { data } = await api.get(`/orders/${orderId}/delivery`);
    setDelivery(data);
    setShowDelivery(true);
  };

  useEffect(() => {
    let interval: any;
    if (orderId && qrCode) {
      interval = setInterval(async () => {
        const { data: order } = await api.get(`/orders/${orderId}`);
        if (order.status === 'paid' || order.status === 'completed') {
          clearInterval(interval);
          setQrCode(null);
          setShowDelivery(true);
        }
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [orderId, qrCode]);

  const handleFavorite = async () => {
    setFavorite(f => !f);
    setToast({ type: 'success', message: favorite ? 'Removido dos favoritos' : 'Adicionado aos favoritos' });
    // Chamar API real de favoritos
  };

  const handleAsk = async () => {
    if (!questionText.trim()) return;
    await addQuestion(questionText);
    setQuestionText('');
    setToast({ type: 'success', message: 'Pergunta enviada!' });
  };

  const handleReview = async () => {
    if (!reviewText.trim()) return;
    await addReview({ rating: reviewRating, comment: reviewText });
    setReviewText('');
    setReviewRating(5);
    setToast({ type: 'success', message: 'Avaliação enviada!' });
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setToast({ type: 'success', message: 'Link copiado!' });
  };

  return (
    <section className="py-10 min-h-[80vh] bg-dark-950">
      <div className="max-w-5xl mx-auto px-4">
        {toast && <ToastNotification type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Galeria de imagens */}
          <div className="flex-1 flex flex-col items-center">
            <div className="relative w-full max-w-md aspect-video rounded-xl overflow-hidden bg-dark-800 flex items-center justify-center">
              {product.images?.length > 0 ? (
                <img src={product.images[imgIndex]} alt={product.title} className="object-contain w-full h-full transition-all duration-300" />
              ) : (
                <div className="text-zinc-400">Sem imagem</div>
              )}
              {product.images?.length > 1 && (
                <>
                  <button className="absolute left-2 top-1/2 -translate-y-1/2 bg-dark-900/80 rounded-full p-1" onClick={() => setImgIndex(i => Math.max(0, i-1))} disabled={imgIndex === 0}>&lt;</button>
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-dark-900/80 rounded-full p-1" onClick={() => setImgIndex(i => Math.min(product.images.length-1, i+1))} disabled={imgIndex === product.images.length-1}>&gt;</button>
                </>
              )}
            </div>
            <div className="flex gap-2 mt-2">
              {product.images?.map((img: string, i: number) => (
                <img key={i} src={img} alt="print" className={`w-14 h-14 object-cover rounded border-2 cursor-pointer ${imgIndex===i?'border-primary-500':'border-dark-700'}`} onClick={() => setImgIndex(i)} />
              ))}
            </div>
            <div className="flex gap-2 mt-4">
              <button className="bg-dark-800 hover:bg-dark-700 text-white px-3 py-1 rounded flex items-center gap-1" onClick={() => handleCopy(window.location.href)}><Share2 size={16}/> Compartilhar</button>
              <button className="bg-dark-800 hover:bg-dark-700 text-white px-3 py-1 rounded flex items-center gap-1" onClick={() => setToast({ type: 'success', message: 'Função denunciar em breve!' })}><Flag size={16}/> Denunciar</button>
              <button className={`px-3 py-1 rounded flex items-center gap-1 ${favorite ? 'bg-yellow-700 text-white' : 'bg-zinc-700 text-yellow-400'}`} onClick={handleFavorite}><Heart size={16}/>{favorite ? 'Favorito' : 'Favoritar'}</button>
            </div>
          </div>
          {/* Detalhes do produto */}
          <div className="flex-1 space-y-4">
            <motion.h2 className="text-3xl font-bold text-white" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>{product.title}</motion.h2>
            <div className="flex flex-wrap gap-2 items-center">
              <span className="bg-zinc-700 px-2 py-1 rounded text-xs">{product.category?.name}</span>
              <span className="bg-zinc-700 px-2 py-1 rounded text-xs">{product.subcategory?.name}</span>
              <span className="bg-zinc-700 px-2 py-1 rounded text-xs">{product.status}</span>
              {product.featured && <span className="bg-yellow-700 px-2 py-1 rounded text-xs">Destaque</span>}
              {product.type === 'skin' && <span className="bg-blue-700 px-2 py-1 rounded text-xs flex items-center gap-1"><Steam size={14}/> Steam</span>}
            </div>
            <div className="text-zinc-300 text-base whitespace-pre-line">{product.description}</div>
            {/* Variações */}
            {product.variations && product.variations.length > 0 && (
              <div>
                <h4 className="font-semibold mb-1">Escolha uma variação:</h4>
                <div className="flex flex-wrap gap-2">
                  {product.variations.map((v: any) => (
                    <button key={v.id} className={`px-3 py-1 rounded border ${selectedVariation===v.id?'bg-primary-600 text-white border-primary-400':'bg-dark-800 text-white border-dark-700'}`} onClick={() => setSelectedVariation(v.id)}>{v.name} - R$ {v.price}</button>
                  ))}
                </div>
              </div>
            )}
            {/* Planos */}
            {product.subscriptionPlans && product.subscriptionPlans.length > 0 && (
              <div>
                <h4 className="font-semibold mb-1">Escolha um plano:</h4>
                <div className="flex flex-wrap gap-2">
                  {product.subscriptionPlans.map((p: any) => (
                    <button key={p.id} className={`px-3 py-1 rounded border ${selectedPlan===p.id?'bg-primary-600 text-white border-primary-400':'bg-dark-800 text-white border-dark-700'}`} onClick={() => setSelectedPlan(p.id)}>{p.name} - {p.duration} - R$ {p.price}</button>
                  ))}
                </div>
              </div>
            )}
            <div className="flex gap-2 items-center mt-2">
              <motion.button whileTap={{ scale: 0.97 }} onClick={handleBuy} disabled={loadingBuy} className="bg-green-700 hover:bg-green-600 px-6 py-2 rounded text-white font-bold text-lg shadow-lg transition">
                {loadingBuy ? 'Processando...' : 'Comprar com Pix'}
              </motion.button>
              {buySuccess && <span className="text-green-400 ml-2">Pedido criado!</span>}
            </div>
            {/* Exibir QR Code Pix */}
            {qrCode && (
              <div className="mt-4">
                <h4 className="font-semibold">Pagamento Pix</h4>
                <img src={qrCode} alt="QR Code Pix" className="mx-auto" />
                <button onClick={handleCheckDelivery} className="bg-blue-700 px-4 py-2 rounded text-white mt-2">Ver Entrega</button>
              </div>
            )}
            {/* Exibir entrega automática */}
            {showDelivery && delivery && (
              <div className="mt-4">
                <h4 className="font-semibold">Entrega Automática</h4>
                {delivery.deliveryType === 'file' && (
                  <a href={delivery.deliveryFile} download className="text-blue-400 underline">Baixar Arquivo</a>
                )}
                {delivery.deliveryType === 'text' && (
                  <p className="bg-zinc-900 p-2 rounded mt-2">{delivery.deliveryContent}</p>
                )}
                {delivery.deliveryType === 'link' && (
                  <a href={delivery.deliveryContent} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">Acessar Link</a>
                )}
              </div>
            )}
            {/* Vendedor */}
            <div className="mt-4 bg-zinc-900 p-3 rounded flex items-center gap-4">
              <img src={product.seller?.avatar || 'https://i.pravatar.cc/80'} alt={product.seller?.name || 'Vendedor'} className="w-12 h-12 rounded-full border-2 border-primary-500" />
              <div>
                <div className="font-semibold text-white">{product.seller?.name || 'Desconhecido'}</div>
                <div className="text-xs text-zinc-400">Reputação: {product.seller?.reputation ?? 'N/A'} | Vendas: {product.seller?.totalSales ?? 0}</div>
              </div>
            </div>
            {/* Garantia e detalhes extras */}
            {product.garantia && <div className="mt-2 text-xs text-green-400">Garantia: {product.garantia}</div>}
            {product.info && <div className="mt-2 text-xs text-zinc-300">{product.info}</div>}
          </div>
        </div>
        {/* Perguntas e respostas */}
        <div className="mt-10 bg-dark-900 p-6 rounded-xl shadow-xl">
          <h3 className="text-xl font-bold mb-4 text-primary-400">Perguntas e Respostas</h3>
          {loadingQuestions ? <div>Carregando perguntas...</div> : (
            <ul className="space-y-3 mb-4">
              {questions?.length === 0 && <li className="text-zinc-400">Nenhuma pergunta ainda.</li>}
              {questions?.map((q: any) => (
                <li key={q.id} className="bg-dark-800 p-3 rounded">
                  <div className="font-semibold text-white flex items-center gap-2"><img src={q.user?.avatar || 'https://i.pravatar.cc/32'} alt="avatar" className="w-6 h-6 rounded-full" />{q.user?.name || 'Usuário'}:</div>
                  <div className="text-zinc-200 ml-8">{q.text}</div>
                  {q.answers?.map((a: any, i: number) => (
                    <div key={i} className="ml-12 text-sm text-zinc-400">↳ {a.text} <span className="text-xs">({a.user?.name || 'Vendedor'})</span></div>
                  ))}
                  {user?.id === product.sellerId && (
                    <form onSubmit={e => { e.preventDefault(); addAnswer(q.id, e.currentTarget.answer.value); e.currentTarget.answer.value = ''; }} className="mt-1 flex gap-2 ml-8">
                      <input name="answer" placeholder="Responder..." className="p-1 rounded bg-zinc-700 text-white flex-1" />
                      <button type="submit" className="bg-blue-700 px-2 rounded text-white">Responder</button>
                    </form>
                  )}
                </li>
              ))}
            </ul>
          )}
          <form onSubmit={e => { e.preventDefault(); handleAsk(); }} className="flex gap-2 mt-2">
            <input value={questionText} onChange={e => setQuestionText(e.target.value)} placeholder="Faça uma pergunta..." className="flex-1 p-2 rounded bg-zinc-800 text-white" />
            <button type="submit" className="bg-primary-600 px-4 rounded text-white">Perguntar</button>
          </form>
        </div>
        {/* Avaliações */}
        <div className="mt-10 bg-dark-900 p-6 rounded-xl shadow-xl">
          <h3 className="text-xl font-bold mb-4 text-primary-400">Avaliações</h3>
          {loadingReviews ? <div>Carregando avaliações...</div> : (
            <ul className="space-y-3 mb-4">
              {reviews?.length === 0 && <li className="text-zinc-400">Nenhuma avaliação ainda.</li>}
              {reviews?.map((r: any) => (
                <li key={r.id} className="bg-dark-800 p-3 rounded flex items-center gap-3">
                  <img src={r.buyer?.avatar || 'https://i.pravatar.cc/32'} alt="avatar" className="w-6 h-6 rounded-full" />
                  <div className="flex-1">
                    <div className="flex items-center gap-1">
                      {[...Array(r.rating)].map((_, i) => <Star key={i} size={16} className="text-yellow-400" />)}
                      {[...Array(5 - r.rating)].map((_, i) => <Star key={i} size={16} className="text-zinc-700" />)}
                    </div>
                    <div className="text-zinc-200 text-sm">{r.comment}</div>
                  </div>
                  <div className="text-xs text-zinc-400">{r.buyer?.name || 'Usuário'}</div>
                </li>
              ))}
            </ul>
          )}
          <form onSubmit={e => { e.preventDefault(); handleReview(); }} className="flex flex-col md:flex-row gap-2 mt-2 items-center">
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map(i => (
                <button key={i} type="button" onClick={() => setReviewRating(i)}>{i <= reviewRating ? <Star size={20} className="text-yellow-400" /> : <Star size={20} className="text-zinc-700" />}</button>
              ))}
            </div>
            <input value={reviewText} onChange={e => setReviewText(e.target.value)} placeholder="Deixe seu comentário..." className="flex-1 p-2 rounded bg-zinc-800 text-white" />
            <button type="submit" className="bg-primary-600 px-4 rounded text-white">Avaliar</button>
          </form>
        </div>
      </div>
    </section>
  );
} 