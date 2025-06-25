import React from "react";

const PushNotifications: React.FC = () => {
  // Mock de notificações push
  const notifications = [
    { id: 1, title: "Pagamento aprovado!", body: "Seu pedido #123 foi confirmado." },
    { id: 2, title: "Nova mensagem", body: "Você recebeu uma resposta no chat da compra." },
  ];

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Notificações Push</h1>
      <button className="mb-4 bg-blue-700 px-4 py-2 rounded text-white">Ativar notificações</button>
      <div className="space-y-3">
        {notifications.map((n) => (
          <div key={n.id} className="bg-zinc-800 rounded p-4">
            <div className="font-semibold">{n.title}</div>
            <div className="text-zinc-300">{n.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PushNotifications; 