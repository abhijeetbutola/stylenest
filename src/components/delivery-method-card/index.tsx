import Button from "../button";
import checkoutTick from "../../assets/icons/checkouttick.svg";

type DeliveryType = "standard" | "express";

type DeliveryMethodCardProps = {
  title: string;
  deliveryType: string;
  onCardClick: (type: DeliveryType) => void;
};

export default function DeliveryMethodCard({
  title,
  deliveryType,
  onCardClick,
}: DeliveryMethodCardProps) {
  return (
    <>
      <Button
        type="button"
        className={[
          "flex-1 h-[120px] flex flex-col gap-2 p-4 rounded-lg border-[1.5px] text-left",
          deliveryType === title.toLowerCase() && "border-indigo-700",
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={() => onCardClick(title.toLowerCase() as DeliveryType)}
      >
        <div className="w-full">
          <div className="flex justify-between items-center">
            <span className="font-medium text-base text-neutral-900">
              {title}
            </span>
            {deliveryType === title.toLowerCase() && (
              <img src={checkoutTick} alt="" />
            )}
          </div>
          <div className="font-normal text-sm text-neutral-600">
            {title === "Standard" ? "4-10 business days" : "2-5 business days"}
          </div>
        </div>
        <div className="font-medium text-base text-neutral-900">
          {title === "Standard" ? "FREE" : "$15.00"}
        </div>
      </Button>
    </>
  );
}
