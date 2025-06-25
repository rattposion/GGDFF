import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useChat } from "../hooks/useChat";
import { useAuth } from "../hooks/useAuth";
import { ToastNotification } from "../components/UI/ToastNotification";

export default function ChatPage() {
  const { orderId } = useParams();
  const { user } = useAuth();
  const { messages, sendMessage, loading, expired, timeLeft } = useChat(orderId);
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [toast, setToast] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() && !file) return;
    await sendMessage({ text, file });
    setText("");
    setFile(null);
    setToast({ type: 'success', message: 'Mensagem enviada!' });
  };

  if (loading) return <div className="p-4">Carregando chat...</div>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Chat da Compra</h2>
      {toast && <ToastNotification type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
      <div className="mb-2 text-xs text-zinc-400">
        {expired ? (
          <span className="text-red-400">Chat expirado</span>
        ) : (
          <span>Tempo restante: {timeLeft}</span>
        )}
      </div>
      <div className="bg-zinc-900 rounded p-4 mb-4 max-h-80 overflow-y-auto">
        {messages.length === 0 && <div>Nenhuma mensagem ainda.</div>}
        {messages.map((m: any, i: number) => (
          <div key={i} className={`mb-2 ${m.userId === user?.id ? 'text-right' : 'text-left'}`}> 
            <div className="text-xs text-zinc-400">{m.user?.name || 'Usuário'} - {m.createdAt?.slice(0, 16)}</div>
            <div className="inline-block bg-zinc-800 px-2 py-1 rounded text-white">{m.text}</div>
            {m.fileUrl && (
              <div><a href={m.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">Ver Arquivo</a></div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend} className="flex flex-col gap-2" disabled={expired}>
        <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Digite uma mensagem..." className="p-2 rounded bg-zinc-800 text-white" disabled={expired} />
        <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} className="bg-zinc-800 text-white" disabled={expired} />
        <button type="submit" className="bg-blue-700 px-4 py-2 rounded text-white" disabled={expired}>Enviar</button>
      </form>
    </div>
  );
} 