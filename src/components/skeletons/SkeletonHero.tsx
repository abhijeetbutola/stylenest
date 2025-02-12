import SkeletonImage from "./SkeletonImage";
import SkeletonText from "./SkeletonText";

function SkeletonHero() {
  return (
    <div className="flex-1 flex gap-8 flex-wrap max-sm:py-12 md:py-16 lg:p-24 max-lg:px-4 w-full min-h-[718px]">
      <div className="flex flex-col gap-8 lg:gap-16 justify-center lg:max-w-[calc(50%-1rem)] w-full">
        <div className="flex flex-col gap-6">
          <SkeletonText className="text-lg h-[120px]" />
          <SkeletonText className="h-[56px]" />
        </div>
        <div>
          <SkeletonText className="h-[60px] w-[176px]" />
        </div>
      </div>
      <div className="lg:max-w-[calc(50%-1rem)] w-full">
        <div className="rounded-lg overflow-hidden w-full h-full">
          <SkeletonImage className="max-lg:min-h-[300px] lg:h-full w-full" />
        </div>
      </div>
    </div>
  );
}

export default SkeletonHero;
