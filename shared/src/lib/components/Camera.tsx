import { Button } from '@mui/material';
import React, { useState } from 'react';
import WebCam from 'react-webcam';

interface CameraProps {
  onImageCapture: (image: string) => void;
}
const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user',
};
export const AppCamera: React.FC<CameraProps> = ({ onImageCapture }) => {
  const [image, setImage] = useState<any>(null);
  const handleReset = () => {
    setImage(null);
  };

  const handleSubmit = () => {
    if (image) {
      onImageCapture(image);
    }
  };

  return (
    <div>
      {!image && (
        <WebCam
          audio={false}
          height={'70%'}
          mirrored={false}
          screenshotFormat="image/jpeg"
          width={'100%'}
          videoConstraints={videoConstraints}
        >
          {({ getScreenshot }) => (
            <Button
              onClick={() => {
                const imageSrc = getScreenshot();
                setImage(imageSrc);
              }}
            >
              Capture photo
            </Button>
          )}
        </WebCam>
      )}
      {image && (
        <div>
          <img src={image} alt="Taken" />
          <Button onClick={handleReset}>Reset</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      )}
    </div>
  );
};
