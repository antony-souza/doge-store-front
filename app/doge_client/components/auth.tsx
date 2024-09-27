import { useState } from "react";
import { useRouter } from "next/navigation";
import UserService from "../services/user.service";
import Image from "next/image";
import Button from "@/app/components/buttons/btn";

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const userService = new UserService();

    try {
      await userService.auth(email, password);
      
      setErrorMessage('');
      router.push('/doge_client/home');
    } catch (error) {
      console.error(error);
      setSuccessMessage('');
      setErrorMessage('Falha na autenticação');
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-indigo-600">
              <Image
                src="/perfil.jpg"
                alt="store_logo"
                width={300}
                height={300}
                className="object-cover"
              />
            </div>
            <h1 className="text-2xl font-bold text-white mt-4">Doge Client</h1>
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

            <Button type="submit">Entrar</Button>

            {errorMessage && <p className="text-red-500 pt-4 text-center">{errorMessage}</p>}
            {successMessage && <p className="text-green-500 pt-4 text-center">{successMessage}</p>}

            <span
              className="block mt-4 text-center text-sm text-indigo-500 hover:text-indigo-400 cursor-pointer">
              Esqueci email / senha
            </span>
          </form>
        </div>
      </div>
    </>
  );
}
