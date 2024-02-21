import React, { useEffect, useState, useRef } from 'react';

const SelectImage = ({ imageUrl }) => {
  const [pieces, setPieces] = useState([]);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [isPuzzleSolved, setIsPuzzleSolved] = useState(false);
  const originalImageRef = useRef(null);

  const createPieceSrc = (image, x, y, pieceWidth, pieceHeight) => {
    const pieceCanvas = document.createElement('canvas');
    const pieceContext = pieceCanvas.getContext('2d');
    pieceCanvas.width = pieceWidth;
    pieceCanvas.height = pieceHeight;
    pieceContext.drawImage(image, x, y, pieceWidth, pieceHeight, 0, 0, pieceWidth, pieceHeight);
    return pieceCanvas.toDataURL();
  };

  const checkPuzzleSolved = () => {
    return pieces.every((piece, index) => (
      piece.row === Math.floor(index / 4) &&
      piece.col === index % 4
    ));
  };

  const handleTouchStart = (index) => {
    if (selectedPiece === null) {
      setSelectedPiece(index);
    } else {
      const updatedPieces = [...pieces];

      const tempPiece = { ...updatedPieces[index] };
      updatedPieces[index] = { ...updatedPieces[selectedPiece] };
      updatedPieces[selectedPiece] = tempPiece;

      updatedPieces.forEach((piece, idx) => {
        piece.row = Math.floor(idx / 4);
        piece.col = idx % 4;
      });

      setPieces(updatedPieces);
      setSelectedPiece(null);

      const currentCoordinates = updatedPieces.map(piece => ({ row: piece.row, col: piece.col }));
      console.log("Coordenadas actuales después de la interacción:", currentCoordinates);
    }
  };

  const handleSetButton = () => {
    const currentCoordinates = pieces.map(piece => ({ row: piece.row + 1, col: piece.col + 1 }));
    const correctCoordinates = pieces.map(piece => piece.originalPosition);

    console.log("Coordenadas actuales:", currentCoordinates);
    console.log("Coordenadas correctas:", correctCoordinates);

    setIsPuzzleSolved(checkPuzzleSolved());
  };

  useEffect(() => {
    const loadAndSplitImage = async () => {
      const image = new Image();
      image.src = imageUrl;

      await image.decode();

      const numPieces = 12;
      const cols = 4;
      const rows = 3;
      const pieceWidth = image.width / cols;
      const pieceHeight = image.height / rows;

      const generatedPieces = [];

      originalImageRef.current = createPieceSrc(image, 0, 0, image.width, image.height);

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const pieceSrc = createPieceSrc(image, j * pieceWidth, i * pieceHeight, pieceWidth, pieceHeight);
          generatedPieces.push({
            index: i * cols + j,
            imageSrc: pieceSrc,
            originalPosition: { row: i, col: j },
            row: i,
            col: j,
          });
        }
      }

      generatedPieces.sort(() => Math.random() - 0.5);

      setPieces(generatedPieces);
    };

    if (imageUrl) {
      loadAndSplitImage();
    }
  }, [imageUrl]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="grid grid-cols-4 gap-2 p-6 bg-gray-100 rounded-md shadow-md relative overflow-hidden max-w-3xl mx-auto cursor-pointer">
        {pieces.map((piece, index) => (
          <div
            className={`group transform transition-transform ${selectedPiece === index ? 'scale-120 border-4 border-blue-500' : ''}`}
            key={index}
            onClick={() => handleTouchStart(index)}
          >
            <img
              src={piece.imageSrc}
              alt={`Puzzle Piece ${index}`}
              className="w-full h-auto"
            />
          </div>
        ))}
      </div>
      <div className="flex flex-row items-center mt-4">
        <div
          className={`${
            isPuzzleSolved ? 'text-green-500' : 'bg-blue-500 text-white'
          } py-4 px-6 rounded cursor-pointer hover:scale-120 font-bold ml-2 mr-2`}
          onClick={handleSetButton}
        >
          {isPuzzleSolved ? '¡Puzzle resuelto!' : 'Set'}
        </div>
        <div
          className="bg-blue-500 text-white py-4 px-4 rounded cursor-pointer ml-2 mr-2  hover:scale-120 font-bold"
          onClick={() => window.location.reload()}
        >
          Refresh
        </div>
      </div>
    </div>
  );
};

export default SelectImage;