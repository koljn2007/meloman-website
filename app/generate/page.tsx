'use client';

import { useState } from 'react';

export default function Generate() {
  const [prompt, setPrompt] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('1');

  const plans = [
    { id: '1', name: '1 песня', price: 199, desc: 'Одна уникальная песня' },
    { id: '10', name: '10 песен', price: 1499, desc: 'Пакет 10 генераций (149.9 ₽/песня)' },
    { id: '20', name: '20 песен', price: 1999, desc: 'Пакет 20 генераций (99.95 ₽/песня)' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Генерируем песню по запросу:\n${prompt}\nТариф: ${plans.find(p => p.id === selectedPlan)?.name}`);
    // Здесь потом будет реальный вызов API
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-indigo-950 to-gray-950 text-white p-6 md:p-12 flex flex-col items-center">
      <h1 className="text-5xl md:text-7xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
        Создать песню
      </h1>

      <form onSubmit={handleSubmit} className="w-full max-w-3xl bg-gray-900/60 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-cyan-500/20">
        {/* Поле для промпта */}
        <label className="block text-xl md:text-2xl mb-4 font-medium">
          Напиши историю, настроение или идею песни:
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Пример: грустная песня про расставание под дождём..."
          className="w-full h-40 md:h-56 p-6 bg-gray-800/80 border border-cyan-500/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 resize-none text-lg md:text-xl"
          required
        />

        {/* Выбор тарифа */}
        <div className="mt-10">
          <label className="block text-xl md:text-2xl mb-6 font-medium">
            Выбери тариф:
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <label
                key={plan.id}
                className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                  selectedPlan === plan.id
                    ? 'border-cyan-500 bg-cyan-900/30'
                    : 'border-gray-700 hover:border-cyan-500/50 bg-gray-900/40'
                }`}
              >
                <input
                  type="radio"
                  name="plan"
                  value={plan.id}
                  checked={selectedPlan === plan.id}
                  onChange={() => setSelectedPlan(plan.id)}
                  className="sr-only"
                />
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold mb-2">{plan.name}</div>
                  <div className="text-4xl md:text-5xl font-black text-cyan-400 mb-2">{plan.price} ₽</div>
                  <div className="text-sm md:text-base opacity-80">{plan.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Кнопка сгенерировать */}
        <button
          type="submit"
          className="mt-12 w-full bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 text-white font-bold py-5 px-10 rounded-full text-xl md:text-2xl transition-all transform hover:scale-105 shadow-2xl shadow-cyan-500/40 active:scale-95"
        >
          Сгенерировать песню
        </button>
      </form>

      <p className="mt-12 text-sm md:text-base opacity-60 text-center">
        После генерации песня появится в личном кабинете
      </p>
    </div>
  );
}