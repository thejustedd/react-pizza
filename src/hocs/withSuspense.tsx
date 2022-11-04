import React, { ReactNode, Suspense } from 'react';
import { Loader } from '../components/Loader';

const withSuspense = (node: ReactNode) => {
  return (
    <Suspense
      fallback={
        <div className="loader-block">
          <Loader />
        </div>
      }>
      {node}
    </Suspense>
  );
};

export { withSuspense };
