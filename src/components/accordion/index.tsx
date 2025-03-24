import { useState } from "react";
import expand from "../../assets/icons/expandicon.svg";
import collapse from "../../assets/icons/collapseicon.svg";
import Button from "../button";
import { InfoItem } from "../product-grid/schema";
import { motion, AnimatePresence } from "framer-motion";

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
      {data?.map((infoItem, index) => {
        return (
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
            <AnimatePresence>
              {open.includes(index) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    height: "auto",
                    opacity: 1,
                  }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className=" text-neutral-600 text-base font-normal"
                >
                  {infoItem.description.map((descriptionItem, index) => (
                    <div key={index} className="flex gap-2">
                      <span>&#8226;</span>
                      <span>{descriptionItem}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default Accordion;
