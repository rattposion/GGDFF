import React from "react";

const Support: React.FC = () => {
  // Mock de tickets
  const tickets = [
    { id: 1, subject: "Problema com entrega automática", status: "Aberto", opened: "2024-06-01" },
    { id: 2, subject: "Dúvida sobre Pix", status: "Resolvido", opened: "2024-05-28" },
  ];

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Suporte</h1>
      <button className="mb-4 bg-blue-700 px-4 py-2 rounded text-white">Abrir novo ticket</button>
      <div className="space-y-3">
        {tickets.map((t) => (
          <div key={t.id} className="bg-zinc-800 rounded p-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
            <div className="font-semibold">{t.subject}</div>
            <div className="text-sm text-zinc-400">Aberto em: {t.opened}</div>
            <div className={`text-xs px-2 py-1 rounded ${t.status === "Resolvido" ? "bg-green-700" : "bg-yellow-700"}`}>{t.status}</div>
            <button className="ml-auto text-blue-400 hover:underline">Ver detalhes</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Support; 