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

function QrCodePage() {
    const [text, setText] = useState('');
    const [size, setSize] = useState('200x200');
    const [qrCodeResponse, setQrCodeResponse] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const userService = new UserService();
            const response = await userService.generateQrCode(text, size);

            if (response) {
                setQrCodeResponse(response);
                toast({
                    title: "QR Code gerado com sucesso",
                    description: "QR Code gerado com sucesso.",
                });
            } else {
                toast({
                    title: "Erro ao gerar QR Code",
                    description: "Ocorreu um erro ao gerar o QR Code.",
                    variant: "destructive",
                });
            }

            setSize('200x200');
        } catch (error) {

            setQrCodeResponse('');
            toast({
                title: "Erro",
                description: "Ocorreu um erro ao gerar o QR Code.",
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
                {/* Alterações apenas no form e inputs - Deivid*/}
                <form onSubmit={handleSubmit} className="pt-5">
                    <div className="flex flex-col mb-4 gap-2">
                        <label htmlFor="text">Link da sua loja</label>
                        <input
                            type="text"
                            name="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="flex flex-col mb-4 gap-2">
                        <label htmlFor="size">Tamanho do QR Code (ex: 200x200)</label>
                        <input
                            type="text"
                            name="size"
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                            className="p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    {/* mantém */}
                    <Button disabled={isLoading}>
                        {isLoading ? "Gerando..." : "Gerar QR Code"}
                        <span className="material-symbols-outlined">qr_code_scanner</span>
                    </Button>
                    {/* mantém */}
                </form>
                {/* Alterações apenas no form e inputs - Deivid*/}
                {qrCodeResponse && (
                    <div className="mt-4">
                        <h3>QR Code Gerado:</h3>
                        <img src={qrCodeResponse} alt="QR Code" className="mt-5" />
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
}

export default withAuth(QrCodePage);