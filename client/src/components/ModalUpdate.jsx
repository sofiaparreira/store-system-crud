import React, { useState, useEffect } from "react";

const ModalUpdate = ({ isOpen, toggleModal, product, onEdit }) => {
  const [formData, setFormData] = useState({ name: "", price: 0, quantity: 0, description: "" });

  useEffect(() => {
    if (product) {
      setFormData({ name: product.name, price: product.price, quantity: product.quantity, description: product.description });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit({ ...product, ...formData });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={toggleModal}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg p-6 w-1/2 shadow-lg px-8 py-8"
      >
        <h2 className="text-lg font-semibold mb-4">Editar Produto</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name" className="block mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded w-full p-2 mb-4"
            required
          />
          <div className="grid grid-cols-2 gap-16">
              <span>
                <label htmlFor="price" className="block mb-2">
                  Price:
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full p-2 mb-4"
                  required
                />
              </span>
              <span>
                <label htmlFor="price" className="block mb-2">
                  Quantity:
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full p-2 mb-4"
                  required
                />
              </span>
          </div>
            <label htmlFor="price" className="block mb-2">
                  Description:
            </label>

            <textarea 
                className="border border-gray-300 rounded w-full p-2 mb-4 h-32"
                name="description" 
                id="description"
                value={formData.description}
                onChange={handleChange}
                />
                  
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-16 py-1.5 bg-indigo-500 text-white rounded-md hover:bg-indigo-700 mt-8"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalUpdate;
