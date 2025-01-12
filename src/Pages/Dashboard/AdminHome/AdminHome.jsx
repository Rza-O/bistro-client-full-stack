import React from 'react';
import useAuth from '../../../Hooks/useAuth';

const AdminHome = () => {
   const { user } = useAuth();
   return (
      <div>
         <h2 className="text-3xl">
            <span>Hi, Welcome Back, {user?.displayName}</span>
            
         </h2>
      </div>
   );
};

export default AdminHome;