import { NextRequest, NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';
export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData(); // Await formData to get the actual data
        console.log("In the route");
        
        // Assuming the file input is named "file"
        const file = formData.get('file'); 

        
        
        if (!file || !(file instanceof File)) {
            return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
        }

        // Log file details for debugging
        console.log("Uploaded file details:", {
            name: file.name,
            type: file.type,
            size: file.size,
        });

        // Implement logic to save the file to the public directory here
        // For example, using a library like `fs` and `path` to save the file
        const uploadPath = `./public/${file.name}`; // Change path as needed
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        await fs.promises.writeFile(uploadPath, buffer);

        return NextResponse.json({ message: "Image uploaded successfully!" });
    } catch (error) {
        console.error("Error uploading image:", error);
        return NextResponse.json({ error: "Error uploading image." }, { status: 500 });
    }
}
