import { Avatar, AvatarImage } from '@/components/ui/avatar';
import React from 'react';

const HeaderClient: React.FC = () => {
    return (
        <div className="flex justify-center  text-slate-950">
            <header className='w-full h-16  bg-white flex items-center justify-between p-4 rounded-b border border-gray-300 shadow-md'>
                {/* Novo contêiner flexível no canto direito */}
                <div className="flex items-center space-x-3 cursor-pointer">
                    <span className='text-gray-700 font-medium'>Antony Souza</span>
                    <Avatar>
                        <AvatarImage src='https://i.imgur.com/LGT9cVS.png' alt='Antony Souza' />
                    </Avatar>
                </div>
            </header>
        </div>
    );
};

export default HeaderClient;
