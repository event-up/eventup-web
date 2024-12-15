import { CircularProgress } from '@mui/material';
import { Suspense } from 'react';

export const withSuspense = (child: React.ReactElement) => {
  return (
    <Suspense
      fallback={
        <div
          style={{ height: '100vh' }}
          className=" flex justify-center align-center "
        >
          <CircularProgress color="primary" />
        </div>
      }
    >
      {child}
    </Suspense>
  );
};
