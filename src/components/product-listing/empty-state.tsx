import Button from "../button";
import tshirtIcon from "../../assets/icons/tshirticon.svg";
import {
  resetCollection,
  resetGender,
  resetColor,
  resetRating,
} from "../../redux/slices/";

export default function EmptyState() {
  return (
    <div className="h-full flex flex-col justify-center items-center gap-5">
      <div className="rounded-full p-3 shadow-md">
        <img src={tshirtIcon} />
      </div>
      <div className="flex flex-col gap-2 items-center">
        <p className="font-medium text-xl text-neutral-900">
          Nothing found just yet
        </p>
        <p className="text-base text-neutral-900 font-normal">
          Adjust your filters a bit, and let's see what we can find!
        </p>
      </div>
      <Button
        type="button"
        className="bg-indigo-700 hover:bg-indigo-800 px-[18px] py-2.5 text-base font-medium rounded text-white"
        onClick={() => {
          resetCollection();
          resetGender();
          resetColor();
          resetRating();
        }}
      >
        Reset filters
      </Button>
    </div>
  );
}
