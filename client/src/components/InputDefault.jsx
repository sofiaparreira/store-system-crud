import React from 'react'

const InputDefault = ({text, type, onChange}) => {
  return (
    <div className='w-full my-4'>
        <label className='text-gray-700 font-medium text-sm' htmlFor="">{text}</label>
        <input onChange={onChange} type={type} className='text-gray-700 px-2 ring-gray-300 ring-1 rounded py-1 shadow-sm focus:ring-indigo-600 outline-none w-full mt-2' />
    </div>


  )
}

export default InputDefault
