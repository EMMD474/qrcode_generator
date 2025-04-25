"use client"

import React, { useState } from 'react'
import { Sparkle, QrCode, Download, BadgeCheck, XCircle, Check } from 'lucide-react'
import { toast } from 'sonner'
import QRCode from 'qrcode';
import Image from 'next/image';


const QRForm = () => {
    const [urlError, setUrlError] = useState(false);
    const [url, setUrl] = useState<string>("");
    const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

    const downloadQRCode = () => {
        const link = document.createElement("a")
        link.href = qrCodeUrl;
        link.download = "QR Code";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast.success("QR Code downloaded!", {
            icon: <Check size={18} color="green" />,
            style: {
                backgroundColor: "#1F2937",
                border: "1px solid #4B5563",
                color: "white",
            }
        })
    }

    const generateQRCode = async () => {
        try {
            const qr = await QRCode.toDataURL(url);
            setQrCodeUrl(qr);
          } catch (err) {
            console.error(err);
          }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (url.trim() === "") {
            setUrlError(true);
            toast.error("Please enter the url", {
                icon: <XCircle size={18} color='red' />,
            style: {
                backgroundColor: "#1F2937",
                border: "1px solid #4B5563",
                color: "#fff",
            }
            })
            return;
        }

        setUrlError(false);
        toast.success("QR Code generated successfully", {
            icon: <BadgeCheck size={18} color='green' />,
            style: {
                backgroundColor: "#1F2937",
                border: "1px solid #4B5563",
                color: "#fff",
            }


            
        })
        generateQRCode();

    }
  return (
    <div>
        <form 
            onSubmit={handleSubmit}
            noValidate 
            className='w-full mt-2  flex flex-col items-center justify-center'>
            <input 
                type="text" 
                placeholder='Enter url...' 
                onChange={(e) => {setUrl(e.target.value)}}
                className={`w-full border ${urlError ? "border-red-500": "border-gray-700"} rounded-md p-1 outline-0 focus:border-gray-400 transition ease-in-out duration-200 text-gray-500 `} />
            <button type='submit' className='w-full mt-2 cursor-pointer bg-gray-700 text-white rounded-md p-1 hover:bg-gray-800 transition ease-in-out duration-200'>
                Generate
                <QrCode className='inline-block ml-2' size={18} color='white' />
            </button>
        </form>
        {qrCodeUrl && (
            <div className='flex flex-col items-center justify-center'>
                <Image 
                    src={qrCodeUrl} 
                    alt="QR Code" 
                    width={200} 
                    height={200} 
                    className='mt-4 rounded-md shadow-lg' />
                    <button
                        onClick={downloadQRCode} 
                        className='rounded-md shadow-md cursor-pointer border border-gray-500 hover:border-gray-300 transition duration-200 ease-in-out bg-transparent hover:bg-gray-800 px-3 py-1 mt-4 text-white'>
                        Download
                        <Download className='inline-block ml-2 ' size={16} color='white' />
                    </button>
            </div>
        )}
    </div>
  )
}

export default QRForm