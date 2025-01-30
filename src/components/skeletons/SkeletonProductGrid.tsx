import SkeletonProductCard from "./SkeletonProductCard";

type SkeletonProductGridProps = {
    count?: number;
}

function SkeletonProductGrid({ count = 8 }: SkeletonProductGridProps) {
    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] grid-rows-auto gap-8">
            {[...Array(count)].map((_, index) => (
                <SkeletonProductCard key={index} />
            ))}
        </div>
    );
};

export default SkeletonProductGrid;
