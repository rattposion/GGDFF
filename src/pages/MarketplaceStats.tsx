import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function MarketplaceStatsPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get('/stats/marketplace')
      .then(res => setStats(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Estatísticas do Marketplace</h2>
      {loading ? <div>Carregando estatísticas...</div> : null}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-zinc-900 rounded p-4 text-center">
            <div className="text-xs text-zinc-400">Usuários</div>
            <div className="text-2xl font-bold text-blue-400">{stats.users}</div>
          </div>
          <div className="bg-zinc-900 rounded p-4 text-center">
            <div className="text-xs text-zinc-400">Produtos</div>
            <div className="text-2xl font-bold text-green-400">{stats.products}</div>
          </div>
          <div className="bg-zinc-900 rounded p-4 text-center">
            <div className="text-xs text-zinc-400">Pedidos</div>
            <div className="text-2xl font-bold text-yellow-400">{stats.orders}</div>
          </div>
          <div className="bg-zinc-900 rounded p-4 text-center">
            <div className="text-xs text-zinc-400">Faturamento</div>
            <div className="text-2xl font-bold text-pink-400">R$ {stats.revenue?.toFixed(2)}</div>
          </div>
        </div>
      )}
      {/* Gráficos detalhados podem ser adicionados aqui */}
    </div>
  );
} 