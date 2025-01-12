import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const PaymentHistory = () => {
   const { user } = useAuth();
   const axiosSecure = useAxiosSecure();

   const { data: payments = [] } = useQuery({
      queryKey: ['payments', user.email],
      queryFn: async () => {
         const { data } = await axiosSecure.get(`/payments/${user.email}`);
         return data;
      }
   })

   console.log(payments)


   return (
      <div>
         <h2 className="text-3xl">Total Payments: {payments.length}</h2>
         <div className="overflow-x-auto">
            <table className="table">
               {/* head */}
               <thead>
                  <tr>
                     <th>#</th>
                     <th>Price</th>
                     <th>Transaction ID</th>
                     <th>Status</th>
                  </tr>
               </thead>
               <tbody>
                  {/* row 1 */}
                  {
                     payments.map((payment, idx) =>
                        <tr key={idx}>
                           <th>{idx + 1}</th>
                           <td>${payment.price}</td>
                           <td>{ payment.transactionId}</td>
                           <td>{payment.status}</td>
                        </tr>
                     )
                  }
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default PaymentHistory;