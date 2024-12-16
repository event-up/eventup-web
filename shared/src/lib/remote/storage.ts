import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from './configs';

const CONTESTANT_BUCKET = 'contestants';
export async function uploadFile(
  file: Blob | Uint8Array | ArrayBuffer,
  bucket_path: string,
  onProgress: (progress: number) => void
): Promise<string> {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, bucket_path);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        onProgress(progress);
      },
      (error) => {
        // Handle unsuccessful uploads
        reject(error);
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
}

export const uploadContestantImage = async (
  file: Blob | Uint8Array | ArrayBuffer,
  participantId: string,
  onProgress: (progress: number) => void
) => {
  const res = await uploadFile(
    file,
    `${CONTESTANT_BUCKET}/images/${participantId}`,
    onProgress
  );

  return res;
};
