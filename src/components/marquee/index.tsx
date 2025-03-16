import { useCallback, useEffect, useRef, useState } from "react";

export default function Marquee({ images }: { images: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [multiplier, setMultiplier] = useState(1);

  const calculateMultiplier = useCallback(() => {
    if (!containerRef.current || !marqueeRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const contentWidth = marqueeRef.current.getBoundingClientRect().width;

    if (contentWidth < containerWidth)
      setMultiplier(Math.ceil((containerWidth * 3) / contentWidth));
    else setMultiplier(1);
  }, []);

  useEffect(() => {
    calculateMultiplier();

    const handleResize = () => calculateMultiplier();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [calculateMultiplier]);

  return (
    <div
      ref={containerRef}
      className="relative w-full whitespace-nowrap flex items-center overflow-hidden marquee-container"
    >
      <div className="flex min-w-min shrink-0 marquee-content">
        <div ref={marqueeRef} className="flex min-w-min shrink-0">
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`brand-${index}`}
              className="h-24 w-auto object-contain shrink-0 px-8"
            />
          ))}
        </div>
        {Array(multiplier - 1)
          .fill(images)
          .flat()
          .map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`brand-${index}`}
              className="h-24 w-auto object-contain shrink-0 px-8"
            />
          ))}
        {Array(multiplier)
          .fill(images)
          .flat()
          .map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`brand-${index}`}
              className="h-24 w-auto object-contain shrink-0 px-8"
            />
          ))}
      </div>
    </div>
  );
}
