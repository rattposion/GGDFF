import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { ToastNotification } from "../components/UI/ToastNotification";

export default function DisputeDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [dispute, setDispute] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [toast, setToast] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchDispute = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/disputes/${id}`);
      setDispute(res.data);
    } catch {
      setToast({ type: 'error', message: 'Erro ao carregar disputa.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDispute();
    // Scroll para o fim das mensagens
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 300);
    // eslint-disable-next-line
  }, [id]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() && !file) return;
    // Enviar mensagem/prova (mock)
    setToast({ type: 'success', message: 'Mensagem/prova enviada!' });
    setMessage("");
    setFile(null);
    await fetchDispute();
  };

  const handleResolve = async () => {
    // Resolver disputa (mock)
    setToast({ type: 'success', message: 'Disputa resolvida!' });
    await fetchDispute();
  };

  if (loading) return <div className="p-4">Carregando disputa...</div>;
  if (!dispute) return <div className="p-4 text-red-500">Disputa não encontrada.</div>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Detalhes da Disputa</h2>
      {toast && <ToastNotification type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
      <div className="bg-zinc-900 rounded p-4 mb-4">
        <div className="font-semibold">Produto: {dispute.product?.title || 'Produto'}</div>
        <div className="text-xs text-zinc-400">Status: {dispute.status}</div>
        <div className="text-xs text-zinc-400">Aberta em: {dispute.createdAt?.slice(0, 10)}</div>
        <div className="text-xs text-zinc-400">Partes: {dispute.buyer?.name} (comprador) x {dispute.seller?.name} (vendedor)</div>
      </div>
      <div className="bg-zinc-800 rounded p-4 mb-4 max-h-80 overflow-y-auto">
        <div className="font-bold mb-2">Mensagens e Provas</div>
        {dispute.messages?.length === 0 && <div>Nenhuma mensagem ainda.</div>}
        {dispute.messages?.map((m: any, i: number) => (
          <div key={i} className="mb-2">
            <div className="text-xs text-zinc-400">{m.user?.name || 'Usuário'} - {m.createdAt?.slice(0, 16)}</div>
            <div>{m.text}</div>
            {m.fileUrl && (
              <a href={m.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">Ver Prova</a>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="flex flex-col gap-2 mb-4">
        <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Digite uma mensagem..." className="p-2 rounded bg-zinc-800 text-white" />
        <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} className="bg-zinc-800 text-white" />
        <button type="submit" className="bg-blue-700 px-4 py-2 rounded text-white">Enviar Mensagem/Prova</button>
      </form>
      {user?.isAdmin && dispute.status !== 'resolvida' && (
        <button className="bg-green-700 px-4 py-2 rounded text-white" onClick={handleResolve}>Resolver Disputa</button>
      )}
      <div className="mt-4 text-xs text-zinc-400">Histórico: {dispute.history?.join(' | ')}</div>
    </div>
  );
} 