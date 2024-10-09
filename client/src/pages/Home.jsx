import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import Toast from "../components/ToastAlert";
import ModalUpdate from "../components/ModalUpdate";
import DonutChart from "react-donut-chart";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000");
      setProducts(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSelectProduct = (id) => {
    if (selectedProduct.includes(id)) {
      setSelectedProduct(
        selectedProduct.filter((selectedProduct) => selectedProduct !== id)
      );
    } else {
      setSelectedProduct([...selectedProduct, id]);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      await Promise.all(
        selectedProduct.map((id) =>
          axios.delete(`http://localhost:3000/delete/${id}`)
        )
      );
      setProducts(
        products.filter((product) => !selectedProduct.includes(product.id))
      );
      setSelectedProduct([]);

      setToastMessage("Produtos removidos com sucesso!");
      setToastType("success");
    } catch (error) {
      console.error("Erro ao remover produtos:", error);
      setToastMessage("Erro ao remover produtos.");
      setToastType("error");
    }
  };

  const handleEditSelected = (product) => {
    if (product) {
      setCurrentProduct(product);
      setIsModalOpen(true);
    }
  };

  const handleEditProduct = async (updatedProduct) => {
    try {
      await axios.put(
        `http://localhost:3000/update/${updatedProduct.id}`,
        updatedProduct
      );
      const updatedProducts = await axios.get("http://localhost:3000");
      setProducts(updatedProducts.data);
      setIsModalOpen(false);
      setToastMessage("Produto editado com sucesso!");
      setToastType("success");
    } catch (error) {
      console.error("Erro ao editar produto:", error.response || error.message);
      setToastMessage("Erro ao editar produto.");
      setToastType("error");
    }
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Filtrando produtos pela categoria selecionada
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="bg-gray-100 h-screen w-screen">
      <Navbar />

      {toastMessage && <Toast alert={toastMessage} type={toastType} />}

      <div>
        <span className="grid grid-cols-2 gap-32 mx-32">
        <div className="bg-white rounded">

</div>

        </span>
      </div>
      <div className="mx-52">
        <div className="flex justify-between items-center mt-8 gap-16 my-8 border-b border-gray-300">
          <h1 className="py-1 text-gray-800 font-semibold mb-4">
            ALL PRODUCTS
          </h1>

          <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
          >
            <option value="all">Todos</option>
            <option value="automotivo">Automotivo</option>
            <option value="eletronico">Eletrônicos</option>
            <option value="eletrodomestico">Eletrodomesticos</option>
            <option value="livro">Livros</option>
            <option value="outros">Outros</option>
          </select>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={() =>
              handleEditSelected(
                products.find((p) => p.id === selectedProduct[0])
              )
            }
            disabled={selectedProduct.length !== 1}
            className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 duration-300 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="22"
              width="22"
              viewBox="0 0 512 512"
            >
              <path
                className="fill-indigo-600"
                d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"
              />
            </svg>
          </button>

          <button
            onClick={handleDeleteSelected}
            disabled={selectedProduct.length === 0}
            className="p-2  rounded-lg bg-gray-200 hover:bg-gray-300 duration-300 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="22"
              width="22"
              viewBox="0 0 512 512"
            >
              <path
                className="fill-indigo-600"
                d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM184 232l144 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-144 0c-13.3 0-24-10.7-24-24s10.7-24 24-24z"
              />
            </svg>
          </button>
        </div>

        <div className="mt-16 grid grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              link={"/detail"}
              onSelect={() => handleSelectProduct(product.id)}
              isSelected={selectedProduct.includes(product.id)}
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>

      <ModalUpdate
        isOpen={isModalOpen}
        toggleModal={() => setIsModalOpen(false)}
        product={currentProduct}
        onEdit={handleEditProduct}
      />
    </div>
  );
};

export default Home;
