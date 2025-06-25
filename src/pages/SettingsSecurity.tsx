import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import api from "../services/api";
import { ToastNotification } from "../components/UI/ToastNotification";

export default function SettingsSecurityPage() {
  const { user, refresh } = useAuth();
  const [password, setPassword] = useState('');
  const [twoFA, setTwoFA] = useState(user?.twoFAEnabled || false);
  const [qrcode, setQrcode] = useState<string | null>(null);
  const [code, setCode] = useState('');
  const [toast, setToast] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePassword = async () => {
    setLoading(true);
    try {
      await api.put('/user/password', { password });
      setToast({ type: 'success', message: 'Senha alterada!' });
      setPassword('');
    } catch {
      setToast({ type: 'error', message: 'Erro ao alterar senha.' });
    } finally {
      setLoading(false);
    }
  };

  const handle2FA = async () => {
    setLoading(true);
    try {
      if (!twoFA) {
        // Ativar 2FA: obter QRCode
        const { data } = await api.post('/user/2fa/setup');
        setQrcode(data.qrcode);
      } else {
        // Desativar 2FA
        await api.post('/user/2fa/disable');
        setToast({ type: 'success', message: '2FA desativado!' });
        setTwoFA(false);
        setQrcode(null);
        await refresh();
      }
    } catch {
      setToast({ type: 'error', message: 'Erro ao configurar 2FA.' });
    } finally {
      setLoading(false);
    }
  };

  const handleValidate2FA = async () => {
    setLoading(true);
    try {
      await api.post('/user/2fa/validate', { code });
      setToast({ type: 'success', message: '2FA ativado!' });
      setTwoFA(true);
      setQrcode(null);
      setCode('');
      await refresh();
    } catch {
      setToast({ type: 'error', message: 'Código inválido.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Configurações de Segurança</h2>
      {toast && <ToastNotification type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Alterar Senha</h3>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Nova senha" className="w-full p-2 rounded bg-zinc-800 text-white mb-2" />
        <button className="bg-blue-700 px-4 py-2 rounded text-white" onClick={handlePassword} disabled={loading}>Alterar Senha</button>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Autenticação em 2 Fatores (2FA)</h3>
        <div className="flex items-center gap-2 mb-2">
          <span>Status: {twoFA ? 'Ativado' : 'Desativado'}</span>
          <button className="bg-blue-700 px-4 py-1 rounded text-white" onClick={handle2FA} disabled={loading}>{twoFA ? 'Desativar 2FA' : 'Ativar 2FA'}</button>
        </div>
        {qrcode && (
          <div className="mb-2">
            <img src={qrcode} alt="QR Code 2FA" className="mx-auto" />
            <input value={code} onChange={e => setCode(e.target.value)} placeholder="Código do app" className="w-full p-2 rounded bg-zinc-800 text-white mt-2" />
            <button className="bg-green-700 px-4 py-2 rounded text-white mt-2" onClick={handleValidate2FA} disabled={loading}>Validar Código</button>
          </div>
        )}
      </div>
    </div>
  );
} 