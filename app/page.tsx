'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

// Типы для Telegram widget
declare global {
  interface Window {
    onTelegramAuth: (user: TelegramUser) => void;
    Telegram?: unknown;
  }
}

interface TelegramUser {
  id: number;
  first_name: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

export default function Home() {
  const [userName, setUserName] = useState(() => {
    if (typeof window === 'undefined') return '';
    const savedUser = localStorage.getItem('telegramUser');
    if (!savedUser) return '';

    try {
      const user = JSON.parse(savedUser) as TelegramUser;
      return user.first_name || user.username || 'Пользователь';
    } catch {
      return '';
    }
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window === 'undefined') return false;
    return Boolean(localStorage.getItem('telegramUser'));
  });

  const widgetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Определяем глобальную функцию для Telegram callback
    window.onTelegramAuth = (user) => {
      console.log('Telegram user:', user);
      setUserName(user.first_name || user.username || 'Пользователь');
      setIsLoggedIn(true);
      localStorage.setItem('telegramUser', JSON.stringify(user));
    };
  }, []);

  useEffect(() => {
    // Рендерим виджет Telegram только на клиенте и только когда пользователь не авторизован
    if (isLoggedIn || !widgetRef.current) return;

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-telegram-login', 'SiteMelomanMusicBot');
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');
    script.setAttribute('data-request-access', 'write');

    widgetRef.current.innerHTML = '';
    widgetRef.current.appendChild(script);
  }, [isLoggedIn]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    localStorage.removeItem('telegramUser');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-indigo-950 to-gray-950 text-white flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden">
      <h1 className="text-7xl sm:text-8xl md:text-9xl font-black mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 drop-shadow-2xl">
        Мело<span className="text-cyan-300">Ман</span>
      </h1>

      <p className="text-xl sm:text-2xl md:text-3xl mb-10 md:mb-16 text-center max-w-3xl font-light opacity-90">
        Создай свою уникальную песню за минуты
      </p>

      <Link
        href="/generate"
        className="inline-flex items-center justify-center bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 text-white font-bold py-5 px-10 sm:py-6 sm:px-14 rounded-full text-xl sm:text-2xl transition-all transform hover:scale-105 shadow-2xl shadow-cyan-500/40 active:scale-95"
      >
        Начать создавать песню
      </Link>

      {!isLoggedIn && (
        <div className="mt-8 mb-8" ref={widgetRef} />
      )}

      {isLoggedIn && (
        <div className="mt-8 mb-8 text-center">
          <p className="text-xl text-cyan-300 mb-4">
            Привет, {userName}! 👋
          </p>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full transition"
          >
            Выйти
          </button>
        </div>
      )}

      <div className="mt-12 md:mt-16 text-center max-w-2xl px-4">
        <p className="text-lg md:text-xl mb-6 opacity-90">
          Напиши историю, настроение или пару слов — мы сгенерируем текст и музыку
        </p>
        <p className="text-base md:text-lg opacity-70">
          Пока основной функционал в Telegram-боте, здесь — витрина и личный кабинет
        </p>
      </div>

      <div className="mt-12 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl">
        <div className="bg-gray-900/60 backdrop-blur-md p-8 rounded-3xl border border-cyan-500/20 hover:border-cyan-500/50 transition-all hover:shadow-xl hover:shadow-cyan-500/20">
          <h3 className="text-3xl font-bold mb-4 text-cyan-300">1 песня</h3>
          <p className="text-5xl font-black text-white mb-6">199 ₽</p>
          <p className="text-lg mb-8 opacity-90">Одна уникальная песня по твоему запросу</p>
          <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-4 rounded-2xl text-lg transition">
            Купить
          </button>
        </div>

        <div className="bg-gray-900/60 backdrop-blur-md p-8 rounded-3xl border border-blue-500/20 hover:border-blue-500/50 transition-all hover:shadow-xl hover:shadow-blue-500/20">
          <h3 className="text-3xl font-bold mb-4 text-blue-300">10 песен</h3>
          <p className="text-5xl font-black text-white mb-6">1499 ₽</p>
          <p className="text-lg mb-8 opacity-90">Пакет на 10 генераций (149.9 ₽ за песню)</p>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl text-lg transition">
            Купить пакет
          </button>
        </div>

        <div className="bg-gray-900/70 backdrop-blur-md p-8 rounded-3xl border border-purple-500/30 hover:border-purple-500/60 transition-all hover:shadow-2xl hover:shadow-purple-500/30 relative scale-105 md:scale-110">
          <div className="absolute -top-5 right-6 bg-yellow-500 text-black px-5 py-2 rounded-full text-sm font-bold shadow-lg">
            Выгодно!
          </div>
          <h3 className="text-3xl font-bold mb-4 text-purple-300">20 песен</h3>
          <p className="text-5xl font-black text-white mb-6">1999 ₽</p>
          <p className="text-lg mb-8 opacity-90">Пакет на 20 генераций (99.95 ₽ за песню)</p>
          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-2xl text-lg transition">
            Купить пакет
          </button>
        </div>
      </div>

      <p className="mt-12 md:mt-20 text-sm md:text-base opacity-60 text-center">
        МелоМан © 2026 • Скоро авторизация через Telegram и полный функционал
      </p>
    </div>
  );
}