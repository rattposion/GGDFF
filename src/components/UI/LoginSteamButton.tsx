import { FaSteam } from 'react-icons/fa';

export function LoginSteamButton() {
  return (
    <a href={`${import.meta.env.VITE_API_URL.replace('/api', '')}/api/auth/steam`} className="block w-full">
      <button
        className="flex items-center justify-center gap-2 w-full bg-[#171A21] text-white font-semibold py-2 rounded-lg shadow-md hover:bg-[#1b2838] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#66c0f4] focus:ring-offset-2"
        type="button"
      >
        <FaSteam size={22} className="text-[#66c0f4]" />
        Entrar com Steam
      </button>
    </a>
  );
} 