import React, { useState } from "react";
import api from "../services/api";
import { ToastNotification } from "../components/UI/ToastNotification";

export default function SettingsBackupPage() {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleBackup = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/user/backup');
      // Simular download
      const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'backup.json';
      a.click();
      setToast({ type: 'success', message: 'Backup exportado!' });
    } catch {
      setToast({ type: 'error', message: 'Erro ao exportar backup.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Backup de Dados</h2>
      {toast && <ToastNotification type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
      <button className="bg-blue-700 px-6 py-2 rounded text-white" onClick={handleBackup} disabled={loading}>{loading ? 'Exportando...' : 'Exportar Backup'}</button>
    </div>
  );
} 