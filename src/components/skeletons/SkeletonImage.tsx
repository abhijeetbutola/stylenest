type SkeletonImageProps = {
  className: string;
};

function SkeletonImage({ className }: SkeletonImageProps) {
  return <div className={`bg-gray-300 animate-pulse ${className}`}></div>;
}

export default SkeletonImage;
