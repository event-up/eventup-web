import React, { useEffect, useMemo, useState } from 'react';
import {
  Container,
  CardContent,
  TextField,
  Stack,
  Input,
  LinearProgress,
  Button,
  Avatar,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { handleCreateContestant } from '../../services';
import { fileToSrc, uploadContestantImage } from '@eventup-web/shared';
import { useRootContext } from '../../app/RootContext';

export function RegistrationCreateView(props: {
  reservedId: string;
  selfClose: () => void;
  reFetchParentData: () => void;
}) {
  const [name, setName] = useState('');
  const { showMessage } = useRootContext();
  const [image, setimage] = useState<any>(null);
  const [imageSrc, setImageSrc] = useState('');

  const [imgProgress, setImgProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const category = location.state?.category;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setimage(e.target.files[0]);
    }
  };

  const handleRegister = async () => {
    try {
      if (!name || !image) {
        throw new Error('Please fill all fields');
      }
      setLoading(true);
      const photoUrl = await uploadContestantImage(
        image,
        props.reservedId,
        (progress) => setImgProgress(progress)
      );

      await handleCreateContestant({
        category: 'QUEEN',
        name,
        photoUrl,
        voteCount: 0,
        id: props.reservedId,
      });

      props.reFetchParentData();
      props.selfClose();

      // reset the form
      setName('');
      setimage(null);
      setImgProgress(0);
    } catch (e) {
      console.log({ e });
      showMessage('ERROR', e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (image) {
      fileToSrc(image).then((src) => {
        setImageSrc(src);
      });
    }
  }, [image]);

  console.log({ image });

  return (
    <div className="flex flex-col justify-center  ">
      <Stack spacing={2} className="flex flex-col justify-center items-center">
        <Avatar sx={{ width: 250, height: 250 }} src={imageSrc}>
          <Input onChange={handleImageChange} hidden type="file"></Input>
        </Avatar>
        {imgProgress > 0 && (
          <div className="w-[50%]">
            <LinearProgress variant="determinate" value={imgProgress} />
          </div>
        )}
        <div>#{props.reservedId}</div>
        <TextField
          label="Name"
          variant="standard"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Stack>

      <div className="mt-4 flex flex-row justify-end space-x-2">
        <Button className="mt-4" variant="outlined" onClick={props.selfClose}>
          Close
        </Button>
        <Button
          disabled={loading}
          className="mt-4"
          variant="contained"
          onClick={handleRegister}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
