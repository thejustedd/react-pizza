import React, { FC, LegacyRef, ReactNode } from 'react';
import { isMobileDevice } from '../utils';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

interface CustomSimpleBarProps {
  [key: string]: any;
  children: ReactNode;
}

const CustomSimpleBar: FC<CustomSimpleBarProps> = React.forwardRef(
  ({ children, ...props }, ref) => {
    return isMobileDevice ? (
      <>{children}</>
    ) : (
      <SimpleBar {...props} ref={ref as LegacyRef<SimpleBar>} style={{ maxHeight: '100vh' }}>
        {children}
      </SimpleBar>
    );
  },
);

export { CustomSimpleBar };
