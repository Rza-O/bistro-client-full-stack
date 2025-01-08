import React from 'react';
import { FaCalendar, FaHome, FaSearch, FaShoppingCart } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa6';
import { IoBookmarks } from 'react-icons/io5';
import { NavLink, Outlet } from 'react-router-dom';
import useCart from '../Hooks/useCart';
import { MdEmail } from 'react-icons/md';

const Dashboard = () => {
   const [cart] = useCart();
   // TODO: get isAdmin value from databaseJ
   const isAdmin = true;
   return (
      <div className='flex'>
         {/* Dashboard Sidebar */}
         <div className="w-64 min-h-svh bg-[#d1a054]">
            <ul className="menu text-black">
               <li className=''><NavLink to='/dashboard/userHome'>
                  <FaHome></FaHome>
                  My Home
               </NavLink></li>
               <li className=''><NavLink to='/dashboard/reservation'>
                  <FaCalendar></FaCalendar>
                  Reservation
               </NavLink></li>
               <li className=''><NavLink to='/dashboard/cart'>
                  <FaShoppingCart></FaShoppingCart>
                  My Cart ({cart.length})
               </NavLink></li>
               <li className=''><NavLink to='/dashboard/review'>
                  <FaStar></FaStar>
                  Add Reviews
               </NavLink></li>
               <li className=''><NavLink to='/dashboard/bookings'>
                  <IoBookmarks></IoBookmarks>
                  My Bookings
               </NavLink></li>
               {/* shared dashboard */}
               <div className="divider divider-neutral"></div>
               <li className=''><NavLink to='/'>
                  <FaHome></FaHome>
                  Home
               </NavLink></li>
               <li className=''><NavLink to='/menu'>
                  <FaSearch></FaSearch>
                  Menu
               </NavLink></li>
               <li className=''><NavLink to='/order/contact'>
                  <MdEmail></MdEmail>
                  Contact
               </NavLink></li>
            </ul>
         </div>
         {/* Dashboard Content */}
         <div className='flex-1 p-8'>
            <Outlet></Outlet>
         </div>
      </div>
   );
};

export default Dashboard;