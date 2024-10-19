export const saveCroppedImage = async (canvas: HTMLCanvasElement, filename: string) => {
    // Convert the canvas content to a Blob
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob!);
      }, 'image/png');
    });
  
    // Create FormData and append the image
    const formData = new FormData();
    const image = `${filename}.png`;
    formData.append('image', blob, image);
  
    try {
      // Send to backend
      const response = await fetch('/api/image', {  // Replace with your API endpoint
        method: 'POST',
        body: formData
      });
  
      if (!response.ok) {
        throw new Error('Failed to upload image');
      }
  
      const data = await response.json();
      return data;  // Return response from server
  
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };