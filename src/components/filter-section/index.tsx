import { useState } from "react";
import StarRating from "../star-rating";
import { toggleCollection } from "../../redux/slices/collectionsSlice";
import { toggleGender } from "../../redux/slices/gendersSlice";
import Button from "../button";
import expandIcon from "../../assets/filtersectionexpandicon.svg";
import contractIcon from "../../assets/contracticon.svg";
import { useAppDispatch, useAppSelector } from "../../hooks";

type DataType = {
  name: string;
  apiKey?: string;
  code?: string;
};

type Data = {
  title: string;
  types: DataType[] | number[];
  showCheckbox?: boolean;
};

type FilterSectionProps = {
  data: Data[];
};

const FilterSection: React.FC<FilterSectionProps> = ({ data }) => {
  const [open, setOpen] = useState<number[]>([]);
  const dispatch = useAppDispatch();
  const selectedCollections = useAppSelector(
    (state) => state.collections.selectedCollections
  );
  const selectedGenders = useAppSelector(
    (state) => state.genders.selectedGenders
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
    const buttonName = e.currentTarget.name;
    console.log("Color button clicked:", buttonName);
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
    <div className="flex flex-col gap-6">
      {data.map((item, index) => (
        <div key={index}>
          <div
            className="flex justify-between items-center mb-6 cursor-pointer"
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
                  className={`h-4 w-4 rounded-full bg-${type.code} inline-block border-[1px] cursor-pointer`}
                  name={type.name}
                  onClick={handleColorClick}
                />
              ))}
            </div>
          )}
          {item.title === "Rating" && (
            <div
              className={[!open.includes(index) && "hidden"]
                .filter(Boolean)
                .join(" ")}
            >
              {(item.types as number[]).map((rating, idx) => (
                <div key={idx}>
                  <StarRating stars={5} rating={rating} />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FilterSection;
