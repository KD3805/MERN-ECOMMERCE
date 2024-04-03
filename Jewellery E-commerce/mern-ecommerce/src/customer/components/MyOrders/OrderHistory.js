import { Button, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import OrderCard from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../../state/store";
import { getOrderHistory } from "../../../state/order/Action";
import { format } from "date-fns";
import { updatePayment } from "../../../state/payment/Action";
import Loading from "../../../Loading";

const orderStatus = [
  {
    id: "status",
    name: "Order Status",
    options: [
      { value: "on_the_way", label: "On The Way", checked: false },
      { value: "delivered", label: "Delivered", checked: false },
      { value: "cancelled", label: "Cancelled", checked: false },
      { value: "returned", label: "Returned", checked: false },
    ],
  },
];

const OrderHistory = () => {
  const location = useLocation();
  const param = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth, order } = useSelector((store) => store);

  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);
  const paymentId = searchParams.get("razorpay_payment_id");

  useEffect(() => {
    dispatch(getOrderHistory(auth));
    if (paymentId && param.orderId) {
      const data = { orderId: param.orderId, paymentId };
      dispatch(updatePayment(data));
    }
  }, [param.orderId, paymentId]);

  // Handle multiple filters on cards
  const handleFilters = (value, sectionId) => {
    const searchParams = new URLSearchParams(location.search);

    let filterValue = searchParams.getAll(sectionId);

    if (filterValue.length > 0 && filterValue[0].split(",").includes(value)) {
      filterValue = filterValue[0].split(",").filter((item) => item !== value);

      if (filterValue.length === 0) {
        searchParams.delete(sectionId);
      }
    } else {
      filterValue.push(value);
    }

    if (filterValue.length > 0) {
      searchParams.set(sectionId, filterValue.join(","));
    }

    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  return (
    !order?.orders ?
      <Loading /> :
      (<div className="p-5">
        <Grid container>
          {/* <Grid item xs={2.5}>
          <div className="h-auto shadow-md bg-white p-5 sticky top-5">
            <h1 className="text-xl font-semibold">Filter</h1>
            <hr />

            <Disclosure
              as="div"
              key={orderStatus[0].id}
              className="border-b border-gray-200 py-6"
            >
              <div className="px-3 py-2 bg-pink-200 border border-pink-950 rounded-md">
                <h1 className="text-base font-semibold text-pink-950">
                  {orderStatus[0].name}
                </h1>
              </div>
              <div className="space-y-4 pt-6 pl-3">
                {orderStatus[0].options.map((option, optionIdx) => (
                  <div key={option.value} className="flex items-center">
                    {" "}
                    <input
                      onChange={() =>
                        handleFilters(option.value, orderStatus[0].id)
                      }
                      id={`filter-${orderStatus[0].id}-${optionIdx}`}
                      name={`${orderStatus[0].id}[]`}
                      defaultValue={option.value}
                      type="checkbox"
                      defaultChecked={option.checked}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    />{" "}
                    <label
                      htmlFor={`filter-${orderStatus[0].id}-${optionIdx}`}
                      className="ml-3 text-sm text-gray-600 cursor-pointer"
                    >
                      {" "}
                      {option.label}{" "}
                    </label>{" "}
                  </div>
                ))}
              </div>
            </Disclosure>
          </div>
        </Grid> */}

          <Grid item xs={12}>
            {order?.orders?.length === 0 ?
              (
                <div className="p-4 h-full flex justify-center flex-col items-center flex-wrap flex-grow">
                  <div>
                    <img src="https://res.cloudinary.com/deq0hxr3t/image/upload/v1711647931/no-order_fa6v9a.svg" alt="empty-wish" />
                  </div>
                  <div className="flex flex-col justify-center items-center gap-2">
                    <h1 className="text-2xl font-semibold text-pink-900">No orders found!</h1>
                    <Button
                      onClick={() => navigate('/')}
                      variant="contained"
                      type="submit"
                      sx={{ bgcolor: '#832729', "&:hover": { bgcolor: "#500724" }, }}
                      className="flex w-full uppercase items-center justify-center rounded-md border-none px-8 py-3 text-base font-medium text-white focus:outline-none "
                    >
                      Continue Shopping
                    </Button>
                  </div>
                </div>
              )
              :
              (<div>
                {order.orders?.map((order) => {
                  // Check if orderDate is a valid date object
                  const orderDate = order.orderDate instanceof Date ? order.orderDate : new Date(order.orderDate);
                  const formatOrderDate = orderDate instanceof Date ? format(orderDate, "MMMM, dd") : '';

                  return (
                    <div className="space-y-5 mb-5">
                      <h1 className="text-2xl my-3 font-semibold text-pink-950">
                        {formatOrderDate}
                      </h1>
                      {order.orderItems?.map((item, index) => (
                        <OrderCard
                          key={index} // Adding a unique key for each OrderCard
                          item={item}
                          orderDate={formatOrderDate}
                          orderId={order._id}
                          index={index}
                          orderStatus={order.orderStatus}
                        />
                      ))}
                    </div>
                  );
                })}

              </div>)
            }
          </Grid>
        </Grid>
      </div>)
  );
};

export default OrderHistory;
