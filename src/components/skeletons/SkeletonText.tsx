type SkeletonTextProps = {
    className: string;
}

function SkeletonText({ className="h-6" }: SkeletonTextProps) {
    return (
        <div className={`bg-gray-300 rounded animate-pulse ${className}`}></div>
    )
}

export default SkeletonText