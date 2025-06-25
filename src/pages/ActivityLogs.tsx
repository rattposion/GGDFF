import React from "react";

const ActivityLogs: React.FC = () => {
  // Mock de logs
  const logs = [
    { id: 1, action: "Comprou skin AK-47 | Redline", date: "2024-06-01 14:32" },
    { id: 2, action: "Recebeu avaliação positiva", date: "2024-06-01 13:10" },
    { id: 3, action: "Favoritou produto Conta Steam Level 50", date: "2024-05-31 19:22" },
  ];

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Logs de Atividades</h1>
      <ul className="space-y-2">
        {logs.map((log) => (
          <li key={log.id} className="bg-zinc-800 rounded p-3 flex justify-between items-center">
            <span>{log.action}</span>
            <span className="text-xs text-zinc-400">{log.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityLogs; 