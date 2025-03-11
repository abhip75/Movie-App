"use client"; 
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation"; 
import { AiOutlineMenu, AiFillFire, AiFillStar } from "react-icons/ai";
import { MdUpcoming } from "react-icons/md";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); 

  return (
    <div>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-3 bg-gray-800 text-white fixed top-2 left-2 rounded-lg z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <AiOutlineMenu size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white p-5 w-60 transition-all duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative`}
      >
        <h2 className="text-xl font-bold mb-5 mt-4">MovieApp</h2>
        <ul className="space-y-4">
          <li className={`flex items-center space-x-3 p-2 rounded-lg ${pathname === "/" ? "bg-gray-700" : ""}`}>
            <AiFillFire className="text-red-500" size={22} />
            <Link href="/">Popular</Link>
          </li>

          <li className={`flex items-center space-x-3 p-2 rounded-lg ${pathname === "/top-rated" ? "bg-gray-700" : ""}`}>
            <AiFillStar className="text-yellow-400" size={22} />
            <Link href="/top-rated">Top Rated</Link>
          </li>

          <li className={`flex items-center space-x-3 p-2 rounded-lg ${pathname === "/upcoming" ? "bg-gray-700" : ""}`}>
            <MdUpcoming className="text-green-400" size={22} />
            <Link href="/upcoming">Upcoming</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;