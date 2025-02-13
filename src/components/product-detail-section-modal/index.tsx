import { useState, useEffect, useMemo } from "react";
import Modal from "../modal";
import Button from "../button";
import ReviewCard from "../review-card";
import ProgressBar from "../progress-bar";
import StarRating from "../star-rating";

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

const ratingName: Record<string, string> = {
  "5": "Excellent",
  "4": "Good",
  "3": "Average",
  "2": "Below Average",
  "1": "Poor",
};

function ProductDetailSectionModal({
  product_id,
  reviewsCount,
}: ProductDetailSectionModalProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[] | []>([]);
  const [stats, setStats] = useState<Aggregate>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const response = await fetch(
          `https://www.greatfrontend.com/api/projects/challenges/e-commerce/products/${product_id}/reviews`
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const result: ReviewsResponse = await response.json();
        const { data } = result;
        const { aggregate } = result;
        setReviews(data);
        setStats(aggregate);
        setLoading(false);
      } catch (error) {
        setError((error as Error).message || "Something went wrong");
        setLoading(false);
      }
    };

    let delay = undefined;
    if (modalOpen) delay = setTimeout(() => fetchReviewData(), 100);

    return () => {
      clearTimeout(delay);
    };
  }, [modalOpen, product_id]);

  const MemoizedModal = useMemo(
    () => (
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex max-lg:flex-col gap-8 w-full ">
            <div className="flex-[1.5]">
              <div className="flex flex-col gap-4 px-8">
                <div>Overall Rating</div>
                <div className="flex gap-2 items-center">
                  <div>{stats?.rating}</div>
                  {stats && <StarRating stars={5} rating={stats.rating} />}
                  <div>Based on {stats?.total} reviews</div>
                </div>
                {stats &&
                  stats.total > 0 &&
                  stats.counts.map((item) => (
                    <div className="flex justify-between">
                      <div>{ratingName[String(item.rating)]}</div>
                      <ProgressBar
                        count={item.count}
                        totalReviews={stats.total}
                      />
                    </div>
                  ))}
              </div>
            </div>
            <div className="flex-[2] flex flex-col gap-8 h-[536px] overflow-scroll px-4 md:px-8 lg:pr-8">
              {reviews.map((review, index) => (
                <ReviewCard key={index} review={review} />
              ))}
            </div>
          </div>
        )}
      </Modal>
    ),
    [loading, modalOpen, reviews, stats]
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
