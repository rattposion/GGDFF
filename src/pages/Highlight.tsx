import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { ToastNotification } from "../components/UI/ToastNotification";

export default function HighlightPage() {
  const [highlights, setHighlights] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const navigate = useNavigate();

  const fetchHighlights = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/highlights');
      setHighlights(data);
    } catch {
      setToast({ type: 'error', message: 'Erro ao carregar destaques.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHighlights();
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Anúncios em Destaque</h2>
      {toast && <ToastNotification type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
      {loading ? <div>Carregando destaques...</div> : null}
      <ul className="space-y-3">
        {highlights.length === 0 && <li>Nenhum destaque encontrado.</li>}
        {highlights.map((h: any) => (
          <li key={h.id} className="bg-yellow-900 rounded p-4 flex items-center gap-4 cursor-pointer" onClick={() => navigate(`/produto/${h.id}`)}>
            <div className="flex-1">
              <div className="font-semibold">{h.title}</div>
              <div className="text-xs text-yellow-200">{h.category?.name}</div>
            </div>
            <span className="bg-yellow-700 px-2 py-1 rounded text-white">Destaque</span>
          </li>
        ))}
      </ul>
    </div>
  );
} 