import React, { useState } from "react";
import { useWallet } from "../hooks/useWallet";
import { ToastNotification } from "../components/UI/ToastNotification";
import { criarCobrancaPix } from "../hooks/usePix";

const Wallet: React.FC = () => {
  const { wallet, loading, refresh } = useWallet();
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [amount, setAmount] = useState(0);
  const [pixQr, setPixQr] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleDeposit = async () => {
    if (amount <= 0) return;
    const pix = await criarCobrancaPix(amount, `Depósito Wallet`);
    setPixQr(pix.qrCodeImage);
    setToast({ type: 'success', message: 'Depósito Pix gerado!' });
  };

  const handleWithdraw = async () => {
    if (amount <= 0) return;
    // Chamar API real de saque
    setToast({ type: 'success', message: 'Solicitação de saque enviada!' });
    setShowWithdraw(false);
    setAmount(0);
    await refresh();
  };

  if (loading) return <div className="p-4">Carregando wallet...</div>;
  if (!wallet) return <div className="p-4 text-red-500">Erro ao carregar wallet.</div>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Minha Wallet</h1>
      {toast && <ToastNotification type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
      <div className="bg-zinc-800 rounded-lg p-6 mb-6 flex flex-col items-center">
        <span className="text-zinc-400">Saldo disponível</span>
        <span className="text-3xl font-bold text-green-400">R$ {wallet.balance?.toFixed(2) ?? '0.00'}</span>
        <div className="flex gap-4 mt-4">
          <button className="bg-green-700 px-4 py-2 rounded text-white" onClick={() => setShowDeposit(true)}>Depositar</button>
          <button className="bg-blue-700 px-4 py-2 rounded text-white" onClick={() => setShowWithdraw(true)}>Sacar</button>
        </div>
      </div>
      {/* Modal de depósito */}
      {showDeposit && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-zinc-900 p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-2">Depositar via Pix</h2>
            <input type="number" min={1} value={amount} onChange={e => setAmount(Number(e.target.value))} className="w-full p-2 rounded bg-zinc-800 text-white mb-2" placeholder="Valor (R$)" />
            <button className="bg-green-700 px-4 py-2 rounded text-white w-full" onClick={handleDeposit}>Gerar QR Code Pix</button>
            {pixQr && <img src={pixQr} alt="QR Code Pix" className="mx-auto mt-4" />}
            <button className="mt-4 text-zinc-400 underline w-full" onClick={() => { setShowDeposit(false); setPixQr(null); setAmount(0); }}>Fechar</button>
          </div>
        </div>
      )}
      {/* Modal de saque */}
      {showWithdraw && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-zinc-900 p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-2">Solicitar Saque</h2>
            <input type="number" min={1} value={amount} onChange={e => setAmount(Number(e.target.value))} className="w-full p-2 rounded bg-zinc-800 text-white mb-2" placeholder="Valor (R$)" />
            <button className="bg-blue-700 px-4 py-2 rounded text-white w-full" onClick={handleWithdraw}>Solicitar Saque</button>
            <button className="mt-4 text-zinc-400 underline w-full" onClick={() => { setShowWithdraw(false); setAmount(0); }}>Fechar</button>
          </div>
        </div>
      )}
      <h2 className="text-xl font-semibold mb-2">Histórico</h2>
      <ul className="space-y-2">
        {wallet.transactions?.length === 0 && <li>Nenhuma transação encontrada.</li>}
        {wallet.transactions?.map((h: any) => (
          <li key={h.id} className="bg-zinc-800 rounded p-3 flex justify-between items-center">
            <span>{h.type}</span>
            <span className={h.amount > 0 ? "text-green-400" : "text-red-400"}>{h.amount > 0 ? "+" : ""}R$ {h.amount}</span>
            <span className="text-xs text-zinc-400">{h.createdAt?.slice(0, 10)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wallet; 