"use client"
import { useState } from "react";
import { InputImage } from "@/components/InputImage";
import 'react-image-crop/dist/ReactCrop.css'

export default function Home() {

  const [isUpaload, setIsupload] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<string | undefined>(undefined);

  const setvalue = (val:string | undefined)=>{
    setImgUrl(val);
    setIsupload(false);
  }
  return (

    <div className="h-[150vh] w-full flex-col flex items-center ">
      <div>
      <h1>image Crop</h1>
      <button onClick={()=>{setIsupload(true)}} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">add image</button>
      </div>
    

   {isUpaload && <InputImage  setImgUrl={setvalue}/> }


    {imgUrl && <img src={imgUrl} alt="" />}
    </div>
  );
}
