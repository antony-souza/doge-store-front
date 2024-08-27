'use client'

export function MoreInformation() {
  return (
    <div className="w-full mt-4 p-4 bg-gray-800 text-white">
      <div className="flex items-center mb-2">
        <span className="material-symbols-outlined">location_on</span>
          <p className="text-center max-w-md">Endereço: Rua Exemplo, 123</p>
      </div>
      <div className="flex items-center mb-2">
        <span className="material-symbols-outlined">phone_iphone</span>
        <p className="text-center max-w-md">Telefone: (11) 1234-5678</p>
      </div>
      <div className="flex items-center">
        <span className="material-icons mr-2">schedule</span>
        <p className="text-center max-w-md">Horários: Seg-Sex 10:00 - 22:00, Sáb-Dom 12:00 - 23:00</p>
      </div>
    </div>
  );
}