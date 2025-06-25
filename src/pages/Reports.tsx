import React, { useEffect, useState } from "react";
import api from "../services/api";
import { ToastNotification } from "../components/UI/ToastNotification";

export default function ReportsPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/reports');
      setReports(data);
    } catch {
      setToast({ type: 'error', message: 'Erro ao carregar relatórios.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Relatórios de Bugs/Fraudes</h2>
      {toast && <ToastNotification type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
      {loading ? <div>Carregando relatórios...</div> : null}
      <ul className="space-y-3">
        {reports.length === 0 && <li>Nenhum relatório encontrado.</li>}
        {reports.map((r: any) => (
          <li key={r.id} className="bg-zinc-900 rounded p-4">
            <div className="font-semibold">{r.title}</div>
            <div className="text-xs text-zinc-400">{r.type} | {r.createdAt?.slice(0, 16)}</div>
            <div className="text-sm mt-2">{r.description}</div>
            {r.attachment && <a href={r.attachment} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">Ver Anexo</a>}
          </li>
        ))}
      </ul>
    </div>
  );
} 