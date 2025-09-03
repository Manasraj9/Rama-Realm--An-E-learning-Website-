import React from 'react';
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-black text-[#d6ddeb] pt-5 pb-1">
      <div className=" px-4">
        <div className="flex justify-between pb-2">
          <div>
             <Image src="/images/Logo1.svg" alt="Logo" width={100} height={50} /> 
          </div>
          {/* About Section */}
          <div>
            <h3 className="flex-col text-lg font-semibold hover:text-white">Courses</h3>
            <ul className="mt-4 space-y-2 hover:text-white flex flex-col">
              <li>Virtual Classroom Courses</li>
              <li>VR Courses</li>
              <li>AR Courses</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h3 className="flex-col text-lg font-semibold hover:text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2 hover:text-white flex flex-col">
              <li>Home</li>
              <li>Courses</li>
              <li>Programs</li>
              <li>Testimonial</li>
              <li>Blog</li>
            </ul>
          </div>

          {/* Resources Section */}
          <div className='mr-10'>
            <h3 className="text-lg font-semibold hover:text-white">More</h3>
            <ul className="mt-4 space-y-2 hover:text-white flex flex-col">
              <li>Terms</li>
              <li>Privacy</li>
              <li>Help</li>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 pt-1">
          <p className="text-center text-gray-400">
            2024 © Rama Realm. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;