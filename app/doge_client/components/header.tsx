"use client"

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import React, { useEffect, useState } from 'react';
import UserService, { IUserLocalStorage } from '../services/user.service';

const HeaderClient: React.FC = () => {
    const [user, setUser] = useState<IUserLocalStorage>();

    useEffect(() => {
        const userService = new UserService();

        const user = userService.getUserStorage();
        
        if(user){
            setUser(user);
        }
    }, [])

    const setProfileUrl = (imageUrl?: string) => {
        if(!imageUrl){
            return "https://i.imgur.com/LGT9cVS.png";
        }

        return imageUrl;
    }

    return (
        <div className="flex justify-center  text-slate-950">
            <header className='w-full h-16  bg-white flex items-center justify-between p-4 rounded-b border border-gray-300 shadow-md'>
                {/* Novo contêiner flexível no canto direito */}
                <div className="flex items-center space-x-3 cursor-pointer">
                    {
                        user ? <span className='text-gray-700 font-medium'>{user.name}</span> : undefined
                    }
                   
                    <Avatar>
                        {
                            user ?  
                                <AvatarImage src={setProfileUrl(user.imageUrl)} alt='Profile User' /> 
                                :  
                                undefined
                        }
                       
                    </Avatar>
                </div>
            </header>
        </div>
    );
};

export default HeaderClient;
