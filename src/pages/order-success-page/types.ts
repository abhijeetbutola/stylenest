export type Order = {
  order_id: string;
  items: OrderItem[];
  summary: OrderSummary;
  shipping_details: ShippingDetails;
  payment_method: PaymentMethod;
};

export type OrderItem = {
  product: {
    product_id: string;
    name: string;
  };
  unit: {
    sku: string;
    list_price: number;
    sale_price: number;
    size: string;
    color: string;
    image_url: string;
  };
  total_list_price: number;
  total_sale_price: number;
  quantity: number;
  created_at: string; // could also use `Date` if you're parsing it
};

export type OrderSummary = {
  subtotal: number;
  discount: number;
  discount_code: string;
  shipping: number;
  total: number;
};

export type ShippingDetails = {
  address: {
    line1: string;
    line2: string | null;
    city: string;
    state: string;
    zip: number;
    country: string;
  };
  phone: string;
};

export type PaymentMethod = {
  type: string; // You could restrict to "VISA" | "MASTERCARD" etc.
  last_4: string;
  exp_month: number;
  exp_year: number;
};
