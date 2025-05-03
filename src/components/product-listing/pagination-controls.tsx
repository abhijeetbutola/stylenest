import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "../button";

export function PaginationControls({
  page,
  totalPages,
  goToPage,
}: {
  page: number;
  totalPages: number;
  goToPage: (n: number) => void;
}) {
  return (
    <div className="flex justify-center items-center gap-2 md:gap-3">
      {page > 1 && (
        <Button
          className="flex justify-center items-center border-[1px] border-neutral-200 rounded py-2 md:py-3 px-1.5 md:px-[18px] cursor-pointer bg-white hover:bg-opacity-50 hover:bg-indigo-200 text-sm transition-all"
          onClick={() => goToPage(page - 1)}
        >
          <ChevronLeft size={15} />{" "}
          <span className="hidden md:block">Prev</span>
        </Button>
      )}
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          className={[
            "border-[1px] border-neutral-200 py-3 px-3 md:px-[18px] rounded text-sm bg-white hover:bg-indigo-200 hover:bg-opacity-50 transition-all",
            index + 1 === page &&
              "border-none outline outline-indigo-700 hover:bg-white",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={() => goToPage(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      {page < totalPages && (
        <Button
          className="flex justify-center items-center border-[1px] border-neutral-200 rounded py-2 md:py-3 px-1.5 md:px-[18px] cursor-pointer bg-white hover:bg-opacity-50 hover:bg-indigo-200 text-sm transition-all"
          onClick={() => goToPage(page + 1)}
        >
          <span className="hidden md:block">Next</span>{" "}
          <ChevronRight size={15} />
        </Button>
      )}
    </div>
  );
}
