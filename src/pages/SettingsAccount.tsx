import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import api from "../services/api";
import { ToastNotification } from "../components/UI/ToastNotification";

export default function SettingsAccountPage() {
  const { user, refresh } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', password: '', photo: null, document: null });
  const [toast, setToast] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    if (files) setForm(f => ({ ...f, [name]: files[0] }));
    else setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Chamar API real para atualizar perfil
      await api.put('/user', form);
      setToast({ type: 'success', message: 'Perfil atualizado!' });
      await refresh();
    } catch {
      setToast({ type: 'error', message: 'Erro ao atualizar perfil.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Configurações da Conta</h2>
      {toast && <ToastNotification type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Nome" className="w-full p-2 rounded bg-zinc-800 text-white" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="E-mail" className="w-full p-2 rounded bg-zinc-800 text-white" />
        <input name="password" value={form.password} onChange={handleChange} placeholder="Nova senha" type="password" className="w-full p-2 rounded bg-zinc-800 text-white" />
        <div>
          <label>Foto de perfil:</label>
          <input type="file" name="photo" onChange={handleChange} className="block mt-1" />
        </div>
        <div>
          <label>Documento (RG/CNH):</label>
          <input type="file" name="document" onChange={handleChange} className="block mt-1" />
        </div>
        <button type="submit" className="bg-blue-700 px-6 py-2 rounded text-white" disabled={loading}>{loading ? 'Salvando...' : 'Salvar'}</button>
      </form>
      <div className="mt-4 text-xs text-zinc-400">Status de verificação: {user?.isVerified ? 'Verificado' : 'Pendente'}</div>
    </div>
  );
} 