import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function StatsDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get('/stats/dashboard')
      .then(res => setStats(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Painel de Relatórios</h2>
      {loading ? <div>Carregando KPIs...</div> : null}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-zinc-900 rounded p-4 text-center">
            <div className="text-xs text-zinc-400">Vendas</div>
            <div className="text-2xl font-bold text-green-400">{stats.sales}</div>
          </div>
          <div className="bg-zinc-900 rounded p-4 text-center">
            <div className="text-xs text-zinc-400">Compras</div>
            <div className="text-2xl font-bold text-blue-400">{stats.purchases}</div>
          </div>
          <div className="bg-zinc-900 rounded p-4 text-center">
            <div className="text-xs text-zinc-400">Disputas</div>
            <div className="text-2xl font-bold text-yellow-400">{stats.disputes}</div>
          </div>
          <div className="bg-zinc-900 rounded p-4 text-center">
            <div className="text-xs text-zinc-400">Avaliações</div>
            <div className="text-2xl font-bold text-pink-400">{stats.reviews}</div>
          </div>
        </div>
      )}
      {/* Gráficos e relatórios detalhados podem ser adicionados aqui */}
    </div>
  );
} 