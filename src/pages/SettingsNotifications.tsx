import React, { useState } from "react";
import api from "../services/api";
import { ToastNotification } from "../components/UI/ToastNotification";

const notificationTypes = [
  { key: 'push', label: 'Push' },
  { key: 'email', label: 'E-mail' },
  { key: 'sms', label: 'SMS' },
  { key: 'telegram', label: 'Telegram' },
  { key: 'whatsapp', label: 'WhatsApp' },
  { key: 'system', label: 'Sistema' },
  { key: 'promotions', label: 'Promoções' },
  { key: 'expirations', label: 'Expiração' },
];

export default function SettingsNotificationsPage() {
  const [prefs, setPrefs] = useState<any>({});
  const [toast, setToast] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (key: string) => {
    setPrefs((p: any) => ({ ...p, [key]: !p[key] }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await api.put('/user/notifications', prefs);
      setToast({ type: 'success', message: 'Preferências salvas!' });
    } catch {
      setToast({ type: 'error', message: 'Erro ao salvar preferências.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Configurações de Notificações</h2>
      {toast && <ToastNotification type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
      <div className="space-y-2 mb-4">
        {notificationTypes.map(nt => (
          <label key={nt.key} className="flex items-center gap-2">
            <input type="checkbox" checked={!!prefs[nt.key]} onChange={() => handleChange(nt.key)} /> {nt.label}
          </label>
        ))}
      </div>
      <button className="bg-blue-700 px-6 py-2 rounded text-white" onClick={handleSave} disabled={loading}>{loading ? 'Salvando...' : 'Salvar Preferências'}</button>
    </div>
  );
} 