import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm, Controller, FieldErrors } from "react-hook-form";
import Button from "../../components/button";
import Dropdown from "../../components/dropdown";
import lockIcon from "../../assets/lockordericon.svg";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppSelector } from "../../hooks";
import DeliveryMethodCard from "../../components/delivery-method-card";

const options = [
  "United States",
  "Canada",
  "United Kingdom",
  "Germany",
  "France",
  "Italy",
  "Spain",
  "Netherlands",
  "Australia",
  "Japan",
  "China",
  "India",
  "Brazil",
  "Mexico",
  "South Korea",
  "Singapore",
  "United Arab Emirates",
  "South Africa",
];

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  country: z.string().min(1),
  address: z.string().min(1, "Address is required"),
  apartment: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().regex(/^\d{5}$/, "ZIP code must be exactly 5 digits"),
  deliveryType: z.enum(["standard", "express"]),
  cardnumber: z
    .string()
    .regex(/^\d{16}$/, "Card number must be exactly 16 digits"),
  nameoncard: z.string().min(1, "Name on card is required"),
  expdate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Invalid expiry date (MM/YY)"),
  cvv: z.string().regex(/^\d{3}$/, "CVV must be exactly 3 digits"),
});

type FormFields = z.infer<typeof formSchema>;

type DeliveryType = "standard" | "express";

function Checkout() {
  const [deliveryType, setDeliveryType] = useState("standard");

  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      deliveryType: "standard",
    },
  });

  const cartItems = useAppSelector((state) => state.cartItems.items);
  const totalAmount = useAppSelector((state) => state.cartItems.totalAmount);
  const [open, setOpen] = useState(false);

  const handleDropdownClick = () => {
    setOpen(!open);
  };

  const onDeliveryTypeChange = (type: DeliveryType) => {
    setDeliveryType(type);
    setValue("deliveryType", type);
  };

  const onSubmit = (data: FormFields) => {
    console.log(data);
  };

  const onError = (errors: FieldErrors) => {
    console.error("Form submission errors:", errors);
  };

  return (
    <div className="bg-white py-12 px-3 md:py-16 md:px-4 lg:p-24 flex-1 max-w-[1408px] mx-4 rounded-t-lg">
      <div className="flex flex-col gap-8 mx-4">
        <div className="text-sm font-medium text-indigo-700 hover:text-indigo-500">
          <Link to={"/cart"}>&#8249; Back to Shopping Cart</Link>
        </div>
        <div className="text-4xl font-semibold text-neutral-900">Checkout</div>
        <div className="flex gap-8 flex-wrap">
          <form className="lg:flex-1 max-lg:w-full flex flex-col gap-6">
            <div className="font-medium text-lg text-neutral-600">
              Contact Information
            </div>
            <div className="flex-1 flex flex-col gap-1.5">
              <label className="font-medium text-sm text-neutral-700">
                Email
              </label>
              <input
                {...register("email")}
                type="text"
                placeholder="user@example.com"
                className="block bg-neutral-50 border-neutral-200 border-[1.5px] rounded-[4px] w-full h-10 px-3.5 py-2.5 font-normal text-sm text-neutral-500"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>
            <hr className="border-b border-neutral-200" />
            <div className="flex flex-col gap-6">
              <div className="font-medium text-lg text-neutral-600">
                Shipping Information
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <label className="font-medium text-sm text-neutral-700">
                  Country/Region
                </label>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Dropdown
                        data={options}
                        open={open}
                        setOpen={handleDropdownClick}
                        onChange={field.onChange}
                        type="click"
                        selectedOption={field.value}
                        titleClassName="flex items-center border-[1.5px] rounded-[4px] h-10 w-full bg-neutral-50 px-3.5 py-2.5 font-normal text-sm text-neutral-500"
                        optionsClassName="flex flex-col absolute top-11 border-2 bg-white w-full shadow-lg max-h-60 overflow-y-auto z-10 rounded-md"
                      >
                        {field.value || "Select a country"}
                      </Dropdown>
                    );
                  }}
                />
                {errors.country && (
                  <span className="text-red-500 text-sm">
                    {errors.country.message}
                  </span>
                )}
              </div>
              <div className="flex gap-8">
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="font-medium text-sm text-neutral-700">
                    First name
                  </label>
                  <input
                    {...register("firstname")}
                    type="text"
                    placeholder="John"
                    className="block bg-neutral-50 border-neutral-200 border-[1.5px] rounded-[4px] w-full h-10 px-3.5 py-2.5 font-normal text-sm text-neutral-500"
                  />
                  {errors.firstname && (
                    <span className="text-red-500 text-sm">
                      {errors.firstname.message}
                    </span>
                  )}
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="font-medium text-sm text-neutral-700">
                    Last name
                  </label>
                  <input
                    {...register("lastname")}
                    type="text"
                    placeholder="Doe"
                    className="block bg-neutral-50 border-neutral-200 border-[1.5px] rounded-[4px] w-full h-10  px-3.5 py-2.5 font-normal text-sm text-neutral-500"
                  />
                  {errors.lastname && (
                    <span className="text-red-500 text-sm">
                      {errors.lastname.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <label className="font-medium text-sm text-neutral-700">
                  Address
                </label>
                <div className="flex flex-col gap-4">
                  <input
                    {...register("address")}
                    type="text"
                    placeholder="Street address"
                    className="block bg-neutral-50 border-neutral-200 border-[1.5px] rounded-[4px] w-full h-10 px-3.5 py-2.5 font-normal text-sm text-neutral-500"
                  />
                  {errors.address && (
                    <span className="text-red-500 text-sm">
                      {errors.address.message}
                    </span>
                  )}
                  <input
                    {...register("apartment")}
                    type="text"
                    placeholder="Apartment, suite, etc (optional)"
                    className="block bg-neutral-50 border-neutral-200 border-[1.5px] rounded-[4px] w-full h-10 px-3.5 py-2.5 font-normal text-sm text-neutral-500"
                  />
                  {errors.apartment && (
                    <span className="text-red-500 text-sm">
                      {errors.apartment.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-8">
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="font-medium text-sm text-neutral-700">
                    City
                  </label>
                  <input
                    {...register("city")}
                    type="text"
                    placeholder="City"
                    className="block bg-neutral-50 border-neutral-200 border-[1.5px] rounded-[4px] w-full h-10 px-3.5 py-2.5 font-normal text-sm text-neutral-500"
                  />
                  {errors.city && (
                    <span className="text-red-500 text-sm">
                      {errors.city.message}
                    </span>
                  )}
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="font-medium text-sm text-neutral-700">
                    State
                  </label>
                  <input
                    {...register("state")}
                    type="text"
                    placeholder="State"
                    className="block bg-neutral-50 border-neutral-200 border-[1.5px] rounded-[4px] w-full h-10 px-3.5 py-2.5 font-normal text-sm text-neutral-500"
                  />
                  {errors.state && (
                    <span className="text-red-500 text-sm">
                      {errors.state.message}
                    </span>
                  )}
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="font-medium text-sm text-neutral-700">
                    Zip
                  </label>
                  <input
                    {...register("zip")}
                    type="text"
                    placeholder="12345"
                    className="block bg-neutral-50 border-neutral-200 border-[1.5px] rounded-[4px] w-full h-10 px-3.5 py-2.5 font-normal text-sm text-neutral-500"
                  />
                  {errors.zip && (
                    <span className="text-red-500 text-sm">
                      {errors.zip.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <hr className="border-b border-neutral-200" />
            <div className="flex-1 flex flex-col gap-6">
              <div className="font-medium text-lg text-neutral-600">
                Delivery Method
              </div>
              <div className="flex gap-4">
                <DeliveryMethodCard
                  title="Standard"
                  deliveryType={deliveryType}
                  onCardClick={onDeliveryTypeChange}
                />
                <DeliveryMethodCard
                  title="Express"
                  deliveryType={deliveryType}
                  onCardClick={onDeliveryTypeChange}
                />
              </div>
            </div>
            <hr className="border-b border-neutral-200" />
            <div className="flex flex-col gap-6">
              <div className="font-medium text-lg text-neutral-600">
                Payment method
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <label className="font-medium text-sm text-neutral-700">
                  Card number
                </label>
                <input
                  {...register("cardnumber")}
                  type="text"
                  placeholder="1234 1234 1234 1234"
                  className="block bg-neutral-50 border-neutral-200 border-[1.5px] rounded-[4px] w-full h-10 px-3.5 py-2.5 font-normal text-sm text-neutral-500"
                />
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <label className="font-medium text-sm text-neutral-700">
                  Name on card
                </label>
                <input
                  {...register("nameoncard")}
                  type="text"
                  placeholder="Full name on card"
                  className="block bg-neutral-50 border-neutral-200 border-[1.5px] rounded-[4px] w-full h-10 px-3.5 py-2.5 font-normal text-sm text-neutral-500"
                />
              </div>
              <div className="flex gap-8">
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="font-medium text-sm text-neutral-700">
                    Expiry
                  </label>
                  <input
                    {...register("expdate")}
                    type="text"
                    placeholder="MM/YY"
                    className="block bg-neutral-50 border-neutral-200 border-[1.5px] rounded-[4px] w-full h-10 px-3.5 py-2.5 font-normal text-sm text-neutral-500"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <label className="font-medium text-sm text-neutral-700">
                    CVV
                  </label>
                  <input
                    {...register("cvv")}
                    type="text"
                    placeholder="123"
                    className="block bg-neutral-50 border-neutral-200 border-[1.5px] rounded-[4px] w-full h-10 px-3.5 py-2.5 font-normal text-sm text-neutral-500"
                  />
                </div>
              </div>
            </div>
          </form>
          <div className="lg:flex-1 flex flex-col gap-8 p-8 border-[1.5px] max-lg:w-full border-neutral-200 rounded-lg">
            <div className="font-semibold text-xl text-neutral-900">
              Order Summary
            </div>
            <div className="flex flex-col">
              {cartItems.map((item, index) => {
                return (
                  <div key={index}>
                    <div className="flex gap-6">
                      <div>
                        <img
                          src={item.images[0].image_url}
                          className="object-cover h-20 w-20 rounded-lg"
                        />
                      </div>
                      <div className="flex-1 flex flex-col gap-2">
                        <div className="font-medium text-xl text-neutral-900">
                          {item.name}
                        </div>
                        <div className="font-medium text-base text-neutral-600">
                          {item.size ? (
                            <span>
                              {item.color[0].toUpperCase() +
                                item.color.slice(1)}
                              {item.size !== "N/A" &&
                                " · " + String(item.size).toUpperCase()}
                            </span>
                          ) : (
                            <span>
                              {item.color[0].toUpperCase() +
                                item.color.slice(1)}
                            </span>
                          )}
                        </div>
                        <div className="font-medium text-base text-neutral-600">
                          Quantity: {item.quantity}
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-lg text-neutral-900">
                          ${item.sale_price}
                        </div>
                        <div className="font-normal text-lg text-neutral-600">
                          {item.list_price > item.sale_price ? (
                            <s>${item.list_price}</s>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                    {index + 1 < cartItems.length && (
                      <hr className="border-t-2 border-neutral-300 border-dotted my-8" />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <hr className="border-t-2 border-neutral-300 mb-8" />
                <div className="flex justify-between">
                  <p className="text-neutral-600 text-base">Subtotal</p>
                  <p className="text-neutral-900 text-lg font-semibold">
                    ${totalAmount.toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-neutral-600 text-base">Shipping</p>
                  <p className="text-neutral-900 text-lg font-semibold">
                    {deliveryType === "standard" ? "FREE" : "$15.00"}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-neutral-600 text-base">Coupon Discount</p>
                  <p className="text-neutral-900 text-lg font-semibold">
                    $0.00
                  </p>
                </div>
              </div>
              <div>
                <hr className="border-t-2 border-neutral-300 my-8" />
                <div className="flex justify-between">
                  <p className="text-neutral-900 text-2xl font-medium">Total</p>
                  <p className="font-semibold text-neutral-900 text-4xl">
                    $
                    {deliveryType === "standard"
                      ? totalAmount
                      : totalAmount + 15.0}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <Button
                className="flex gap-[6px] justify-center items-center w-full bg-indigo-700 text-white py-3 rounded-[4px]"
                onClick={handleSubmit(onSubmit, onError)}
              >
                <img src={lockIcon} alt="" className="w-[13px] h-[14px]" />
                Confirm Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
