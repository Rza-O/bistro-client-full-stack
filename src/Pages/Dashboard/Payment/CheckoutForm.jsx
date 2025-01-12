import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useCart from '../../../Hooks/useCart';
import useAuth from '../../../Hooks/useAuth';
import toast from 'react-hot-toast';

const CheckoutForm = () => {

   const [error, setError] = useState('');
   const axiosSecure = useAxiosSecure();
   const { user } = useAuth();

   const stripe = useStripe();
   const elements = useElements();
   const [clientSecret, setClientSecret] = useState('');
   const [transactionId, setTransactionId] = useState('');

   const [cart] = useCart();
   const totalPrice = cart.reduce((total, item) => total + item.price, 0)

   useEffect(() => {
      axiosSecure.post('/create-payment-intent', { price: totalPrice })
         .then(res => {
            console.log(res.data.clientSecret);
            setClientSecret(res.data.clientSecret);
         })

   }, [axiosSecure, totalPrice]);

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (!stripe || !elements) {
         return;
      }

      const card = elements.getElement(CardElement);

      if (card == null) {
         return;
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
         type: 'card',
         card,
      })

      if (error) {
         console.log('Payment error', error);
         setError(error.message);
      } else {
         console.log('Payment Method', paymentMethod)
         setError('');
      }

      // confirm Payment
      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
         payment_method: {
            card: card,
            billing_details: {
               email: user?.email || 'anonymous',
               name: user?.displayName || 'anonymous'
            }
         }
      })
      if (confirmError) {
         console.log(confirmError);
      }
      else {
         console.log('payment intent: ', paymentIntent);
         if (paymentIntent.status) {
            setTransactionId(paymentIntent.id);
            toast.success('Payment has be received')
            console.log(paymentIntent.id)

            // now save the payment in the db
            const payment = {
               email: user?.email,
               price: totalPrice,
               transactionId: paymentIntent.id,
               date: new Date(),  //use utc date converter like moment js
               cartIds: cart.map(item => item._id),
               menuItemIds: cart.map(item => item.menuId),
               status: 'pending'
            }

            const { data } = await axiosSecure.post('/payments', payment);
            console.log('payment saved!', data);

         }
      }
   }
   return (
      <form onSubmit={handleSubmit}>
         <CardElement
            options={{
               style: {
                  base: {
                     fontSize: '16px',
                     color: '#424770',
                     '::placeholder': {
                        color: '#aab7c4',
                     },
                  },
                  invalid: {
                     color: '#9e2146',
                  },
               },
            }}
         />
         <div className='flex justify-center items-center'>
            <button disabled={!stripe || !clientSecret} className='btn btn-primary' type="submit">
               Pay
            </button>
         </div>
         <p className='text-red-600'>{error}</p>
         {transactionId && <p className='text-green-600'>Your transaction id: ${transactionId}</p>}
      </form>
   );
};

export default CheckoutForm;