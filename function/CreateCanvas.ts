import { Crop } from "react-image-crop";
import { saveCroppedImage } from "./SaveCropImg";
const setCanvasPreviw = async (
    image: HTMLImageElement ,
  canvas: HTMLCanvasElement,
  crop: Crop,
) =>{
    const ctx = canvas.getContext("2d");
    if(!ctx){
        throw new Error("NO 2d contex");

    }
   
    const pixelRatio = window.devicePixelRatio;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
    canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

    ctx.scale(pixelRatio, pixelRatio); 
    ctx.imageSmoothingQuality = "high";
    ctx.save();

    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;

    //move the crop origin to canvas origin (0,0)
    ctx.translate(-cropX, -cropY);
    ctx.drawImage(
        image,
        0,
        0,
        image.naturalWidth,
        image.naturalHeight,
        0,
        0,
        image.naturalWidth,
        image.naturalHeight 
    )

    ctx.restore();
   try{ await  saveCroppedImage(canvas, "cropped-image");

   }catch(error){
    console.log(error);
   }
};

export default setCanvasPreviw;








