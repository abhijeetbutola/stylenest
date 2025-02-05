import StarRating from "../star-rating"

type User = {
    name: string;
    user_id: string;
    avatar_url: string | null;
  }

type Review = {
    rating: number;
    content: string;
    created_at: string; // ISO date string
    user: User;
  }

type ReviewCardProps = {
    review: Review;
}

function ReviewCard({review}: ReviewCardProps) {
    return (
        <div className="flex flex-col gap-4 text-left">
            <div className="flex gap-4">
            <div className="h-11 w-12 rounded-full overflow-hidden">
                <img src={review.user.avatar_url || ""} alt="" height={48} width={48} className="object-cover w-full h-full" />
            </div>
            <div className="flex flex-col gap-1 items-start w-full">
                <div className="flex justify-between items-center w-full">
                <div className="font-semibold text-base text-neutral-900">{review.user.name}</div>
                <div className="text-neutral-600 text-xs font-normal">{review.created_at}</div>
                </div>
                <StarRating stars={5} rating={review.rating} />
            </div>
            </div>
            <div className="text-base font-normal text-neutral-600">{review.content}</div>
        </div>
    )
}

export default ReviewCard