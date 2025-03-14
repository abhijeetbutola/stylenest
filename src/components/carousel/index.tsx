import { useEffect, useRef, useState } from "react";
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
  const [loadedImages, setLoadedImages] = useState(new Set([0]));

  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const index = Number(img.dataset.index);
            if (!loadedImages.has(index)) {
              img.src = img.dataset.src || "";
              setLoadedImages((prev) => new Set([...prev, index]));
            }
          }
        });
      },
      { root: null, threshold: 0.1 }
    );

    imageRefs.current.forEach((img) => {
      if (img) observer.observe(img);
    });

    return () => observer.disconnect();
  }, [loadedImages]);

  useEffect(() => {
    const firstImg = imageRefs.current[0];
    if (firstImg && !firstImg.src) {
      firstImg.src = firstImg.dataset.src || "";
    }
  }, []);

  const handleImageChange = (newIndex: number) => {
    setImageIndex(newIndex);
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
            <div
              key={index}
              className="relative h-[300px] md:w-[280px] w-full flex-shrink-0"
            >
              {/* Blurred Placeholder */}
              <div
                className={`absolute inset-0 bg-gray-200 animate-pulse ${
                  loadedImages.has(index) ? "hidden" : "block"
                }`}
              ></div>
              <img
                ref={(el) => (imageRefs.current[index] = el)}
                data-src={image.image_url}
                data-index={index}
                alt={`carousel-${index}`}
                className={`object-cover h-[300px] md:w-[280px] w-full flex-shrink-0 transition-opacity duration-500  ${
                  loadedImages.has(index) ? "opacity-100" : "opacity-0"
                }`}
                loading="lazy"
              />
            </div>
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
          handleImageChange(
            imageIndex === 0 ? images.length - 1 : imageIndex - 1
          );
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
          handleImageChange(
            imageIndex === images.length - 1 ? 0 : imageIndex + 1
          );
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
