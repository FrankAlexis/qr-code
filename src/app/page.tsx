/* eslint-disable @next/next/no-img-element */
'use client'
import { generateQRCode } from "./actions/qrCode.action";
import { useState } from "react";

export default function Home() {
  const [qrImage, setQrImage] = useState<string>('')

  const handleSubmit = async (formData: FormData) => {
    try {
      const result = await generateQRCode(formData)
      setQrImage(result)
    } catch (e) {
      alert(e)
    }
  }

  const downloadImage = () => {
    const blob = new Blob([qrImage], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'downloaded_image.svg'; // Specify the name of the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Clean up the DOM
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {qrImage && 
          <div className="flex flex-col items-center">
            <img
                src={`data:image/svg+xml;utf8,${encodeURIComponent(qrImage)}`}
                alt="Vercel Logo"
                className="max-w-full h-auto"
            />
            <button onClick={downloadImage} className="mt-10 p-3 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
              Download QR
            </button>
          </div>
        }
      <form action={handleSubmit}  className="flex flex-col w-full">
        <div className="flex gap-2">
          <div className="mb-4">
              <label htmlFor="hexadecimal" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hexadecimal</label>
              <input type="text" placeholder="#ffffff" name="hexadecimal" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div> 
          <div className="w-full">
            <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Text</label>
            <input type="text" name="text" id="text" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
        </div>
        <div className="flex justify-center">
          <button type="submit" className="mt-3 p-3 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
            Generate QR
          </button>
        </div>
      </form>
    </main>
  );
}
