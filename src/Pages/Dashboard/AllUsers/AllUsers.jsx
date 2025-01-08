import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaTrash, FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AllUsers = () => {
   const axiosSecure = useAxiosSecure();
   const { data: users = [], refetch } = useQuery({
      queryKey: ['users'],
      queryFn: async () => {
         const { data } = await axiosSecure.get('/users');
         return data;
      }
   });

   const handleDeleteUser = (user) => {
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
            axiosSecure.delete(`/users/${user._id}`)
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
   };

   const handleMakeAdmin = async (user) => {
      try {
         const { data } = await axiosSecure.patch(`/users/admin/${user._id}`);
         console.log(data);
         if (data.modifiedCount > 0) {
            refetch();
            Swal.fire({
               icon: "success",
               title: `${user.name} is an admin now!`,
               showConfirmButton: false,
               timer: 1500
            });
         }
      } catch (error) {
         console.log(error)
      }
   }

   return (
      <div>
         <div className="flex justify-evenly my-4">
            <h2 className="3xl">All Users</h2>
            <h2 className="3xl">Total Users: {users.length}</h2>
         </div>
         <div className="overflow-x-auto">
            <table className="table">
               {/* head */}
               <thead>
                  <tr>
                     <th>#</th>
                     <th>Name</th>
                     <th>Email</th>
                     <th>Role</th>
                     <th>Action</th>
                  </tr>
               </thead>
               <tbody>
                  {/* row 1 */}
                  {
                     users.map((user, idx) => (
                        <tr key={idx}>
                           <th>{idx + 1}</th>
                           <td>{user.name}</td>
                           <td>{user.email}</td>
                           <td>
                              { user.role === 'admin'? 'Admin'
                                 :
                                 <button
                                    onClick={() => handleMakeAdmin(user)}
                                    className="btn bg-orange-400 btn-lg "><FaUsers className='text-white text-2xl'></FaUsers></button>
                              }
                           </td>
                           <td>
                              <button
                                 onClick={() => handleDeleteUser(user)}
                                 className="btn btn-ghost btn-lg "><FaTrash className='text-red-600'></FaTrash></button>
                           </td>
                        </tr>
                     ))
                  }
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default AllUsers;