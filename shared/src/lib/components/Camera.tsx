import {
  CameraAltRounded,
  CameraswitchOutlined,
  CloseOutlined,
  Done,
} from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import React, { LegacyRef, RefObject, useState } from 'react';
import Webcam from 'react-webcam';
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
  const webcamRef = React.useRef<any>(null);
  const handleReset = () => {
    setImage(null);
  };
  const capture = React.useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      return imageSrc;
    }
  }, [webcamRef]);

  const handleSubmit = () => {
    if (image) {
      onImageCapture(image);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col">
      {!image && (
        <WebCam
          audio={false}
          height={'70%'}
          mirrored={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={'80%'}
          videoConstraints={videoConstraints}
        ></WebCam>
      )}
      {image ? (
        <>
          <img src={image} alt="Taken" />
          <div className="flex flex-row  my-4 justify-between">
            <Button startIcon={<CloseOutlined />} onClick={handleReset}>
              Retake
            </Button>
            <Button
              variant="contained"
              startIcon={<Done />}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </>
      ) : (
        <Button
          onClick={() => {
            const imageSrc = capture();
            setImage(imageSrc);
          }}
          size="large"
          startIcon={<CameraAltRounded />}
        >
          Capture
        </Button>
      )}
    </div>
  );
};
