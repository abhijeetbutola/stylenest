import SkeletonImage from "./SkeletonImage"
import SkeletonText from "./SkeletonText"

function SkeletonProductCard() {
    return (
        <div className="flex flex-col rounded-lg overflow-clip w-full h-full">
            <div className="h-full w-full">
                <SkeletonImage className="h-[300px] w-full md:max-w-[320px] relative rounded-lg overflow-hidden" />
            </div>
            <div className="pt-4">
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-0.5">
                        <SkeletonText className="h-2 w-1/3" />
                        <SkeletonText className="h-6 w-2/3" />
                    </div>
                    <div className="font-normal">
                        <SkeletonText className="h-3 w-1/3" />
                    </div>
                    <div className="flex gap-1 pb-[30px]">
                        {Array(2).fill(0).map((_, index) => (
                            <SkeletonText
                                key={index}
                                className="h-4 w-4 rounded-full"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SkeletonProductCard