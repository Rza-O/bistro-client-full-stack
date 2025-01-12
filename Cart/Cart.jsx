import React from 'react';
import useCart from '../src/Hooks/useCart';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../src/Hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const Cart = () => {
   const [cart, refetch] = useCart();
   const totalPrice = cart.reduce((accumulator, item) => accumulator + item.price, 0);
   const axiosSecure = useAxiosSecure();

   const handleDelete = (id) => {
      Swal.fire({
         title: "Are you sure?",
         text: "You won't be able to revert this!",
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#3085d6",
         cancelButtonColor: "#d33",
         confirmButtonText: "Yes, delete it!"
      }).then((result) => {
         if (result.isConfirmed) {
            axiosSecure.delete(`/carts/${id}`)
               .then(res => {
                  if (res.data.deletedCount > 0) {
                     refetch();
                     Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success",
                     });
                  }
               })
         }
      });
   }

   return (
      <div>
         <div className='flex justify-evenly mb-8'>
            <h2 className='text-3xl'>Total Orders: {cart.length}</h2>
            <h2 className='text-3xl'>Total Price: {totalPrice.toFixed(2)}</h2>
            {cart.length ?
               <Link to='/dashboard/payment'>
                  <button className="btn bg-[#d1a054] text-white">Pay</button>
               </Link>
               :
               <button disabled className="btn bg-[#d1a054] text-white">Pay</button>}
         </div>
         {/* Table */}
         <div className="overflow-x-auto">
            <table className="table">
               {/* head */}
               <thead>
                  <tr>
                     <th>
                        #
                     </th>
                     <th>Image</th>
                     <th>Name</th>
                     <th>Price</th>
                     <th>Action</th>
                  </tr>
               </thead>
               <tbody>
                  {/* row 1 */}
                  {
                     cart.map((item, idx) => <tr key={item._id}>
                        <th>
                           {idx + 1}
                        </th>
                        <td>
                           <div className="flex items-center gap-3">
                              <div className="avatar">
                                 <div className="mask mask-squircle h-12 w-12">
                                    <img
                                       src={item.image}
                                       alt="Avatar Tailwind CSS Component" />
                                 </div>
                              </div>
                           </div>
                        </td>
                        <td>
                           {item.name}
                        </td>
                        <td>${item.price}</td>
                        <th>
                           <button
                              onClick={() => handleDelete(item._id)}
                              className="btn btn-ghost btn-lg "><FaTrash className='text-red-600'></FaTrash></button>
                        </th>
                     </tr>)
                  }
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default Cart;