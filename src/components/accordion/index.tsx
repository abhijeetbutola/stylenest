import { useState } from "react";
import expand from "../../assets/expandicon.svg";
import collapse from "../../assets/collapseicon.svg";
import Button from "../button";
import { InfoItem } from "../product-grid/schema";

type AccordionProps = {
  data: InfoItem[];
};

function Accordion({ data }: AccordionProps) {
  const [open, setOpen] = useState<number[]>([]);

  const handleAccordionButtonClick = (value: number) => {
    const temp = new Set(open);
    if (temp.has(value)) {
      temp.delete(value);
      setOpen([...temp]);
    } else {
      temp.add(value);
      setOpen([...temp]);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      {data?.map((infoItem, index) => (
        <div key={index} className="flex flex-col gap-2">
          <div
            className="flex justify-between items-center cursor-pointer hover:underline"
            onClick={() => handleAccordionButtonClick(index)}
          >
            <span className="text-lg font-medium text-neutral-900">
              {infoItem.title}
            </span>
            <Button>
              <img src={open.includes(index) ? collapse : expand} alt="" />
            </Button>
          </div>

          {
            <div
              className={[
                "text-neutral-600 text-base font-normal",
                !open.includes(index) && "hidden",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {infoItem.description.map((descriptionItem, index) => (
                <div key={index} className="flex gap-2">
                  <span>&#8226;</span>
                  <span>{descriptionItem}</span>
                </div>
              ))}
            </div>
          }
        </div>
      ))}
    </div>
  );
}

export default Accordion;
