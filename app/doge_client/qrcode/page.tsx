"use client";

import { LayoutDashboard } from "@/app/components/layout-dashboard";
import { LayoutPage } from "@/app/components/layout-page";
import { TitlePage } from "@/app/components/title-page";
import { useState } from "react";
import UserService from "../services/user.service";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import withAuth from "@/app/util/withToken";
import Image from "next/image";
import InputsCase from "@/app/components/case-input";
import LayoutForm from "@/app/components/layout-form";

const QrCodePage = () => {
    const [text, setText] = useState('');
    const [qrCodeResponse, setQrCodeResponse] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const service = new UserService();
        const response = await service.generateQrCode(text);
        if (response) {
            setQrCodeResponse(response.qrCodeData);
            toast({
                title: "QR Code gerado com sucesso",
                description: "QR Code foi gerado e está pronto para uso.",
            })
            setIsLoading(false);
        }
    };

    const handleDownload = async () => {
        if (!qrCodeResponse) return;

        try {
            const response = await fetch(qrCodeResponse);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `qr-code-${text}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            toast({
                title: "Erro ao baixar QR Code",
                description: "Não foi possível baixar a imagem.",
                variant: "destructive",
            });
        }
    };

    return (
        <LayoutDashboard dashboardConfig={{ isSidebarOpenProps: false }}>
            <LayoutPage>
                <LayoutForm onSubmit={handleSubmit}>
                    <div className="flex items-center justify-between">
                        <TitlePage name={'QR Code'} />
                        <span className="material-symbols-outlined">qr_code_2_add</span>
                    </div>
                    <div className="flex flex-col gap-9 mt-8">
                        <InputsCase
                            label="Link da sua Loja:"
                            type="name"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />

                        <div className="flex ">
                            <Button disabled={isLoading}>
                                {isLoading ? 'Gerando...' : 'Gerar QR Code'}
                                <span className="material-symbols-outlined">qr_code</span>
                            </Button>
                        </div>
                    </div>
                    <Toaster />
                    {qrCodeResponse && (
                    <div className="mt-4">
                        <h3>QR Code Gerado:</h3>
                        <Image
                            src={qrCodeResponse}
                            alt="QR Code"
                            width={200}
                            height={200}
                            className="mt-5"
                        />
                        <Button onClick={handleDownload} className="mt-5">
                            Baixar QR Code
                            <span className="material-symbols-outlined">download</span>
                        </Button>
                    </div>
                )}
                </LayoutForm>
            </LayoutPage>
        </LayoutDashboard>
    );
};

export default withAuth(QrCodePage);
