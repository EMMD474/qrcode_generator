"use client"

import QRForm from './components/QRForm';
import { Toaster } from 'sonner';
import Head from "next/head"
import { useEffect } from 'react';

export default function Home() {

  useEffect(() => {
    document.title = "QR Code Ready!";
  }, []);


 
  return (
    <>
    <Head>
      <title>
        QR Code Generator
      </title>
    </Head>
      <main>
        <div 
          className="h-screen w-screen bg-cover bg-center flex flex-col items-center justify-center" 
          style={{ backgroundImage: "url('/background.png')" }}
        >
          <Toaster position='top-right' className='bg-gray-800' />
          <div 
            className='bg-gray-900 rounded-lg shadow-lg p-6' 
          >
            <h2 className='flex flex-row items-center text-gray-700 text-2xl font-bold'>
              <span className='text-white mr-2'>QR-Code </span>
              Generator
            </h2>
            <QRForm />
          </div>
        </div>
      </main>
    </>
  );
}
