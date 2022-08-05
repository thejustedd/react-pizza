import ContentLoader from 'react-content-loader';
import { FC } from 'react';

interface SkeletonProps {
  [key: string]: any;
}

const Skeleton: FC<SkeletonProps> = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="130" cy="130" r="110" />
    <rect x="0" y="265" rx="10" ry="10" width="280" height="27" />
    <rect x="0" y="312" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="429" rx="10" ry="10" width="90" height="27" />
    <rect x="130" y="420" rx="30" ry="30" width="150" height="45" />
  </ContentLoader>
);

export { Skeleton };
