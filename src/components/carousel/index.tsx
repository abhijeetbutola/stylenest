import { useState } from 'react'
import { Image } from '../product-grid/schema';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type ImageCarouselProps = {
  images: Image[]
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [imageIndex, setImageIndex] = useState(0)

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setImageIndex((index) => (index + 1) % images.length);
  //   }, 3000);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, [images.length]);

  const handlePrevClick = () => {
    setImageIndex((index) => {
      if(imageIndex === 0) {
        return images.length - 1
      }
      return index - 1
  })
  }

  const handleNextClick = () => {
    setImageIndex((index) => {
      if(imageIndex === images.length - 1) {
        return 0
      }
      return index + 1
    })
  }

  return (
    <>
    <div className='relative'>
      <div className='flex overflow-hidden'>
      {images.map((image, index) => {
        return (
        <img
         key={index} src={image.image_url} className="object-cover aspect-[14/15]"
         style={{translate: `${-100 * imageIndex}%`, transition: 'translate 400ms ease-in-out'}}
         />
      )
      })}
      </div>
      <button
       className='absolute top-0 left-0 h-full hover:bg-gray-500 hover:bg-opacity-75 transition-all' 
       onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        handlePrevClick()
      }}
      >
        <ChevronLeft strokeWidth={1.5} color='white' />
      </button>
      <button
       className='absolute top-0 right-0 h-full hover:bg-gray-500 hover:bg-opacity-50 transition-all'
       onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        handleNextClick()
       }}
      >
        <ChevronRight strokeWidth={1.5} color='white' />
      </button>
    </div>
    {/* <button onClick={()=>setAutoplay(!autoplay)}>Autoplay</button> */}
    </>
  );
}
