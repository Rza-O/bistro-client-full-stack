import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

// TODO: Add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK)

const Payment = () => {
   return (
      <div>
         <SectionTitle subheading={"Please pay the amount!"} heading='Payment'></SectionTitle>   
         <div>
            <Elements stripe={stripePromise}>
               <CheckoutForm></CheckoutForm>
            </Elements> 
         </div>
      </div>
   );
};

export default Payment;