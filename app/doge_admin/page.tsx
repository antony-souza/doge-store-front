"use client";

import { jwtDecode } from 'jwt-decode';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface DecodedToken {
  id: string;
  name: string;
  role: string;
}

export default function LoginForm() {
  const [successMessage, setSuccessMessage] = useState('');
  const [failMessage, setFailMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:4200/auth/login", {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        setFailMessage('Erro ao fazer login. Verifique suas credenciais.');
        setTimeout(() => setFailMessage(''), 3000);

        return;
      }

      const data = await response.json();

      localStorage.setItem('token', data.token);

      try {
        const decoded: DecodedToken = jwtDecode(data.token);

        if (decoded.role === 'admin') {
          setSuccessMessage('Login bem-sucedido! Redirecionando...');
          setTimeout(() => setFailMessage(''), 3000);
          setTimeout(() => {
            router.push('/doge_admin/home');
          }, 3000); // Redireciona após 3 segundos
        } else {
          setFailMessage('Você não tem permissão para acessar essa página.');
          setTimeout(() => setFailMessage(''), 3000);
        }
      } catch (error) {
        setFailMessage('Erro ao decodificar o token.');
        
        setTimeout(() => setFailMessage(''), 3000);
      }
    } catch (error) {
      setFailMessage('Erro ao conectar com o servidor.');
      setTimeout(() => setFailMessage(''), 3000);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <Image
            src="/icon.png"
            width={600}
            height={600}
            alt="DogeAdmin Icon"
            className="object-cover mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-white">Doge Admin</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              E-mail
            </label>
            <div className="flex items-center mt-1">
              <span className="material-symbols-outlined text-gray-400 absolute left-3">
                mail
              </span>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 p-2 w-full border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="E-mail"
                required
              />
            </div>
          </div>

          <div className="relative mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Senha
            </label>
            <div className="flex items-center mt-1">
              <span className="material-symbols-outlined text-gray-400 absolute left-3">
                lock
              </span>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 p-2 w-full border border-gray-600 rounded-md shadow-sm bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Senha"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Login
          </button>

          <span
            className="block mt-4 text-center text-sm text-indigo-500 hover:text-indigo-400 cursor-pointer">
            Esqueci email / senha
          </span>
        </form>
      </div>
      {successMessage && (
        <div className="fixed top-4 right-4 bg-green-600 text-white py-2 px-4 rounded shadow-lg z-50">
          {successMessage}
        </div>
      )}

      {failMessage && (
        <div className="fixed top-4 right-4 bg-red-600 text-white py-2 px-4 rounded shadow-lg z-50">
          {failMessage}
        </div>
      )}
    </div>
  );
}
