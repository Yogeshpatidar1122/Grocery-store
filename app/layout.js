  'use client'
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import { Toaster } from "@/components/ui/sonner";
import { usePathname } from "next/navigation";
import { useState } from "react";
import  { UpdateCardContext } from '@/app/_context/UpdateCartContext'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Script from "next/script";

const outFit = Outfit({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Grocery Store",
//   description: "Online Purchase Grocery for your home",
// };

export default function RootLayout({children})
    

{
  const params=usePathname();
  const [updateCart,setUpdateCart]=useState(false);
  const showHeader=params=='/sign-in'||params=='/create-account'?false:true;
  return (
    
    <PayPalScriptProvider options={{ clientId:process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>

    <html lang="en">
      <body className={outFit.className}>
        <UpdateCardContext.Provider value={{updateCart,setUpdateCart }}>

        {showHeader&&<Header/>}
        {children}
        <Toaster/>
        </UpdateCardContext.Provider>
        <Script
          src={`https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}`}
          strategy="beforeInteractive"
        />
        </body>
    </html>
        </PayPalScriptProvider>
    
  );
}
