import { useState, useEffect, useMemo } from "react";
import Button from "../button";
import ReviewCard from "../review-card";
import ProgressBar from "../progress-bar";
import StarRating from "../star-rating";
import ReviewModal from "../review-modal";
import { LoaderCircle } from "lucide-react";

interface User {
  name: string;
  user_id: string;
  avatar_url: string | null;
}

interface Review {
  rating: number;
  content: string;
  created_at: string; // ISO date string
  user: User;
}

interface RatingCount {
  count: number;
  rating: number;
}

interface Aggregate {
  counts: RatingCount[];
  rating: number; // Average rating
  total: number; // Total number of reviews
}

interface Pagination {
  has_more: boolean;
  page: number;
  per_page: number;
  total: number;
}

type ReviewsResponse = {
  data: Review[];
  aggregate: Aggregate;
  pagination: Pagination;
};

type ProductDetailSectionModalProps = {
  product_id: string;
  reviewsCount: number;
};

type RatingProps = {
  name: string;
  color: string;
};

const ratingName: Record<string, RatingProps> = {
  "5": { name: "Excellent", color: "green-600" },
  "4": { name: "Good", color: "green-500" },
  "3": { name: "Average", color: "yellow-300" },
  "2": { name: "Below Average", color: "yellow-500" },
  "1": { name: "Poor", color: "red-600" },
};

function ProductDetailSectionModal({
  product_id,
  reviewsCount,
}: ProductDetailSectionModalProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[] | []>([]);
  const [stats, setStats] = useState<Aggregate>();
  const [pagination, setPagination] = useState<Pagination>();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviewData = async () => {
      setIsFetchingMore(true);
      try {
        const response = await fetch(
          `https://www.greatfrontend.com/api/projects/challenges/e-commerce/products/${product_id}/reviews?page=${page}`
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const result: ReviewsResponse = await response.json();
        const { data, aggregate, pagination } = result;
        setReviews((prev) => [...prev, ...data]);
        setStats(aggregate);
        setPagination(pagination);
        setLoading(false);
        setIsFetchingMore(false);
      } catch (error) {
        setError((error as Error).message || "Something went wrong");
        setLoading(false);
        setIsFetchingMore(false);
      }
    };

    let delay = undefined;
    if (modalOpen) delay = setTimeout(() => fetchReviewData(), 100);

    return () => {
      clearTimeout(delay);
    };
  }, [modalOpen, page, product_id]);

  const MemoizedModal = useMemo(
    () => (
      <ReviewModal open={modalOpen} onClose={() => setModalOpen(false)}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex max-lg:flex-col gap-8 w-full ">
            <div className="flex-[1.5]">
              <div className="flex flex-col gap-6 px-8">
                <div className="flex flex-col gap-2">
                  <div className="font-semibold text-xl text-neutral-900">
                    Overall Rating
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="text-base text-neutral-900 font-semibold">
                      {stats?.rating}
                    </div>
                    {stats && <StarRating stars={5} rating={stats.rating} />}
                    <div className="text-sm text-neutral-600 font-normal">
                      Based on {stats?.total} reviews
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-4 my-4">
                  {stats &&
                    stats.total > 0 &&
                    stats.counts
                      .sort((a, b) => b.rating - a.rating)
                      .map((item) => (
                        <div key={item.rating} className="flex items-center">
                          <div className="flex-1 text-neutral-600 text-base font-medium">
                            {ratingName[String(item.rating)].name}
                          </div>
                          <div className="flex items-center">
                            <ProgressBar
                              count={item.count}
                              totalReviews={stats.total}
                              color={ratingName[String(item.rating)].color}
                            />
                            <div className="w-[42px] h-6 text-right text-neutral-600 text-base font-normal">
                              {Math.round((item.count / stats.total) * 100)}%
                            </div>
                          </div>
                        </div>
                      ))}
                </div>
                <div className="mx-auto">
                  <Button className="font-medium text-base text-neutral-900 py-3 px-[22px] rounded-[4px] border border-neutral-200 shadow-md">
                    Write a review
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex-[2] flex flex-col gap-6 h-[536px] overflow-auto">
              <div className="flex flex-col gap-8 px-4 md:px-8 lg:pr-8 pb-6">
                {reviews.map((review, index) => (
                  <ReviewCard key={index} review={review} />
                ))}
              </div>
              {pagination?.has_more && (
                <div className="px-6 pb-6">
                  <Button
                    className="flex justify-center items-center w-full shadow-md text-neutral-900 font-medium text-base border border-neutral-200 py-2.5 rounded"
                    onClick={() => setPage((prev) => prev + 1)}
                  >
                    {isFetchingMore ? (
                      <span className="border-t-transparent rounded-full animate-spin">
                        <LoaderCircle />
                      </span>
                    ) : (
                      "Show 12 more reviews"
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </ReviewModal>
    ),
    [isFetchingMore, loading, modalOpen, pagination?.has_more, reviews, stats]
  );

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <Button
        className={`text-indigo-700 text-sm font-medium ${
          reviewsCount ? "" : "cursor-not-allowed"
        }`}
        onClick={() => setModalOpen(true)}
      >
        {reviewsCount ? `See all ${reviewsCount} reviews` : "No reviews yet"}
      </Button>
      {MemoizedModal}
    </>
  );
}

export default ProductDetailSectionModal;
