'use client';
import { Toaster } from "@/components/ui/toaster";
import HeaderPublicPage, { IPropsHeaderPublic } from "../headerPublicPage";
import { IProduct } from "@/app/doge_client/services/user.service";
import { useEffect, useState } from "react";
import { formatPrice } from "@/app/util/formt-price";
import { Button } from "@/components/ui/button";

interface IProductStore extends IProduct {
    quantity: number,
    total: number
}

export default function CartPage({ name }: IPropsHeaderPublic) {
    const [products, setProducts] = useState<IProductStore[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [installments, setInstallments] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const store = name;

    useEffect(() => {
        const cart = sessionStorage.getItem("cart");

        if (cart) {
            const cardStoreList = JSON.parse(cart) as IProductStore[];

            const cardList = cardStoreList.map((item) => {
                const quantity = item.quantity ?? 1;
                const total = quantity * item.price;

                return {
                    ...item,
                    quantity: 1,
                    total: total
                }
            })

            setProducts(cardList);
            calculateTotalCart(cardList);
            setLoading(false);
        }
    }, []);

    const handleQuantityChange = (productId: string, value: number) => {
        const cartList = products.map((item) => {
            if (item.id === productId) {
                item.quantity = value;
                item.total = item.price * value;
            }

            return {
                ...item,
            }
        });

        setProducts(cartList);
        calculateTotalCart(cartList);
    };

    const calculateTotalCart = (productList: IProductStore[]) => {
        setTotal(productList.reduce((accumulator, item) => { return accumulator + item.total }, 0))
    }

    const handleRemoveProduct = (productId: string) => {
        const updatedProducts = products.filter(product => product.id !== productId);
        setProducts(updatedProducts);
        sessionStorage.setItem("cart", JSON.stringify(updatedProducts));
    };

    return (
        <>
            <Toaster />
            <HeaderPublicPage name={"DuckEnterprise"} cartItemCount={products.length} />
            <div className="flex flex-col gap-12 max-w-lg mx-auto px-4 pb-10">
                <div>
                    <div className="flex flex-col mt-28 text-xl bg-white p-3 rounded shadow">
                        <h1>Simulação de Pagamentos</h1>
                    </div>
                    {
                        loading ?
                            <div className="text-center mt-4">
                                <span className="font-bold text-base">
                                    Carregando
                                </span>
                            </div> : <div>
                                <div className="pt-3">
                                    {products.length > 0 ? (
                                        products.map((product) => (
                                            <div key={product.id} className="p-4 bg-white shadow rounded mb-4 flex gap-2">
                                                <div className="flex gap-2 justify-between">
                                                    <div>
                                                        <img src={product.image_url} alt={product.name} className="w-20 h-20 object-cover border-4 rounded shadow" />
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <h2 className="text-lg font-bold">{product.name}</h2>
                                                        <p>Preço: {formatPrice(product.price)}</p>
                                                        <p>
                                                            Quantidade:
                                                            <input
                                                                type="number"
                                                                value={product.quantity}
                                                                onChange={(e) => handleQuantityChange(product.id, Math.max(Number(e.target.value), 0))}
                                                                min={1}
                                                                className="ml-2 border rounded w-16 p-1"
                                                            />
                                                        </p>

                                                        <p>Total: {formatPrice(product.total)}</p>

                                                    </div>
                                                </div>

                                                <div className="flex justify-end">
                                                    <Button variant={'destructive'} onClick={() => handleRemoveProduct(product.id)}
                                                        className="w-10 font-bold">
                                                        <span className="material-symbols-outlined">
                                                            delete
                                                        </span>
                                                    </Button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-center">Nenhum produto no carrinho</p>
                                    )}
                                </div>

                                {
                                    products.length ? <div className="flex justify-between mt-4 p-4 bg-white shadow rounded">
                                        <div className="flex flex-col items-end">
                                            <span className="text-lg font-bold">Total Geral: {total > 0 ? formatPrice(total) : "R$ 0,00"}</span>
                                            <span className="text-lg font-bold">Parcelado: {installments > 0 ? formatPrice((total / installments)) : "R$ 0,00"}</span>
                                        </div>

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

                                    </div> : undefined
                                }
                            </div>
                    }
                </div>
            </div>
        </>
    );
}
