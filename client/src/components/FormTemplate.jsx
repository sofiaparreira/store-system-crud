import React, { useState } from "react";
import axios from "axios";
import InputDefault from "./InputDefault";
import { useNavigate } from "react-router-dom";

const FormTemplate = ({ fetchProducts }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0.0);
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = {
      name,
      price: parseFloat(price),
      quantity,
      description,
      category,
    };

    try {
      await axios.post("http://localhost:3000/add", newProduct);
      fetchProducts();

      setName("");
      setPrice(0.0);
      setQuantity(0);
      setDescription("");
      setCategory("");
      navigate("/");
    } catch (error) {
      console.log("Erro ao adicionar produto no front", error);
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-96 py-16">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-lg font-semibold text-gray-900">
            ADD NEW PRODUCT
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Preencha o formulário para adicionar um novo produto a sua loja.
          </p>

          <div className="mt-10">
            <InputDefault
              text={"Product Name"}
              type={"text"}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="flex gap-16">
              <InputDefault
                text={"Price"}
                type={"text"}
                onChange={(e) => setPrice(e.target.value)}
              />
              <InputDefault
                text={"Quantity"}
                type={"number"}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <div className="flex flex-col justify-center">
                <label
                  className="text-gray-700 font-medium text-sm"
                  htmlFor="category"
                >
                  Categoria
                </label>
                <select
                  className="text-gray-700 px-8 ring-gray-300 ring-1 rounded py-1 focus:ring-indigo-600 outline-none mt-2"
                  id="category"
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)} 
                >
                                      <option value="" disabled selected>Selecionar</option>

                  <option value="automotivo">Automotivo</option>
                  <option value="eletronico">Eletrônicos</option>
                  <option value="eletrodomestico">Eletrodomesticos</option>
                  <option value="livro">Livros</option>
                  <option value="outros">Outros</option>
                </select>
              </div>
            </div>

            <div className="mt-2">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-700"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1 px-2 text-gray-700 outline-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={description}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 px-4 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-16 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default FormTemplate;
