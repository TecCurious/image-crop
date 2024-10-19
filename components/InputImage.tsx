import React from "react";
import { ChangeEvent, useActionState, useRef, useState } from "react";
import ReactCrop, { centerCrop, makeAspectCrop, Crop, convertToPixelCrop } from 'react-image-crop';
import setCanvasPreview from "@/function/CreateCanvas";

interface inputImgProp {
    setImgUrl: (value: string | undefined) => void;
}

export const InputImage: React.FC<inputImgProp> = ({setImgUrl}) => {
    const ASPECT_RATIO = 1;
    const MIN_WIDTH = 300;

    const [imgSrc, setImgSrc] = useState<string | null>(null);
    const [crop, setCrop] = useState<Crop>();
    const [errorMes, setErrorMes] = useState<string | null>(null);
    
    // Fix the ref types
    const imgRef = useRef<HTMLImageElement>(null);
    const previewCanvasRef = useRef<HTMLCanvasElement>(null);

    const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.addEventListener("load", () => {
            const imageElement = new Image();
            const imageUrl = reader.result?.toString() || "";

            imageElement.src = imageUrl;

            imageElement.addEventListener("load", (e: Event) => {
                if (errorMes) {
                    setErrorMes(null);
                }
                const target = e.target as HTMLImageElement;
                const { naturalHeight, naturalWidth } = target;

                if (naturalHeight < MIN_WIDTH || naturalWidth < MIN_WIDTH) {
                    setErrorMes("image size is too small");
                    return;
                }
                setImgSrc(imageUrl);
            });
        });

        reader.readAsDataURL(file);
    };

    const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const { height, width } = e.currentTarget;
        const cropWidthPercent = (MIN_WIDTH / width) * 100;

        const crop = makeAspectCrop(
            {
                unit: "%",
                width: cropWidthPercent,
            },
            ASPECT_RATIO,
            width,
            height
        );

        const centeredCrop = centerCrop(crop, width, height);
        setCrop(centeredCrop);
    };

    return (
        <div className="w-[40%] h-[120vh] bg-slate-600">
            <input
                type="file"
                accept="image/*"
                placeholder="select image"
                onChange={onSelectFile}
            />
            {errorMes && <p className="text-red-600 text-center">{errorMes}</p>}

            {imgSrc && (
                <div className="flex justify-center flex-col">
                    <ReactCrop
                        crop={crop}
                        circularCrop
                        keepSelection
                        aspect={ASPECT_RATIO}
                        minHeight={MIN_WIDTH}
                        onChange={(_, percentCrop) => setCrop(percentCrop)}
                    >
                        <img 
                            src={imgSrc} 
                            ref={imgRef} 
                            className="max-w-[70vh]" 
                            onLoad={onImageLoad}
                            alt="Crop preview"
                        />
                    </ReactCrop>

                    <button
                        onClick={() =>
                          {  imgRef.current && previewCanvasRef.current && crop && 
                            setCanvasPreview(
                                imgRef.current,
                                previewCanvasRef.current,
                               convertToPixelCrop(crop, 
                                imgRef.current.width,
                                imgRef.current.height
                               )
                            );
                       const dataUrl =  previewCanvasRef.current?.toDataURL();
                       setImgUrl(dataUrl);
                        
                        }
                            

                        }
                        className="bg-blue-600 rounded-full"
                    >
                        Submit
                    </button>
                </div>
            )}

            {crop && (
                <canvas
                    ref={previewCanvasRef}
                    className="mt-6 ml-4"
                    style={{
                        display:"none",
                        border: "1px solid black",
                        objectFit: "contain",
                        width: 150,
                        height: 150,
                    }}
                />
            )}
        </div>
    );
};