"use client"

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import UserService, { IUserLocalStorage } from '../services/user.service';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

const HeaderClient: React.FC = () => {
    const [user, setUser] = useState<IUserLocalStorage>();
    const { push } = useRouter();

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

    const exitSystem = () => {
        const userService = new UserService();
        userService.removeUserStorage();
        push("/doge_client/auth")
    }

    return (
        <div className="flex justify-center  text-slate-950" >
            <header className='w-full h-16  bg-white flex items-center justify-between p-4 rounded-b border border-gray-300 shadow-md'>
                <div>
                    {/*Implementar nome da Loja */}

                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
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
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-56">
                        <DropdownMenuItem className='cursor-pointer' onClick={exitSystem}>
                            <span>Sair</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </header>
        </div>
    );
};

export default HeaderClient;
