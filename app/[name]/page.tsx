"use client";
import { useEffect, useState } from "react";
import PublicStoreService, { IPublicPageProps } from "./services/store.public.service";
import { IStore } from "../util/interfaces-global.service";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { formatPrice } from "../util/formt-price";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import { ICategory, IProduct } from "../doge_client/services/user.service";
import HeaderPublicPage from "./headerPublicPage";
import checkHour from "../util/checkHour";
import { Copyright } from "./cop";

export default function PublicPage({ params }: IPublicPageProps) {
  const { name } = params;
  const [stores, setStores] = useState<IStore[]>([]);
  const [category, setCategory] = useState<ICategory[]>([]);
  const [moreInfo, setMoreInfo] = useState<boolean>(false);
  const [isInCart, setIsInCart] = useState<{ [key: string]: boolean }>({});
  const [isCategoryProduct, setIsCategoryProduct] = useState(false);
  const [categoryProducts, setCategoryProducts] = useState<IProduct[]>([]);
  const [arrayCartSessionStorange, setArrayCartSessionStorange] = useState<IProduct[]>([]);
  const [selectCategoryId, setSelectCategoryId] = useState<string>("");

  const handleCategoryProduct = (categoryId: string) => {
    setSelectCategoryId(categoryId);
    setIsCategoryProduct(true);
  }

  const handleCloseCategoryProduct = () => {
    setIsCategoryProduct(false);
  }

  useEffect(() => {
    const productsSavedInCart = sessionStorage.getItem("cart");
    if (productsSavedInCart) {
      const productsFromCart: IProduct[] = JSON.parse(productsSavedInCart);
      setArrayCartSessionStorange(productsFromCart);

      const productsSavedInStorange: { [key: string]: boolean } = {};

      for (const product of productsFromCart) {
        productsSavedInStorange[product.id] = true;
      }
      setIsInCart(productsSavedInStorange);
    }
  }, []);

  useEffect(() => {
    if (name) {
      const fetchPublicStore = async () => {
        try {
          const publicStoreService = new PublicStoreService();
          const response = await publicStoreService.getPublicStore(name);
          setStores(response);
          setCategory(response[0].category);
        } catch (error) {
          toast({
            title: "Erro - Loja não encontrada",
            description: "Erro ao buscar a loja. Verifique o link ou tente novamente mais tarde. Se persistir o erro, entre em contato com o suporte.",
            variant: "destructive",
          });
        }
      };
      fetchPublicStore();
    }
  }, [name]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const service = new PublicStoreService();
        const storeId = sessionStorage.getItem('store_id') as string;
        const response = await service.getAllProductsByCategoryId(selectCategoryId, storeId);
        setCategoryProducts(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, [selectCategoryId, isCategoryProduct]);

  const handleClickAddToCart = (id: string) => {
    const store = stores[0];
    const productId = store.product.find((prod: IProduct) => prod.id === id);

    if (productId) {
      if (isInCart[id]) {
        toast({
          title: "Produto já no carrinho",
          description: `${productId.name} já está no carrinho.`,
          variant: "default",
        });
        return;
      }

      const updatedArrayCartSessionStorange = [...arrayCartSessionStorange, productId];
      setArrayCartSessionStorange(updatedArrayCartSessionStorange);
      setIsInCart((newvState) => ({ ...newvState, [id]: true }));

      sessionStorage.setItem("cart", JSON.stringify(updatedArrayCartSessionStorange));

      toast({
        title: "Produto adicionado",
        description: `${productId.name} foi adicionado ao carrinho.`,
        variant: "default"
      });

      if (!updatedArrayCartSessionStorange) {
        toast({
          title: "Erro - Não foi possível adicionar",
          description: `Erro ao adicionar o produto ao carrinho.`,
          variant: "destructive",
        })

      }
    }
  };

  const renderAddToCartButton = (id: string) => (
    <Button
      onClick={() => handleClickAddToCart(id)}
      className={isInCart[id] ? "bg-green-500 text-white" : ""}
    >
      <span className="material-symbols-outlined">shopping_cart</span>
      {isInCart[id] ? " Adicionado" : " Adicionar ao Carrinho"}
    </Button>
  );

  return (
    <>
      <div className="flex flex-col">
        <Toaster />
        <HeaderPublicPage
          name={stores.length > 0 ? stores[0].name : 'notfound'}
          cartItemCount={arrayCartSessionStorange.length}
        />
        {stores.length > 0 ? (
          stores.map((store) => (
            <div key={store.id} className="relative mb-12 mt-12">
              <section className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex justify-center items-center mb-4">
                  <div
                    className="w-full h-[200px] flex flex-col justify-center items-center rounded-lg overflow-hidden"
                    style={{
                      backgroundImage: `url('${store.banner_url || ''}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  ></div>
                </div>
                <div className="text-center -mt-20 flex flex-col justify-center items-center">
                  <Avatar>
                    <AvatarImage
                      src={store.image_url}
                      alt={store.name}
                      className="rounded-full border-4 border-white w-28 h-28 bg-white"
                    />
                  </Avatar>
                  <h1 className="text-3xl font-bold mt-4 text-gray-800">{store.name}</h1>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center space-x-2 mt-2">
                      <span className="material-symbols-outlined text-slate-600">schedule</span>
                      <p className={checkHour({ open_time: store.open_time, close_time: store.close_time }) ? 'text-green-500' : 'text-red-500'}>
                        {checkHour({ open_time: store.open_time, close_time: store.close_time })
                          ? `Aberto. Fecharemos às ${store.close_time}`
                          : `Fechado. Abriremos às ${store.open_time}`
                        }
                      </p>
                    </div>
                    <Button variant="outline" className="mt-4" onClick={() => setMoreInfo(!moreInfo)}>
                      <span className="material-symbols-outlined">info</span>
                      Mais Informações
                    </Button>
                    {moreInfo && (
                      <div className={`overflow-hidden transition-all duration-500 ease-in-out 
                        opacity-0 max-h-0 ${moreInfo ? 'opacity-100 max-h-[500px]' : ''}`} >
                        <div className="flex flex-col justify-start mt-4 items-start">
                          <div className="flex flex-row flex-wrap items-center gap-2">
                            <span className="material-symbols-outlined">description</span>
                            <p className="font-bold text-gray-800 text-center">Descrição:</p>
                            <p className="text-gray-600">{store.description}</p>
                          </div>
                          <div className="flex flex-row flex-wrap items-center gap-2 mt-2">
                            <span className="material-symbols-outlined">home</span>
                            <p className="font-bold text-gray-800">Endereço:</p>
                            <p className="text-gray-600">{store.address}</p>
                          </div>
                          <div className="flex flex-row flex-wrap items-center gap-2 mt-2">
                            <span className="material-symbols-outlined">call</span>
                            <p className="font-bold text-gray-800">Contato:</p>
                            <p className="text-gray-600">{store.phone}</p>
                          </div>
                          <div className="flex flex-row flex-wrap items-center gap-2 mt-2">
                            <span className="material-symbols-outlined">schedule</span>
                            <p className="font-bold text-gray-800">Horários:</p>
                            <p className="text-gray-600">{store.open_time} ás {store.close_time}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>
              <section className="bg-white border-t-8 border-t-green-500 mt-10 max-w-7xl mx-auto sm:px-6 lg:px-8 p-5 shadow-lg rounded">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-semibold ">Promoções</h1>
                  <span className="material-symbols-outlined  text-green-500">paid</span>
                </div>
                <hr className="my-6 border-gray-300" />
                <div className="overflow-x-auto">
                  <div
                    className="grid grid-flow-col gap-5 p-2 pt-8 px-10"
                    style={{
                      gridAutoColumns: "minmax(250px, 1fr)",
                    }}
                  >
                    {store.product && store.product.length > 0 ? (
                      store.product
                        .filter((product) => product.promotion)
                        .map((product) => (
                          <div
                            key={product.id}
                            className="p-6 rounded shadow shadow-slate-400 flex flex-col justify-between w-full bg-white"
                          >
                            <div className="flex flex-col items-center">
                              <Avatar>
                                <AvatarImage
                                  src={product.image_url}
                                  alt={product.name}
                                  className="rounded-lg w-40 h-40 object-cover"
                                />
                              </Avatar>
                              <h2 className="text-xl font-bold text-center mt-4">
                                {product.name}
                              </h2>
                              <p className="text-lg font-semibold text-center text-green-600 mt-2">
                                {formatPrice(product.price)}
                              </p>
                              <p className="text-gray-600 text-center mt-2">
                                {product.description}
                              </p>
                            </div>
                            <div className="mt-4 flex justify-center flex-col gap-4">
                              {renderAddToCartButton(product.id)}
                            </div>
                          </div>
                        ))
                    ) : (
                      <p className="text-center">Nenhum produto em promoção disponível</p>
                    )}
                  </div>
                </div>
              </section>
              <section>
                {category.length > 0 ? (
                  <section className="bg-white border-t-8 border-t-black mt-10 max-w-7xl mx-auto sm:px-6 lg:px-8 p-5 shadow-lg rounded">
                    <div className="flex items-center justify-between">
                      <h1 className="text-2xl font-semibold ">Categorias</h1>
                      <span className="material-symbols-outlined">category</span>
                    </div>
                    <hr className="my-6 border-gray-300" />
                    {/* Contêiner com overflow para deslizar as categorias */}
                    <div className="overflow-x-auto">
                      <div
                        className="grid grid-flow-col gap-4 p-4"
                        style={{
                          gridAutoColumns: "minmax(250px, 1fr)",
                        }}
                      >
                        {category.map((cat) => (
                          <div onClick={() => { handleCategoryProduct(cat.id) }}
                            key={cat.id}
                            className="bg-white p-4 shadow shadow-slate-400 rounded flex flex-col justify-center items-center cursor-pointer">
                            <Avatar>
                              <AvatarImage
                                src={cat.image_url}
                                alt={cat.name}
                                className="rounded-lg w-24 h-24 object-cover"
                              />
                            </Avatar>
                            <h2 className="font-semibold mt-2">{cat.name}</h2>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                ) : (
                  <div className="flex justify-center items-center h-20">
                    <Skeleton className="h-3 w-20" />
                  </div>
                )}
              </section>
              {isCategoryProduct && (
                <section className="bg-white border-t-8 border-t-black mt-10 max-w-7xl mx-auto sm:px-6 lg:px-8 p-5 shadow-lg rounded">
                  {category.length > 0 ? (
                    category
                      .filter((cat) => cat.id === selectCategoryId)
                      .map((cat) => (
                        <div
                          key={cat.id}
                          className="flex items-center justify-between"
                        >
                          <h1 className="text-2xl font-semibold">{cat.name}</h1>
                          <span
                            className="material-symbols-outlined cursor-pointer"
                            onClick={handleCloseCategoryProduct}
                          >
                            close
                          </span>
                        </div>
                      ))
                  ) : null}
                  <hr className="my-6 border-gray-300" />
                  <div className="overflow-x-auto">
                    <div
                      className="grid grid-flow-col gap-4 p-3 px-2"
                      style={{
                        gridAutoColumns: "minmax(250px, 1fr)",
                      }}
                    >
                      {categoryProducts.length > 0 ? (
                        categoryProducts.map((product) => (
                          <div
                            key={product.id}
                            className="p-6 rounded shadow shadow-slate-400 flex flex-col justify-between w-full bg-white"
                          >
                            <div className="flex flex-col items-center">
                              <Avatar>
                                <AvatarImage
                                  src={product.image_url}
                                  alt={product.name}
                                  className="rounded-lg w-40 h-40 object-cover"
                                />
                              </Avatar>
                              <h2 className="text-xl font-bold text-center mt-4">{product.name}</h2>
                              <p className="text-lg font-semibold text-center text-green-600 mt-2">
                                {formatPrice(product.price)}
                              </p>
                              <p className="text-gray-600 text-center mt-2">{product.description}</p>
                            </div>
                            <div className="mt-4 flex justify-center flex-col gap-4">
                              {renderAddToCartButton(product.id)}
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-start">Nenhum produto disponível para essa categoria</p>
                      )}
                    </div>
                  </div>
                </section>
              )}
              <section className="bg-white border-t-8 border-t-black mt-10 max-w-7xl mx-auto sm:px-6 lg:px-8 p-5 shadow-lg rounded">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-semibold ">Produtos</h1>
                  <span className="material-symbols-outlined">shopping_cart</span>
                </div>
                <hr className="my-6 border-gray-300" />
                <div className="overflow-x-auto">
                  <div
                    className="grid grid-flow-col gap-4 p-3 px-2"
                    style={{
                      gridAutoColumns: "minmax(250px, 1fr)",
                    }}
                  >
                    {store.product && store.product.length > 0 ?
                      (
                        store.product.map((product) => (
                          <div
                            key={product.id}
                            className="p-6 rounded shadow shadow-slate-400 flex flex-col justify-between w-full bg-white"
                          >
                            <div className="flex flex-col items-center">
                              <Avatar>
                                <AvatarImage
                                  src={product.image_url}
                                  alt={product.name}
                                  className="rounded-lg w-40 h-40 object-cover"
                                />
                              </Avatar>
                              <h2 className="text-xl font-bold text-center mt-4">{product.name}</h2>
                              <p className="text-lg font-semibold text-center text-green-600 mt-2">
                                {formatPrice(product.price)}
                              </p>
                              <p className="text-gray-600 text-center mt-2">{product.description}</p>
                            </div>
                            <div className="mt-4 flex justify-center flex-col gap-4">
                              {renderAddToCartButton(product.id)}
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-center">Nenhum produto disponível</p>
                      )}
                  </div>
                </div>
              </section>
              <Copyright />
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center h-60">
            <Skeleton className="h-3 w-20" />
          </div>
        )}
      </div>
    </>
  );
}