import React, { useEffect, useState } from "react";
import api from "../services/api";

const Coupons: React.FC = () => {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    api.get("/coupons")
      .then(res => setCoupons(res.data))
      .catch(() => setError("Erro ao buscar cupons"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-4">Carregando cupons...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Meus Cupons</h1>
      <div className="space-y-3">
        {coupons.length === 0 && <div>Nenhum cupom encontrado.</div>}
        {coupons.map((c) => (
          <div key={c.code} className={`bg-zinc-800 rounded p-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-6 ${!c.valid ? "opacity-50" : ""}`}>
            <div className="font-mono font-bold text-lg">{c.code}</div>
            <div className="text-zinc-300">{c.desc || c.description}</div>
            <div className={`text-xs px-2 py-1 rounded ${c.valid ? "bg-green-700" : "bg-red-700"}`}>{c.valid ? "Válido" : "Expirado"}</div>
            <button className="ml-auto text-blue-400 hover:underline" disabled={!c.valid}>Usar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Coupons; 