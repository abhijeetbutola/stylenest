import Container from "../../components/container";
import orderSuccessImage from "../../assets/ordersuccessimage.png";
import { useEffect, useState } from "react";
import { Order } from "./types";

function OrderSuccessPage() {
  const [orders, setOrders] = useState<Order | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  if (loading) return <div>Loading data...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container className="grid grid-cols-2 gap-8 p-24">
      <div>
        <img
          src={orderSuccessImage}
          alt=""
          className="object-cover w-full h-full"
        />
      </div>
      {orders && (
        <div className="flex flex-col gap-12">
          <div>
            <p>Your order is confirmed!</p>
            <p>
              Your order is now in the queue and is now being processed. We'll
              let you know when we ship it out!
            </p>
          </div>
          <div>
            <p>Order number</p>
            <p>{orders.order_id}</p>
          </div>
          <div>
            {orders.items.map((item, index) => (
              <div key={index}>
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={item.unit.image_url}
                    alt=""
                    className="h-20 w-20 object-cover"
                  />
                </div>
                <div>
                  <p>{item.product.name}</p>
                  <p></p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div>
              <span>Subtotal</span>
              <span>{orders.summary.subtotal}</span>
            </div>
            <div>
              <span>Shipping</span>
              <span>{orders.summary.shipping}</span>
            </div>
            <div>
              <span>Coupon discount</span>
              <span>{orders.summary.discount_code}</span>
              <span>{orders.summary.discount}</span>
            </div>
          </div>
          <div>
            <span>Total</span>
            <span>{orders.summary.total}</span>
          </div>
          <div></div>
        </div>
      )}
    </Container>
  );
}

export default OrderSuccessPage;
