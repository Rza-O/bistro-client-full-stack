import React from 'react';
import { FaBook, FaCalendar, FaHome, FaList, FaSearch, FaShoppingCart, FaUsers, FaUtensils } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa6';
import { IoBookmarks } from 'react-icons/io5';
import { NavLink, Outlet } from 'react-router-dom';
import useCart from '../Hooks/useCart';
import { MdEmail } from 'react-icons/md';
import { CiForkAndKnife } from 'react-icons/ci';
import useAdmin from '../Hooks/useAdmin';

const Dashboard = () => {
   const [cart] = useCart();
   // TODO: get isAdmin value from database
   const [isAdmin] = useAdmin();
// console.log(isAdmin)
   // const isAdmin = false;
   return (
      <div className='flex'>
         {/* Dashboard Sidebar */}
         <div className="w-64 min-h-svh bg-[#d1a054]">
            <ul className="menu text-black">
               {
                  isAdmin ?
                     <>
                        <li className=''><NavLink to='/dashboard/adminHome'>
                           <FaHome></FaHome>
                           Admin Home
                        </NavLink></li>
                        <li className=''><NavLink to='/dashboard/addItems'>
                           <FaUtensils></FaUtensils>
                           Add Items
                        </NavLink></li>
                        <li className=''><NavLink to='/dashboard/manageItems'>
                           <FaList></FaList>
                           Manage Items
                        </NavLink></li>
                        <li className=''><NavLink to='/dashboard/booking'>
                           <FaBook></FaBook>
                           Manage Bookings
                        </NavLink></li>
                        <li className=''><NavLink to='/dashboard/users'>
                           <FaUsers></FaUsers>
                           All User
                        </NavLink></li>
                     </> :
                     <>
                        <li className=''><NavLink to='/dashboard/userHome'>
                           <FaHome></FaHome>
                           My Home
                        </NavLink></li>
                        <li className=''><NavLink to='/dashboard/paymentHistory'>
                           <FaCalendar></FaCalendar>
                           Payment History
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
                     </>
               }

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