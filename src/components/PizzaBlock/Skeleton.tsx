import ContentLoader from 'react-content-loader';
import { FC } from 'react';

interface SkeletonProps {
  [key: string]: any;
}

const Skeleton: FC<SkeletonProps> = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={470}
    viewBox="0 0 280 470"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="140" cy="130" r="130" />
    <rect x="0" y="270" rx="10" ry="10" width="280" height="27" />
    <rect x="0" y="315" rx="10" ry="10" width="280" height="88" />
    <rect x="-1" y="432" rx="10" ry="10" width="90" height="27" />
    <rect x="130" y="425" rx="30" ry="30" width="150" height="45" />
  </ContentLoader>
);

export { Skeleton };
