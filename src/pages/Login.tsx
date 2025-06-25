import { LoginSteamButton } from '../components/UI/LoginSteamButton';
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';

function LoginDiscordButton() {
  return (
    <a href={`${import.meta.env.VITE_API_URL.replace('/api', '')}/api/auth/discord`}>
      <button className="btn-discord bg-[#5865F2] text-white px-4 py-2 rounded-lg w-full mb-2 hover:bg-[#4752C4] transition-colors font-semibold shadow-md">Entrar com Discord</button>
    </a>
  );
}

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { dispatch } = useApp();

  // Captura token da URL após login social
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('token', token);
      // Buscar usuário e atualizar contexto
      api.get('/auth/users/me').then(res => {
        dispatch({ type: 'SET_USER', payload: res.data });
        navigate('/');
      });
    }
  }, [navigate, dispatch]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post('/auth/login', { identifier, password });
      if (data.token) {
        localStorage.setItem('token', data.token);
        // Buscar usuário e atualizar contexto
        const userRes = await api.get('/auth/users/me');
        dispatch({ type: 'SET_USER', payload: userRes.data });
        navigate('/');
      } else {
        setError('Credenciais inválidas.');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[70vh] p-4 bg-dark-950 overflow-hidden">
      {/* Fundo animado */}
      <div className="absolute inset-0 -z-10 animate-gradient bg-gradient-to-br from-[#232946] via-[#16161a] to-[#0f0c29] opacity-80" />
      <div className="w-full max-w-md bg-dark-900 rounded-2xl shadow-2xl p-8 flex flex-col items-center border border-dark-700 backdrop-blur-sm bg-opacity-90">
        <h2 className="text-3xl font-extrabold mb-2 text-white tracking-tight">Login</h2>
        <p className="mb-6 text-center text-zinc-300 text-base">Acesse sua conta, notificações e recursos exclusivos.</p>
        <div className="w-full space-y-3 mb-4">
          <LoginSteamButton />
          <LoginDiscordButton />
        </div>
        <div className="flex items-center w-full my-4">
          <div className="flex-1 h-px bg-zinc-700" />
          <span className="mx-3 text-zinc-400 text-xs font-medium uppercase">ou</span>
          <div className="flex-1 h-px bg-zinc-700" />
        </div>
        <form onSubmit={handleLogin} className="w-full space-y-3">
          <input
            type="text"
            placeholder="Usuário ou e-mail"
            className="w-full px-3 py-2 rounded-lg bg-dark-800 border border-dark-600 text-white focus:ring-2 focus:ring-primary-500 focus:outline-none transition"
            value={identifier}
            onChange={e => setIdentifier(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full px-3 py-2 rounded-lg bg-dark-800 border border-dark-600 text-white focus:ring-2 focus:ring-primary-500 focus:outline-none transition"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg font-semibold shadow-md transition-colors"
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
          {error && <div className="text-red-500 text-sm text-center mt-1">{error}</div>}
        </form>
        <Link to="/register" className="w-full block mt-6 text-primary-400 hover:underline text-center font-medium">Não tem conta? Cadastre-se</Link>
      </div>
    </div>
  );
} 