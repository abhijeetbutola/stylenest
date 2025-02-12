import { Specification } from "../product-specification/data";
import Button from "../button";
import { useState } from "react";

type TabFeatures = {
  tabFeatures: Specification[];
};

function Tabs({ tabFeatures }: TabFeatures) {
  const [current, setCurrent] = useState(0);

  const handleTabClick = (index: number) => {
    setCurrent(index);
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="w-full max-sm:w-[280px] overflow-x-scroll overflow-y-hidden">
        <div className="flex border-b-[1px] border-neutral-300 pb-3">
          {tabFeatures.map((item: Specification, index: number) => {
            return (
              <div key={index} className="relative flex flex-col">
                <Button
                  className={[
                    "px-4 font-medium",
                    current === index && "text-indigo-700",
                  ].join(" ")}
                  onClick={() => handleTabClick(index)}
                >
                  {item.feature}
                </Button>
                <span
                  className={
                    current === index
                      ? "absolute top-[33px] h-1 w-full border-b-[1px] border-indigo-700"
                      : ""
                  }
                ></span>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        {tabFeatures.map((item, index) => {
          return (
            <div key={index} className="flex-1 flex">
              {current === index && (
                <div className="flex-1 flex max-lg:flex-col gap-8">
                  <div className="max-lg:flex-1 flex rounded-md overflow-hidden">
                    <img
                      className="object-cover w-full"
                      src={item.image}
                      alt="product-image"
                    />
                  </div>
                  <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                      <p className="font-medium text-2xl text-neutral-900">
                        {item.descriptionHeading}
                      </p>
                      <p className="text-base text-neutral-600">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-8">
                      {item.points.map((point, index) => {
                        return (
                          <div key={index} className=" flex gap-4 items-center">
                            <span className="flex p-3 rounded-full border-2 border-gray-300">
                              <img src={point.icon} alt="" />
                            </span>
                            <p>{point.label}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Tabs;
