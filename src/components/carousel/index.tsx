import { useState} from 'react'
import { Image } from '../product-grid/schema';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type ImageCarouselProps = {
  images: Image[]
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [imageIndex, setImageIndex] = useState(0);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setImageIndex((index) => (index + 1) % images.length);
  //   }, 3000);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, [images.length]);

  const handlePrevClick = () => {
    setImageIndex((index) => (index === 0 ? images.length - 1 : index - 1));
  };

  const handleNextClick = () => {
    setImageIndex((index) => (index === images.length - 1 ? 0 : index + 1));
  };

  return (
    <>
      {/* Carousel Container */}
      <div className="relative h-full w-full overflow-hidden">
        <div
          className="flex h-full w-full transition-transform duration-400 ease-in-out"
          style={{
            transform: `translateX(-${100 * imageIndex}%)`,
          }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image.image_url}
              alt={`carousel-${index}`}
              className="object-cover w-full h-full flex-shrink-0"
            />
          ))}
        </div>
      </div>

      {/* Previous Button */}
      <button
        className="absolute top-0 left-0 h-full w-10 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-20 transition-all"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handlePrevClick();
        }}
      >
        <ChevronLeft strokeWidth={1.5} color="white" />
      </button>

      {/* Next Button */}
      <button
        className="absolute top-0 right-0 h-full w-10 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-20 transition-all"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleNextClick();
        }}
      >
        <ChevronRight strokeWidth={1.5} color="white" />
      </button>
    </>
  );
}
