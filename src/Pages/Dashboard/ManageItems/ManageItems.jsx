import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { useMenu } from '../../../Hooks/useMenu';
import { FaRegEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const ManageItems = () => {
   const [menu, loading, refetch] = useMenu();
   const axiosSecure = useAxiosSecure();
   const handleDelete = (item) => {
      Swal.fire({
         title: "Are you sure?",
         text: "You won't be able to revert this!",
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#3085d6",
         cancelButtonColor: "#d33",
         confirmButtonText: "Yes, delete it!"
      }).then(async (result) => {
         if (result.isConfirmed) {
            const res = await axiosSecure.delete(`/menu/${item._id}`);
            // refetch to update the ui
            if (res.data.deletedCount > 0) {
               refetch();
               Swal.fire({
                  position: 'top-end',
                  title: `${item.name} Deleted Successfully`,
                  text: "Your file has been deleted.",
                  icon: "success"
               });
            }
         }
      });
   };
   const handleUpdate = (id) => {
      console.log(id)
   };

   if (loading) {
      <span className="loading loading-bars loading-lg"></span>

   }
   return (
      <div>
         <SectionTitle subheading={"Hurry up!"} heading='Manage All Items'></SectionTitle>
         <div>
            <div className="overflow-x-auto">
               <table className="table w-full">
                  {/* head */}
                  <thead>
                     <tr>
                        <th>
                           #
                        </th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Update</th>
                        <th>Delete</th>
                     </tr>
                  </thead>
                  <tbody>
                     {/* row 1 */}
                     {
                        menu.map((item, index) => (
                           <tr key={item._id}>
                              <th>
                                 {index + 1}
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
                                    onClick={() => handleUpdate(item._id)}
                                    className="btn btn-ghost btn-lg "><FaRegEdit className='text-[#d1a054]' /></button>
                              </th>
                              <th>
                                 <button
                                    onClick={() => handleDelete(item)}
                                    className="btn btn-ghost btn-lg "><FaTrash className='text-red-600'></FaTrash></button>
                              </th>
                           </tr>
                        ))
                     }
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
};

export default ManageItems;