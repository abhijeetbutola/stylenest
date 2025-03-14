import { useState } from "react";
import { Image } from "../product-grid/schema";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "../button";

type ImageCarouselProps = {
  images: Image[];
  isHovering: boolean;
};

export default function ImageCarousel({
  images,
  isHovering,
}: ImageCarouselProps) {
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
              className="object-cover h-[300px] md:w-[280px] w-full flex-shrink-0"
              loading="lazy"
            />
          ))}
        </div>
      </div>

      {/* Previous Button */}
      <button
        className={[
          "absolute top-0 left-0 h-full w-10 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-20 transition-all opacity-0",
          isHovering && "opacity-100",
        ]
          .filter(Boolean)
          .join(" ")}
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
        className={[
          "absolute top-0 right-0 h-full w-10 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-20 transition-all opacity-0",
          isHovering && "opacity-100",
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleNextClick();
        }}
      >
        <ChevronRight strokeWidth={1.5} color="white" />
      </button>

      {/* Image dots */}
      <div
        className={[
          "absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 bg-gray-400/40 p-1 rounded-full opacity-0 transition-all",
          isHovering && "opacity-100",
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {Array(images.length)
          .fill(0)
          .map((_, index) => (
            <Button
              key={index}
              className={[
                "h-2 w-2 rounded-full bg-white scale-100 hover:scale-125 transition-all",
                imageIndex === index &&
                  "!bg-indigo-700/80 outline outline-1 outline-white outline-offset-1",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => {
                setImageIndex(index);
              }}
            ></Button>
          ))}
      </div>
    </>
  );
}
