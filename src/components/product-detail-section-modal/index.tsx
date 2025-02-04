import { useState, useEffect, useMemo } from "react";
import Modal from "../modal";
import StarRating from "../star-rating";
import Button from "../button";

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
  }
    
  type ProductDetailSectionModalProps = {
    product_id: string;
    reviewsCount: number;
  }

function ProductDetailSectionModal({product_id, reviewsCount}: ProductDetailSectionModalProps) {
    const [modalOpen, setModalOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[] | []>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
      const fetchReviewData = async () => {
        try{
          const response = await fetch(`https://www.greatfrontend.com/api/projects/challenges/e-commerce/products/${product_id}/reviews`)
          if(!response.ok) throw new Error("Failed to fetch data")
          const result: ReviewsResponse = await response.json()
          const { data } = result
          setReviews(data)
          setLoading(false)
        } catch(error) {
          setError((error as Error).message || "Something went wrong")
          setLoading(false)
        } 
      }
      fetchReviewData()
  },[product_id])

  const MemoizedModal = useMemo(() => (
    <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
      <div className="flex max-lg:flex-col gap-8 w-full ">
        <div className="flex-[1.5]">Left Section</div>
        <div className="flex-[2] flex flex-col gap-8 h-[536px] overflow-scroll px-4 md:px-8 lg:pr-8">
          {reviews.map((review, index) => (
            <div key={index} className="flex flex-col gap-4 text-left">
              <div className="flex gap-4">
                <div className="h-11 w-12 rounded-full overflow-hidden">
                  <img src={review.user.avatar_url || ""} alt="" className="object-cover w-full h-full" />
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
          ))}
        </div>
      </div>
    </Modal>
  ), [modalOpen, reviews]);  

  if(loading) {
    return <p>Loading...</p>
  }

  if(error) {
    return <p>Error: {error}</p>
  }

  return (
    <>
        <Button className="text-indigo-700 text-sm font-medium" onClick={() => setModalOpen(true)}>
                See all {reviewsCount} reviews
        </Button>
        {modalOpen && MemoizedModal}
    </>
  )
}

export default ProductDetailSectionModal