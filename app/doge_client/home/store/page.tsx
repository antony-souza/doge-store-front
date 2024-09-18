import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Dashboard from "../../components/dashbourd";
import HeaderClient from "../../components/header";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

export default function RenderStorePage() {
    return (
        <>
            <HeaderClient />
            {/* Container flex para posicionar a tabela mais para cima */}
            <div className="flex justify-center items-start px-4 py-8 bg-gray-100">
                <div className="w-full max-w-6xl bg-white shadow-2xl border border-gray-200 rounded-lg overflow-x-auto p-6">
                    <div className="flex justify-between">
                        <h1 className="text-2xl font-semibold">{`Loja(s)`}</h1>
                        <Button className="flex gap-2">
                            <span className="material-symbols-outlined">draw</span>
                            Editar Loja
                        </Button>
                    </div>
                    <Table className="min-w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Foto</TableHead>
                                <TableHead className="w-[100px]">Nome</TableHead>
                                <TableHead className="w-[100px]">Status</TableHead>
                                <TableHead className="w-[100px]">Telefone</TableHead>
                                <TableHead className="w-[100px]">Endereço</TableHead>
                                <TableHead className="h-[10px]">Descrição</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">
                                    <Avatar>
                                        <AvatarImage
                                            className="rounded-full w-auto h-12 border-2"
                                            src="https://i.imgur.com/xXTHyOn.png"
                                            alt="Antony Souza" />
                                    </Avatar>
                                </TableCell>
                                <TableCell>Braum</TableCell>
                                <TableCell className="text-green-500">Aberto</TableCell>
                                <TableCell>74988152467</TableCell>
                                <TableCell>Rua da Rua, 101, Bairro Rua, Rua</TableCell>
                                <TableCell>O coração é o músculo mais forte!</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>

            <Dashboard />
        </>
    );
}
