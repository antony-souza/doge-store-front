'use client';

import { Toaster } from "@/components/ui/toaster";
import HeaderPublicPage from "../headerPublicPage";
import { IProduct } from "@/app/doge_client/services/user.service";
import { useEffect, useState } from "react";
import { formatPrice } from "@/app/util/formt-price";
import { Button } from "@/components/ui/button";

export default function CartPage() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
    const [total, setTotal] = useState<number>(0);
    const [installments, setInstallments] = useState<number>(0);

    useEffect(() => {
        const cart = sessionStorage.getItem("cart");
        if (cart) {
            setProducts(JSON.parse(cart));
        }
    }, []);

    useEffect(() => {
        let total = 0;

        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            const quantity = quantities[product.id];
            total += product.price * quantity;
        }

        setTotal(total);
    }, [products, quantities]);

    const handleQuantityChange = (productId: string, value: number) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: value,
        }));
    };

    const handleRemoveProduct = (productId: string) => {
        const updatedProducts = products.filter(product => product.id !== productId);
        setProducts(updatedProducts);
        sessionStorage.setItem("cart", JSON.stringify(updatedProducts));
    };

    return (
        <>
            <Toaster />
            <HeaderPublicPage name="" />
            <div className="flex flex-col gap-12 max-w-lg mx-auto px-4 pb-10">
                <div>
                    <div className="flex flex-col items-center mt-28 text-xl bg-white p-3 rounded shadow">
                        <h1>Simulação de Pagamentos</h1>
                    </div>
                    <div className="pt-10">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <div key={product.id} className="p-4 bg-white shadow rounded mb-4 flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <h2 className="text-lg font-bold">{product.name}</h2>
                                        <p>Preço: {formatPrice(product.price)}</p>
                                        <p>
                                            Quantidade:
                                            <input
                                                type="number"
                                                value={quantities[product.id] || 0}
                                                onChange={(e) => handleQuantityChange(product.id, Math.max(Number(e.target.value), 1))}
                                                min={1}
                                                className="ml-2 border rounded w-16 p-1"
                                            />
                                        </p>
                                        <p>Total: {formatPrice((product.price * (quantities[product.id] || 1)))}</p>
                                        <Button variant={'destructive'} onClick={() => handleRemoveProduct(product.id)}
                                            className="w-20 mt-3 font-bold">
                                            Remover
                                        </Button>
                                    </div>
                                    <img src={product.image_url} alt={product.name} className="w-20 h-20 object-cover ml-4 border-4 rounded shadow" />
                                </div>
                            ))
                        ) : (
                            <p className="text-center">Nenhum produto no carrinho</p>
                        )}
                    </div>
                    <div className="flex justify-between mt-4 p-4 bg-white shadow rounded">
                        <div className="flex flex-col">
                            <label className="font-bold">Parcelas:</label>
                            <input
                                type="number"
                                value={installments}
                                onChange={(e) => setInstallments(Math.max(Number(e.target.value)))}
                                min={1}
                                className="border rounded w-24 p-1"
                            />
                        </div>
                        <div className="flex flex-col items-end">
                            <h2 className="text-lg font-bold">Total Geral: {total > 0 ? formatPrice(total) : "R$ 0,00"}</h2>
                            <h2 className="text-lg font-bold">Parcelado: {installments > 0 ? formatPrice((total / installments)) : "R$ 0,00"}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
