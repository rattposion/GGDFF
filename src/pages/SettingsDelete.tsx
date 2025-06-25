import React, { useState } from "react";
import api from "../services/api";
import { ToastNotification } from "../components/UI/ToastNotification";

export default function SettingsDeletePage() {
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleDelete = async () => {
    if (confirm !== 'DELETAR') {
      setToast({ type: 'error', message: 'Digite DELETAR para confirmar.' });
      return;
    }
    setLoading(true);
    try {
      await api.delete('/user');
      setToast({ type: 'success', message: 'Conta excluída!' });
      // Redirecionar/logout (mock)
    } catch {
      setToast({ type: 'error', message: 'Erro ao excluir conta.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Excluir Conta</h2>
      {toast && <ToastNotification type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
      <div className="mb-4">Digite <b>DELETAR</b> para confirmar a exclusão da sua conta.</div>
      <input value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="DELETAR" className="w-full p-2 rounded bg-zinc-800 text-white mb-2" />
      <button className="bg-red-700 px-6 py-2 rounded text-white" onClick={handleDelete} disabled={loading}>{loading ? 'Excluindo...' : 'Excluir Conta'}</button>
    </div>
  );
} 