import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {

    return (
        <nav className='bg-white flex justify-between py-4 px-8'>
            <h1 className='text-lg font-bold'>STORE SYSTEM</h1>
            <ul className='flex gap-8'>
                <li className='text-gray-500 font-medium hover:text-black transition-all duration-300'><Link to='/'>HOME</Link></li>
                <li className='text-gray-500 font-medium hover:text-black transition-all duration-300'><Link to='/add'>ADD PRODUCT</Link></li>
            </ul>
            <img src="" alt="" />
        </nav>
    )
}
export default Navbar