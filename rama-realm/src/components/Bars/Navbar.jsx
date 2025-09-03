import React from 'react'
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-black py-2">
            <div className="container mx-auto flex justify-between items-center">
                <div className="logo">
                    {/* <img src={Logo} alt="Company Logo" className='max-w-40' /> */}
                    <video
                    src="/videos/Logo.mp4"
                    type="video/mp4"
                    autoPlay
                    loop
                    muted
                    className="max-w-40"
                    onError={(e) => console.error("Video failed to load:", e)}
                />
                </div>
                <div>
                    <ul className='flex gap-3 text-white '>
                    <li>
                            <Link href="/">
                                <button className='bg-[#3f72af] inline-flex items-center gap-0.5 hover:bg-white hover:text-[#3f72af] py-1.5 rounded px-3 text-lg'>Home</button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/About">
                                <button className='bg-[#3f72af] nline-flex items-center gap-0.5 hover:bg-white hover:text-[#3f72af]  py-1.5 rounded px-3 text-lg'>About</button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/Login">
                                <button className='bg-[#3f72af] inline-flex items-center gap-0.5 hover:bg-white hover:text-[#3f72af]  py-1.5 rounded px-3 text-lg'>Login</button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/Register">
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
