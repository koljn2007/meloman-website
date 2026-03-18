'use client';

import Link from "next/link";

export default function Cabinet() {
  const balance = 0;
  const songs = [
    { id: 1, title: 'Грустная про расставание', date: '18.03.2026' },
    { id: 2, title: 'Мотивация на успех', date: '17.03.2026' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-indigo-950 to-gray-950 text-white p-6 md:p-12">
      <h1 className="text-5xl md:text-7xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 text-center">
        Личный кабинет МелоМан
      </h1>

      <div className="max-w-4xl mx-auto bg-gray-900/60 backdrop-blur-md p-8 rounded-3xl border border-cyan-500/20 mb-12">
        <h2 className="text-3xl font-bold mb-6 text-cyan-300">Баланс</h2>
        <p className="text-6xl font-black text-white mb-4">{balance} ₽</p>
        <button className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-4 px-8 rounded-2xl text-xl transition">
          Пополнить баланс
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-purple-300">Твои песни</h2>
        {songs.length === 0 ? (
          <p className="text-xl opacity-70 text-center">
            Пока здесь пусто. Сгенерируй первую песню!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {songs.map((song) => (
              <div key={song.id} className="bg-gray-900/60 backdrop-blur-md p-6 rounded-2xl border border-purple-500/20 hover:border-purple-500/50 transition-all">
                <h3 className="text-2xl font-bold mb-2">{song.title}</h3>
                <p className="text-sm opacity-70 mb-4">Создано: {song.date}</p>
                <div className="flex gap-4">
                  <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition">
                    Слушать
                  </button>
                  <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-xl transition">
                    Скачать
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-12 text-center">
        <Link href="/">
          <button className="text-cyan-400 hover:text-cyan-300 text-xl underline">
            ← На главную
          </button>
        </Link>
      </div>
    </div>
  );
}