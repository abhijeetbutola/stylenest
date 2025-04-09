import Container from "../../components/container";
import orderSuccessImage from "../../assets/ordersuccessimage.png";
import { useEffect, useState } from "react";
import { Order } from "./types";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import CopyToClipboard from "../../components/copy-on-click";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setHasCheckedOut } from "../../redux/slices/cartSlice";

function OrderSuccessPage() {
  const [orders, setOrders] = useState<Order | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const hasCheckedOut = useAppSelector(
    (state) => state.cartItems.hasCheckedOut
  );
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (!hasCheckedOut) navigate("/");
  }, [hasCheckedOut, navigate]);

  useEffect(() => {
    return () => {
      dispatch(setHasCheckedOut(false));
    };
  }, [dispatch]);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://www.greatfrontend.com/api/projects/challenges/e-commerce/order-sample"
        );
        if (!response.ok) throw new Error("Unable to fetch data");
        const result = await response.json();
        setOrders(result);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setError((e as Error).message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return <Container className="h-screen">Loading data...</Container>;
  if (error) return <div>{error}</div>;

  return (
    <Container className="grid lg:grid-cols-2 gap-8 py-16 px-4 lg:p-24">
      <div className="rounded-md overflow-hidden">
        <img
          src={orderSuccessImage}
          alt=""
          className="object-cover w-full h-[420px] lg:h-full"
        />
      </div>
      {orders && (
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <p className="text-neutral-900 font-semibold text-4xl">
              Your order is confirmed!
            </p>
            <p className="text-neutral-600 text-base font-normal">
              Your order is now in the queue and is now being processed. We'll
              let you know when we ship it out!
            </p>
          </div>
          <div>
            <p className="font-normal text-neutral-600 text-base">
              Order number
            </p>
            <div className="flex gap-1.5">
              <p className="font-medium text-indigo-700 text-base">
                {orders.order_id}
              </p>
              <CopyToClipboard value={orders.order_id} />
            </div>
          </div>
          <div>
            <div className="flex flex-col lg:max-h-[700px] overflow-auto">
              {orders.items.map((item, index) => {
                return (
                  <div key={index}>
                    <div className="flex gap-6">
                      <div>
                        <img
                          src={item.unit.image_url}
                          className="object-cover h-20 w-20 rounded-lg"
                        />
                      </div>
                      <div className="flex-1 flex flex-col gap-2">
                        <div className="font-medium text-xl text-neutral-900">
                          {item.product.name}
                        </div>
                        <div className="font-medium text-base text-neutral-600">
                          {item.unit.size ? (
                            <span>
                              {item.unit.color[0].toUpperCase() +
                                item.unit.color.slice(1)}
                              {item.unit.size !== "N/A" &&
                                " · " + String(item.unit.size).toUpperCase()}
                            </span>
                          ) : (
                            <span>
                              {item.unit.color[0].toUpperCase() +
                                item.unit.color.slice(1)}
                            </span>
                          )}
                        </div>
                        <div className="font-medium text-base text-neutral-600">
                          Quantity: {item.quantity}
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-lg text-neutral-900">
                          ${item.unit.sale_price}
                        </div>
                        <div className="font-normal text-lg text-neutral-600">
                          {item.unit.list_price > item.unit.sale_price ? (
                            <s>${item.unit.list_price}</s>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                    {index + 1 < orders.items.length && (
                      <hr className="border-t-2 border-neutral-300 border-dotted my-8" />
                    )}
                  </div>
                );
              })}
            </div>
            <hr className="border-t-2 border-neutral-300 border-dotted my-8" />
            <div className="flex flex-col gap-6">
              <div className="flex justify-between">
                <span className="text-base text-neutral-600">Subtotal</span>
                <span className="font-semibold text-lg text-neutral-900">
                  ${orders.summary.subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-base text-neutral-600">Shipping</span>
                <span className="font-semibold text-lg text-neutral-900">
                  {orders.summary.shipping || "FREE"}
                </span>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-4 items-center">
                  <span className="text-base text-neutral-600">
                    Coupon discount
                  </span>
                  <span className="font-normal text-sm text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-full px-2.5 py-1">
                    {orders.summary.discount_code}
                  </span>
                </div>
                <span className="font-semibold text-lg text-neutral-900">
                  -${orders.summary.discount.toFixed(2)}
                </span>
              </div>
            </div>
            <hr className="border-t-2 border-neutral-300 border-dotted my-8" />
            <div className="flex justify-between items-center">
              <span className="text-neutral-900 font-normal text-base">
                Total
              </span>
              <span className="font-semibold text-2xl text-neutral-900">
                ${orders.summary.total.toFixed(2)}
              </span>
            </div>
            <div className="mt-8 grid md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-4 text-neutral-600 font-normal">
                <p className="text-base">Shipping address</p>
                <div className="text-sm">
                  <p>{orders.shipping_details.phone}</p>
                  <p>{orders.shipping_details.address.line1}</p>
                  <p>{orders.shipping_details.address.line2 || ""}</p>
                  <p>
                    {orders.shipping_details.address.city},{" "}
                    {orders.shipping_details.address.state},{" "}
                    {orders.shipping_details.address.zip}
                  </p>
                  <p>{orders.shipping_details.address.country}</p>
                </div>
              </div>
              <div className="flex flex-col gap-4 text-neutral-600 font-normal">
                <p className="text-base">Payment</p>
                <div className="flex gap-4 text-sm">
                  <span>VISA</span>
                  <div className="flex flex-col">
                    <span>Ending with {orders.payment_method.last_4}</span>
                    <span>
                      Expires {String(orders.payment_method.exp_month)} /
                      {String(orders.payment_method.exp_year).slice(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link
            to={"/"}
            className="flex justify-center items-center gap-1.5 rounded-[4px] w-full border border-neutral-200 bg-white hover:bg-neutral-100 transition-all shadow-md py-2.5"
          >
            Continue Shopping
            <ArrowRight />
          </Link>
        </div>
      )}
    </Container>
  );
}

export default OrderSuccessPage;
