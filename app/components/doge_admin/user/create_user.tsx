import React, { useState } from 'react';

export default function CreateUser() {
    const [successMessage, setSuccessMessage] = useState('');
    const [failMessage, setFailMessage] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const doge_admin_user = {
            name,
            email,
            password,
            role
        };

        const token = localStorage.getItem('token');
        if (!token) {
            setFailMessage('Você precisa estar logado para criar uma loja.');
            setTimeout(() => setFailMessage(''), 10000);
            return;
        }

        try {
            const response = await fetch("http://localhost:4200/user/create", {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(doge_admin_user)
            });

            if (!response.ok) {
                const errorMessage = response.status === 409 ? await response.text() : 'Erro de rede';
                setFailMessage(errorMessage || 'Erro ao criar a loja!');
                setTimeout(() => setFailMessage(''), 10000);
                return;
            }

            const data = await response.json();
            console.log('Success:', data);

            setName('');
            setEmail('');
            setPassword('');
            setRole('');

            setSuccessMessage('Loja criada com sucesso!');
            setTimeout(() => setSuccessMessage(''), 10000);
        } catch (error) {
            setFailMessage('Erro ao criar a loja. Por favor, tente novamente.');
            setTimeout(() => setFailMessage(''), 10000);
            console.error('Erro de rede:', error);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
            <div className='flex items-center gap-2 mb-3'>
                <span className="material-symbols-outlined text-3xl font-semibold text-gray-100">
                    group_add
                </span>
                <h2 className="text-3xl font-semibold text-gray-100">Novo Usuário</h2>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <label className="block text-gray-300 font-medium mb-2">Nome</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 bg-gray-800 text-gray-100 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-300 font-medium mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 bg-gray-800 text-gray-100 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-300 font-medium mb-2">Senha</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 bg-gray-800 text-gray-100 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-300 font-medium mb-2">Função</label>
                    <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full p-3 bg-gray-800 text-gray-100 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="col-span-2">
                    <button
                        type="submit"
                        className="w-full bg-blue-700 text-gray-100 py-3 rounded-lg shadow hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Criar Usuário
                    </button>
                </div>
            </form>
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
