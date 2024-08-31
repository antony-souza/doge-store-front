'use client'

export function MenuOptions() {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white flex justify-around py-4 -tracking-tight">
      <button className="flex flex-col items-center">
        <span className="material-symbols-outlined">home</span>
        <span>Início</span>
      </button>
      <button className="flex flex-col items-center">
        <span className="material-symbols-outlined">price_change</span>
          <span>Promoções</span>
      </button>
        <button className="flex flex-col items-center">
            <span className="material-symbols-outlined">person</span>
            <span>Perfil</span>
        </button>
    </div>
  );
}