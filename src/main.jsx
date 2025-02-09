import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import router from './Routes/router.jsx';
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './Context/AuthProvider.jsx';
import {
   QueryClient,
   QueryClientProvider,
} from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
   <StrictMode>
      <AuthProvider>
         <QueryClientProvider client={queryClient}>
            <HelmetProvider>
               <div className='max-w-screen-xl mx-auto'>
                  <Toaster />
                  <RouterProvider router={router} />
               </div>
            </HelmetProvider>
         </QueryClientProvider>
      </AuthProvider>
   </StrictMode>,
)
