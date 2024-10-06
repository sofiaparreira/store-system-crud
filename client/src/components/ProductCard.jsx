import React from 'react';

const ProductCard = ({ product, onSelect, isSelected }) => {
  return (
    <div onClick={onSelect} className={`p-4 border shadow-sm bg-white rounded-2xl border-gray-200 text-gray-700 text-sm ${isSelected ? 'border-2 border-indigo-600' : 'bg-white'}`}>
      <span className='flex justify-between'>
          <h2 className="font-semibold">{product.name}</h2>
          <p className='bg-indigo-600 py-1 px-2 rounded text-gray-200 '>{product.quantity}</p>
      </span>

      <p className='text-gray-500'>{product.description}</p>
     
    <p className='text-gray-800 text-lg mt-4 font-bold'> R$ {product.price}</p>


    </div>
  );
};

export default ProductCard;
2