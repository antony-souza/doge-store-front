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

const QrCodePage = () => {
    const [text, setText] = useState('');
    const [qrCodeResponse, setQrCodeResponse] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const service = new UserService();
            const response = await service.generateQrCode(text);
            if (response) {
                setQrCodeResponse(response.qrCodeData);
                toast({
                    title: "QR Code gerado com sucesso",
                    description: "QR Code foi gerado e está pronto para uso.",
                });
            } else {
                throw new Error("Resposta inválida da API.");
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "Erro ao gerar QR Code",
                description: "Não foi possível gerar o QR Code.",
                variant: "destructive",
            });
        } finally {
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
                <div className="flex items-center justify-between">
                    <TitlePage name={'QR Code'} />
                    <span className="material-symbols-outlined">qr_code_2_add</span>
                </div>
                <form onSubmit={handleSubmit} className="pt-5">
                    <div className="flex flex-col mb-4 gap-2">
                        <label htmlFor="text">Texto ou URL</label>
                        <input
                            type="text"
                            name="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <Button disabled={isLoading}>
                        {isLoading ? "Gerando..." : "Gerar QR Code"}
                        <span className="material-symbols-outlined">qr_code_scanner</span>
                    </Button>
                </form>
                {qrCodeResponse && (
                    <div className="mt-4">
                        <h3>QR Code Gerado:</h3>
                        <Image
                            src={qrCodeResponse}
                            alt="QR Code"
                            width={300}
                            height={300}
                            className="mt-5"
                        />
                        <Button onClick={handleDownload} className="mt-5">
                            Baixar QR Code
                            <span className="material-symbols-outlined">download</span>
                        </Button>
                    </div>
                )}
                <Toaster />
            </LayoutPage>
        </LayoutDashboard>
    );
};

export default withAuth(QrCodePage);
