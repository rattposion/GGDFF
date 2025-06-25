import React, { useState } from 'react';
import api from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post('/auth/register', { username, email, password });
      setSuccess('Cadastro realizado com sucesso! Redirecionando para login...');
      setUsername(''); setEmail(''); setPassword('');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao registrar');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[70vh] p-4 bg-dark-950 overflow-hidden">
      {/* Fundo animado */}
      <div className="absolute inset-0 -z-10 animate-gradient bg-gradient-to-br from-[#232946] via-[#16161a] to-[#0f0c29] opacity-80" />
      <div className="w-full max-w-md bg-dark-900 rounded-2xl shadow-2xl p-8 flex flex-col items-center border border-dark-700 backdrop-blur-sm bg-opacity-90">
        <h2 className="text-3xl font-extrabold mb-2 text-white tracking-tight">Criar Conta</h2>
        <p className="mb-6 text-center text-zinc-300 text-base">Cadastre-se para acessar todos os recursos do marketplace.</p>
        <form onSubmit={handleRegister} className="w-full space-y-3">
          <input
            type="text"
            placeholder="Nome de usuário"
            className="w-full px-3 py-2 rounded-lg bg-dark-800 border border-dark-600 text-white focus:ring-2 focus:ring-primary-500 focus:outline-none transition"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="E-mail"
            className="w-full px-3 py-2 rounded-lg bg-dark-800 border border-dark-600 text-white focus:ring-2 focus:ring-primary-500 focus:outline-none transition"
            value={email}
            onChange={e => setEmail(e.target.value)}
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
            {loading ? 'Cadastrando...' : 'Registrar'}
          </button>
          {error && <div className="text-red-500 text-sm text-center mt-1">{error}</div>}
          {success && <div className="text-green-500 text-sm text-center mt-1">{success}</div>}
        </form>
        <Link to="/login" className="w-full block mt-6 text-primary-400 hover:underline text-center font-medium">Já tem conta? Faça login</Link>
      </div>
    </div>
  );
} 