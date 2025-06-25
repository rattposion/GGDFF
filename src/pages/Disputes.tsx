import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import api from "../services/api";
import { ToastNotification } from "../components/UI/ToastNotification";
import { useNavigate } from "react-router-dom";

const Disputes: React.FC = () => {
  const { user } = useAuth();
  const [disputes, setDisputes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const navigate = useNavigate();

  const fetchDisputes = async () => {
    setLoading(true);
    try {
      const res = await api.get("/disputes");
      setDisputes(res.data);
      setError(null);
    } catch {
      setError("Erro ao buscar disputas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDisputes();
  }, []);

  const handleOpenDispute = async () => {
    // Chamar API real para abrir disputa (mock)
    setToast({ type: 'success', message: 'Disputa aberta!' });
    await fetchDisputes();
  };

  if (loading) return <div className="p-4">Carregando disputas...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Minhas Disputas</h1>
      {toast && <ToastNotification type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
      <div className="mb-4 flex gap-2">
        <button className="bg-yellow-700 px-4 py-2 rounded text-white" onClick={handleOpenDispute}>Abrir Nova Disputa</button>
        <button className="bg-blue-700 px-4 py-2 rounded text-white" onClick={fetchDisputes}>Atualizar</button>
      </div>
      <div className="space-y-3">
        {disputes.length === 0 && <div>Nenhuma disputa encontrada.</div>}
        {disputes.map((d) => (
          <div key={d.id} className="bg-zinc-800 rounded p-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
            <div className="font-semibold">{d.product?.title || d.product || 'Produto'}</div>
            <div className="text-sm text-zinc-400">Aberta em: {d.createdAt?.slice(0, 10) || d.opened}</div>
            <div className={`text-xs px-2 py-1 rounded ${d.status === "Resolvida" ? "bg-green-700" : "bg-yellow-700"}`}>{d.status}</div>
            <button className="ml-auto text-blue-400 hover:underline" onClick={() => navigate(`/disputas/${d.id}`)}>Ver detalhes</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Disputes; 