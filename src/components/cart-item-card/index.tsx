import { Link } from "react-router-dom";
import Button from "../button";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  CartItem,
  removeItems,
  updateItems,
} from "../../redux/slices/cartSlice";
import { useState } from "react";
import ConfirmModal from "../confirm-modal";

export default function CartItemCard({
  item,
  index,
}: {
  item: CartItem;
  index: number;
}) {
  const [modalOpen, setModalOpen] = useState(false);

  const cartItems = useAppSelector((state) => state.cartItems.items);
  const dispatch = useAppDispatch();

  const handleQuantityButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    const target = e.target as HTMLButtonElement;

    if (cartItems[index].quantity > 1 && target.innerText === "-") {
      const updatedItem = {
        ...cartItems[index],
        quantity: cartItems[index].quantity - 1,
      };
      dispatch(updateItems(updatedItem));
      return;
    }

    if (
      target.innerText === "+" &&
      cartItems[index].list_price != null &&
      cartItems[index].stock > cartItems[index].quantity
    ) {
      const updatedItem = {
        ...cartItems[index],
        quantity: cartItems[index].quantity + 1,
      };
      dispatch(updateItems(updatedItem));
      return;
    }
  };

  const handleRemoveButtonClick = (index: number) => {
    dispatch(removeItems(cartItems[index]));
    setModalOpen(false);
  };

  return (
    <>
      <div className="flex gap-8 min-h-[200px] max-md:flex-wrap">
        <Link
          to={`/product-details-page/${item.product_id}`}
          className="max-md:w-full"
        >
          <img
            src={item.images[0].image_url}
            alt=""
            className="aspect-[7/5] h-[200px] max-sm:w-full w-[280px] object-cover rounded-lg"
          />
        </Link>
        <div className="flex flex-col w-full max-w-[488px] gap-4">
          <div className="text-2xl font-medium">{item.name}</div>
          <div>
            {item.size ? (
              <span>
                {item.color[0].toUpperCase() + item.color.slice(1)}
                {item.size !== "N/A" && " · " + String(item.size).toUpperCase()}
              </span>
            ) : (
              <span>{item.color[0].toUpperCase() + item.color.slice(1)}</span>
            )}
          </div>
          <div className="text-sm text-neutral-600">{item.description}</div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="flex h-9 w-[125px] justify-around items-center border-[1px] border-neutral-200 bg-neutral-50 rounded-md text-neutral-600">
                <Button
                  className="h-full flex-1"
                  onClick={(e) => handleQuantityButtonClick(e, index)}
                >
                  -
                </Button>
                <span className="flex-1 m-auto text-center">
                  {item.quantity}
                </span>
                <Button
                  className="h-full flex-1"
                  onClick={(e) => handleQuantityButtonClick(e, index)}
                >
                  +
                </Button>
              </div>
              <Button
                className="font-medium text-sm text-neutral-600"
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                Remove
              </Button>
              <ConfirmModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
              >
                <div className="flex flex-col items-center justify-center gap-8">
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold text-lg text-neutral-900">
                      Confirm Item Removal
                    </p>
                    <p className="font-normal text-sm text-neutral-600">
                      Are you sure you want to remove this item from you
                      shopping cart?
                    </p>
                  </div>
                  <div className="flex gap-3 w-full font-medium">
                    <Button
                      className="flex-1 py-2.5 rounded-[4px] shadow-md"
                      onClick={() => setModalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="border border-black flex-1 bg-indigo-700 hover:bg-indigo-800 text-white py-2.5 rounded-[4px]"
                      onClick={() => handleRemoveButtonClick(index)}
                    >
                      Yes
                    </Button>
                  </div>
                </div>
              </ConfirmModal>
            </div>
            <span className="font-medium text-lg text-neutral-900">
              ${item.totalPrice}
            </span>
          </div>
        </div>
      </div>
      {index + 1 < cartItems.length && (
        <hr className="border-t-2 border-neutral-300 border-dotted" />
      )}
    </>
  );
}
