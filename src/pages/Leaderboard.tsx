import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function LeaderboardPage() {
  const [ranking, setRanking] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get('/leaderboard')
      .then(res => setRanking(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Ranking de Vendedores</h2>
      {loading ? <div>Carregando ranking...</div> : null}
      <ul className="space-y-2">
        {ranking.length === 0 && <li>Nenhum vendedor encontrado.</li>}
        {ranking.map((u: any, i: number) => (
          <li key={u.id} className={`bg-zinc-900 rounded p-3 flex items-center gap-4 ${i === 0 ? 'border-2 border-yellow-400' : ''}`}>
            <span className="font-bold text-lg w-8 text-center">#{i + 1}</span>
            <img src={u.photo || '/avatar.png'} alt={u.name} className="w-10 h-10 rounded-full" />
            <div className="flex-1">
              <div className="font-semibold">{u.name}</div>
              <div className="text-xs text-zinc-400">Vendas: {u.totalSales} | Reputação: {u.reputation}</div>
            </div>
            {i === 0 && <span className="bg-yellow-700 px-2 py-1 rounded text-white">TOP 1</span>}
          </li>
        ))}
      </ul>
    </div>
  );
} 