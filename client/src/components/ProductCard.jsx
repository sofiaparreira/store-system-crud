import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onSelect, isSelected }) => {
  const link = `/detail/${product.id}`; 

  return (
    <div 
      to={link} 
      onClick={onSelect} 
      className={`p-4 border shadow-sm bg-white rounded-2xl border-gray-200 text-gray-700 text-sm ${isSelected ? 'border-2 border-indigo-600' : 'bg-white'}`}>
      
      
      <span className='flex justify-between'>
        <h2 className="font-semibold first-letter:uppercase">{product.name}</h2>
      </span>

     
      <div className='flex justify-between mt-4'>
        <p className='text-indigo-600 text-lg  font-bold'>R$ {product.price}</p>
          
            <Link className='bg-indigo-600 hover:bg-indigo-700 duration-200 py-1 px-2 rounded text-gray-200' to={link}>Details</Link>
      </div>
    </div>
  );
};

export default ProductCard;
