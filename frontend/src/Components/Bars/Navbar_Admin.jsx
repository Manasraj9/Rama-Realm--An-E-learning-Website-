import React from 'react'
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

const Navbar_Admin = () => {
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
                            <Link to="/CreateCourse">
                                <button className='bg-[#3f72af] inline-flex items-center gap-0.5 hover:bg-white hover:text-[#3f72af] py-1.5 rounded px-3 text-lg'>Add Course</button>
                            </Link>
                        </li>
                        <li>
                            <Link to="/About">
                                <button className='bg-red-500 inline-flex items-center gap-0.5 hover:bg-white hover:text-red-600  py-1.5 rounded px-4 text-lg mr-8'>Logout</button>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

    export default Navbar_Admin
