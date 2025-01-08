import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaTrash, FaUsers } from 'react-icons/fa';

const AllUsers = () => {
   const axiosSecure = useAxiosSecure();
   const { data: users = [] } = useQuery({
      queryKey: ['users'],
      queryFn: async () => {
         const { data } = await axiosSecure.get('/users');
         return data;
      }
   });

   const handleDeleteUser = (user) => { 

   };

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
                              <button
                                 onClick={() => handleDeleteUser(user)}
                                 className="btn bg-orange-400 btn-lg "><FaUsers className='text-white text-2xl'></FaUsers></button>
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