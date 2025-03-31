import { useState } from "react";
import StarRating from "../star-rating";
import {
  resetCollection,
  toggleCollection,
} from "../../redux/slices/collectionsSlice";
import { resetGender, toggleGender } from "../../redux/slices/gendersSlice";
import { resetColor, toggleColor } from "../../redux/slices/colorsSlice";
import Button from "../button";
import expandIcon from "../../assets/icons/filtersectionexpandicon.svg";
import contractIcon from "../../assets/icons/contracticon.svg";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchProducts } from "../../redux/slices/productsSlice";
import { accObj as data } from "../../pages/product-listing-page/accordionItems";
import { resetRating, toggleRating } from "../../redux/slices/ratingsSlice";

type DataType = {
  name: string;
  apiKey?: string;
  code?: string;
};

const FilterSection = () => {
  const [open, setOpen] = useState<number[]>([]);
  const dispatch = useAppDispatch();
  const selectedCollections = useAppSelector(
    (state) => state.collections.selectedCollections
  );
  const selectedGenders = useAppSelector(
    (state) => state.genders.selectedGenders
  );
  const selectedColors = useAppSelector((state) => state.colors.selectedColors);
  const selectedRatings = useAppSelector(
    (state) => state.ratings.selectedRatings
  );

  const filterCount = useAppSelector(
    (state) =>
      (state.collections.selectedCollections.length || 0) +
      (state.genders.selectedGenders.length || 0) +
      (state.colors.selectedColors.length || 0) +
      (state.ratings.selectedRatings.length || 0)
  );

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkboxValue = e.target.name;
    if (
      checkboxValue === "unisex" ||
      checkboxValue === "women" ||
      checkboxValue === "men"
    ) {
      dispatch(toggleGender(checkboxValue));
    } else {
      dispatch(toggleCollection(checkboxValue));
    }
  };

  const handleColorClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const colorName = e.currentTarget.name;
    dispatch(toggleColor(colorName));
    dispatch(fetchProducts({ page: 1, per_page: 9 }));
  };

  const handleRatingClick = (rating: number) => {
    dispatch(toggleRating(rating));

    dispatch(fetchProducts({ page: 1, per_page: 9 }));
  };

  const handleAccordionClick = (value: number) => {
    setOpen((prev) => {
      const temp = new Set(prev);
      if (temp.has(value)) {
        temp.delete(value);
      } else {
        temp.add(value);
      }
      return Array.from(temp);
    });
  };

  return (
    <div>
      <div className="flex flex-col gap-6">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col gap-6">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => handleAccordionClick(index)}
            >
              <div className="font-medium text-neutral-900 text-base">
                {item.title}
              </div>
              <img
                src={open.includes(index) ? contractIcon : expandIcon}
                alt=""
              />
            </div>
            {(item.title === "Collections" || item.title === "Category") && (
              <div
                className={[
                  "flex flex-col gap-6",
                  !open.includes(index) && "hidden",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {(item.types as DataType[]).map((type, idx) => (
                  <div
                    key={idx}
                    className="flex gap-3 items-center font-normal text-neutral-600 text-base"
                  >
                    <div className="px-1">
                      <label>
                        <input
                          type="checkbox"
                          name={type.apiKey}
                          checked={
                            selectedCollections.includes(type.apiKey || "") ||
                            selectedGenders.includes(type.apiKey || "")
                          }
                          onChange={handleCheckboxChange}
                        />
                      </label>
                    </div>
                    <span>{type.name}</span>
                  </div>
                ))}
              </div>
            )}
            {item.title === "Colors" && (
              <div
                className={[
                  "flex gap-4 p-1 flex-wrap",
                  !open.includes(index) && "hidden",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {(item.types as DataType[]).map((type, idx) => (
                  <Button
                    key={idx}
                    className={`h-4 w-4 rounded-full bg-${
                      type.code
                    } inline-block border-[1px] cursor-pointer ${
                      selectedColors.includes(type.name)
                        ? "outline outline-indigo-700"
                        : ""
                    }`}
                    name={type.name}
                    onClick={handleColorClick}
                  />
                ))}
              </div>
            )}
            {item.title === "Rating" && (
              <div
                className={[
                  "flex flex-col gap-6",
                  !open.includes(index) && "hidden",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {(item.types as number[]).map((rating, idx) => (
                  <div key={idx} onClick={() => handleRatingClick(rating)}>
                    <StarRating
                      stars={5}
                      rating={rating}
                      selected={selectedRatings.includes(rating)}
                    />
                  </div>
                ))}
              </div>
            )}
            {index + 1 < data.length && (
              <hr className="border-t-[1px] border-neutral-300" />
            )}
          </div>
        ))}
      </div>
      {!!filterCount && (
        <>
          <hr className="border-t-[1px] border-neutral-300 my-6" />
          <div className="text-center">
            <Button
              type="button"
              className="text-indigo-700 font-medium text-base disabled:text-neutral-400 disabled:cursor-not-allowed"
              disabled={!filterCount}
              onClick={() => {
                dispatch(resetCollection());
                dispatch(resetGender());
                dispatch(resetColor());
                dispatch(resetRating());
              }}
            >
              Clear all ({filterCount})
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default FilterSection;
