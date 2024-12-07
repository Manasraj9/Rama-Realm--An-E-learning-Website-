import React from 'react'
import { Link } from 'react-router-dom';
import Logo from '../../images/Logo.svg'

const Navbar = () => {
  return (
    <nav className="bg-black py-2">
            <div className="container mx-auto flex justify-between items-center">
                <div className="logo">
                    <img src={Logo} alt="Company Logo" className='max-w-40' />
                </div>
                <div>
                    <ul className='flex gap-3 text-white '>
                    <li>
                            <Link to="/">
                                <button className='bg-[#3f72af] inline-flex items-center gap-0.5 hover:bg-white hover:text-[#3f72af] py-1.5 rounded px-3 text-lg'>Home</button>
                            </Link>
                        </li>
                        <li>
                            <Link to="/About">
                                <button className='bg-[#3f72af] nline-flex items-center gap-0.5 hover:bg-white hover:text-[#3f72af]  py-1.5 rounded px-3 text-lg'>About</button>
                            </Link>
                        </li>
                        <li>
                            <Link to="/Login">
                                <button className='bg-[#3f72af] inline-flex items-center gap-0.5 hover:bg-white hover:text-[#3f72af]  py-1.5 rounded px-3 text-lg'>Login</button>
                            </Link>
                        </li>
                        <li>
                            <Link to="/Register">
                                <button className='bg-[#3f72af] inline-flex items-center gap-0.5 hover:bg-white hover:text-[#3f72af]  py-1.5 rounded px-3 mr-5 text-lg'>Register</button>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
  )
}

export default Navbar
