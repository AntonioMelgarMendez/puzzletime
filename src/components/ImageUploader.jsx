import React, { useState } from 'react';
import image from "./icon.png"
const ImageUploader = ({ onImageSelected }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      onImageSelected(imageUrl);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="max-w-md w-full p-6 bg-gray-100 rounded-md shadow-md text-center mt-10">
        <div className="mb-4 flex items-center justify-center">
          <img src={image} width={60} height={60} alt="Icon" />
        </div>
        <label className="block text-xl mb-4">Create your puzzle </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border p-4 mb-4 hidden"
          id="fileInput"
        />
        <label
          htmlFor="fileInput"
          className="p-2 rounded-md cursor-pointer hover:underline hover:text-blue-500"
        >
          Upload Image
        </label>
        {selectedImage && (
          <div className="flex items-center justify-center mt-4">
            <img
              src={selectedImage}
              alt="Selected Image"
              className="w-full h-auto max-h-64"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
