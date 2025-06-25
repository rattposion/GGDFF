import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useWallet } from "../hooks/useWallet";

const steps = [
  "Complete seu perfil e configure sua wallet.",
  "Navegue pelas categorias e encontre o produto ideal.",
  "Use o Pix para pagar e receba sua entrega automaticamente.",
  "Avalie vendedores e produtos para ajudar a comunidade.",
  "Em caso de dúvidas, acesse o suporte ou o FAQ."
];

const Onboarding: React.FC = () => {
  const [step, setStep] = useState(0);
  const { user } = useAuth();
  const { wallet } = useWallet();
  const navigate = useNavigate();

  const handleNext = () => {
    if (step < steps.length - 1) setStep(s => s + 1);
    else navigate("/home");
  };

  return (
    <div className="p-4 max-w-2xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Bem-vindo ao Marketplace Gamer!</h1>
      <div className="mb-4">
        <span className="bg-blue-700 text-white px-3 py-1 rounded-full text-xs">Passo {step + 1} de {steps.length}</span>
      </div>
      <div className="mb-4 text-lg">{steps[step]}</div>
      {step === 0 && (
        <div className="mb-4">
          <div className="text-sm text-zinc-400">Perfil: <b>{user?.name || 'Não preenchido'}</b></div>
          <div className="text-sm text-zinc-400">Wallet: <b>R$ {wallet?.balance?.toFixed(2) ?? '0.00'}</b></div>
        </div>
      )}
      <button className="bg-blue-700 px-6 py-2 rounded text-white" onClick={handleNext}>{step < steps.length - 1 ? 'Próximo' : 'Começar'}</button>
    </div>
  );
};

export default Onboarding; 