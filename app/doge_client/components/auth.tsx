"use client";
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import UserService from "../services/user.service";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const userService = new UserService();

    try {
      await userService.auth(email, password);

      if (!userService.auth) {
        toast({
          title: "Falha na autenticação",
          description: "Não foi possível autenticar o usuário. Se o problema persistir, entre em contato com o suporte.",
          variant: "destructive",
        });
      }

      router.replace('/doge_client/home');
    } catch (error) {
      toast({
        title: "Falha na autenticação",
        description: "Não foi possível autenticar o usuário, email ou senha incorreto. Se o problema persistir, entre em contato com o suporte.",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-slate-950">
              <Image
                src="https://i.imgur.com/fUfBPtY.png"
                alt="store_logo"
                width={300}
                height={300}
                className="object-cover"
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mt-4">Doge Client</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="relative mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                E-mail
              </label>
              <div className="flex items-center mt-1">
                <span className="material-symbols-outlined text-gray-500 absolute left-3">
                  mail
                </span>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 p-2 w-full border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-800>"
                  placeholder="E-mail"
                  required
                />
              </div>
            </div>

            <div className="relative mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                Senha
              </label>
              <div className="flex items-center mt-1">
                <span className="material-symbols-outlined text-gray-500 absolute left-3">
                  lock
                </span>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 p-2 w-full border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-800"
                  placeholder="Senha"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full">Entrar</Button>
            <span
              className="block mt-4 text-center text-sm text-slate-950 hover:text-indigo-400 cursor-pointer">
              Esqueci email / senha
            </span>
          </form>
        </div>
      </div>
      <Toaster />
    </>
  );
}
