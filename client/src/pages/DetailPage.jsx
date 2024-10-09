import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import { useParams } from "react-router-dom";

const DetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/produtos/${id}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar os detalhes do produto');
        }
        const data = await response.json(); 
        setProduct(data);
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchProductDetails(); 
  }, [id]); 

  if (loading) {
    return <div>Carregando...</div>; 
  }

  if (error) {
    return <div>Erro: {error}</div>; 
  }

  if (!product) {
    return <div>Produto não encontrado.</div>; 
  }

  return (
    <div className="bg-gray-100 w-screen h-screen">
      <Navbar />
      <div className="flex items-center justify-center mt-32 text-black">
      <section class="py-8 bg-white md:py-16  antialiased px-16 rounded-md">
    <div class="max-w-screen-xl px-4 mx-auto 2xl:px-0">
      <div class="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
        <div class="shrink-0 max-w-md lg:max-w-lg mx-auto">
          <img class="w-full" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg" alt="" />
        </div>

        <div class="mt-6 sm:mt-8 lg:mt-0">
          <h1
            class="text-xl first-letter:uppercase font-semibold text-gray-900 sm:text-2xl"
          >
            {product.name}
          </h1>
          <p className="text-sm text-gray-500 first-letter:uppercase mt-1 mb-8">{product.category}</p>
          <div class="mt-4 sm:items-center sm:gap-4 sm:flex">
            <p
              class="text-2xl font-extrabold text-indigo-600 sm:text-3xl"
            >
             R$ {product.price}
            </p>

            <div class="flex items-center gap-2 mt-2 sm:mt-0">
            
              <a
                href="#"
                class="text-sm font-medium leading-none text-gray-900 underline hover:no-underline"
              >
                Estoque: {product.quantity}
              </a>
            </div>
          </div>

          <div class="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
            

            
          </div>

          <hr class="my-6 md:my-8 border-gray-200 " />

          <p class="mb-6 text-gray-500 first-letter:uppercase  ">
            {product.description}
          </p>

       
        </div>
      </div>
    </div>
  </section>
      </div>
    </div>
  );
};

export default DetailPage;
