import React, { useState } from 'react';
import SelectImage from './components/SelectImage';
import ImageUploader from './components/ImageUploader';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageSelected = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  return (
    <div>
      {selectedImage ? (
        <SelectImage imageUrl={selectedImage} />
      ) : (
        <ImageUploader onImageSelected={handleImageSelected} />
      )}
    </div>
  );
}
