import { useEffect, useState } from "react";

type ProgressBarProps = {
  count: number;
  totalReviews: number;
};

function ProgressBar({ count, totalReviews }: ProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
        }
        return Math.min(prev + 5, count);
      });
    }, 50);

    return () => {
      clearInterval(timer);
    };
  }, [count]);

  return (
    <div className="bg-gray-200 h-2 w-[142px] overflow-hidden rounded-full">
      <div
        className="bg-blue-500 h-full origin-left transition-all"
        style={{ transform: `scaleX(${(progress / totalReviews) * 100}%)` }}
      ></div>
    </div>
  );
}

export default ProgressBar;
