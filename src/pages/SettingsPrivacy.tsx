import React, { useState } from "react";
import api from "../services/api";
import { ToastNotification } from "../components/UI/ToastNotification";

export default function SettingsPrivacyPage() {
  const [prefs, setPrefs] = useState<any>({ publicProfile: true, showSales: true, consent: false });
  const [toast, setToast] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, checked } = e.target;
    setPrefs((p: any) => ({ ...p, [name]: checked }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await api.put('/user/privacy', prefs);
      setToast({ type: 'success', message: 'Preferências salvas!' });
    } catch {
      setToast({ type: 'error', message: 'Erro ao salvar preferências.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Configurações de Privacidade</h2>
      {toast && <ToastNotification type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
      <div className="space-y-2 mb-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" name="publicProfile" checked={prefs.publicProfile} onChange={handleChange} /> Perfil público
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="showSales" checked={prefs.showSales} onChange={handleChange} /> Exibir vendas publicamente
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="consent" checked={prefs.consent} onChange={handleChange} /> Concordo com os termos de uso e privacidade
        </label>
      </div>
      <button className="bg-blue-700 px-6 py-2 rounded text-white" onClick={handleSave} disabled={loading}>{loading ? 'Salvando...' : 'Salvar Preferências'}</button>
    </div>
  );
} 