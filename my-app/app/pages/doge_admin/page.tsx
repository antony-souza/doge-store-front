"use client";
import Image from 'next/image';
import React, { useState } from 'react';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const response = await fetch('http://localhost:4200/doge_admin', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    const token = localStorage.setItem('token', data.token);
   
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
    </div>
  );
};

export default LoginForm;
