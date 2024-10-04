"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
 
export default function HomePage() {
  //Vai vir tudo da API, só para teste
  const router = useRouter();

  //TODO remover na versao final
  useEffect(() => {
    router.push('/doge_client');
  }, [])

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
      <div className="bg-slate-800 shadow-2xl rounded-lg p-6 text-center max-w-4xl w-full">
        <h1 className="text-5xl font-bold text-white mb-4">Doge Store</h1>
        <p className="text-lg text-gray-400 mb-6">
          O melhor serviço para dar vida ao seu negócio! Rápido, confiável e com aquele toque de fofura que só a Doge tem.
        </p>
        <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-6">
          <Image
            src="/icon.png" 
            alt="Doge Delivery"
            layout="fill"
            objectFit="cover"
            className="rounded-full shadow-lg bg-slate-700"
            priority
          />
        </div>

        <div className="text-center text-gray-300 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-2">Contatos</h2>
          <p className="text-lg">Telefone: (74) 9 8815-2367</p>
          <p className="text-lg">Email: doge.store@duckenterprise.org</p>
          <p className="text-lg">Endereço: Centro, 20, Juazeiro - BA</p>
        </div>

        <Link 
          href={'https://wa.me/5574988152367'}
          className="mt-12 px-8 py-3 bg-yellow-600 text-white rounded-lg text-lg shadow-lg hover:bg-yellow-500 "
          target="_blank"
          rel="noopener noreferrer"
        >
          Converse Agora com a Doge!
        </Link>
      </div>
    </div>
  );
}
