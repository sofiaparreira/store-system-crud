import React, { useState } from "react";
import axios from 'axios'; // Não esqueça de importar axios
import InputDefault from "./InputDefault";

const FormTemplate = ({ fetchProducts }) => { // Adicione fetchProducts como prop
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0.0);
    const [quantity, setQuantity] = useState(0);
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newProduct = { name, price: parseFloat(price), quantity, description }; 

        try {
            await axios.post('http://localhost:3000/add', newProduct); 
            fetchProducts(); 
            setName('');
            setPrice(0.0);
            setQuantity(0);
            setDescription('');
        } catch (error) {
            console.log('Erro ao adicionar produto no front', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mx-96 py-16">
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-lg font-semibold text-gray-900">ADD NEW PRODUCT</h2>
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
                                onChange={(e) => setPrice(e.target.value)} // Corrigido para setPrice
                            />
                            <InputDefault
                                text={"Quantity"}
                                type={"number"}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
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
                                    className="block w-full rounded-md border-0 py-1 px-2 text-gray-700 outline-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={""}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-span-full mt-8">
                        <label
                            htmlFor="cover-photo"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Cover photo
                        </label>
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                    <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                    >
                                        <span>Upload a file</span>
                                        <input
                                            id="file-upload"
                                            name="file-upload"
                                            type="file"
                                            className="sr-only"
                                        />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs leading-5 text-gray-600">
                                    PNG, JPG, GIF up to 10MB
                                </p>
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
