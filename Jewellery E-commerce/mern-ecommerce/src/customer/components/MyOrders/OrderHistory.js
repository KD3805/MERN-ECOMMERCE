import { Disclosure } from "@headlessui/react";
import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OrderCard from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../../state/store";
import { getOrderHistory } from "../../../state/order/Action";
import { format } from 'date-fns';

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
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { auth, order } = useSelector(store => store);

    useEffect(() => {
        dispatch(getOrderHistory(auth));
    }, [])

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
        <div className="p-5">
            <Grid container sx={{ justifyContent: "space-between" }}>

                <Grid item xs={2.5}>
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
                </Grid>

                <Grid item xs={9}>
                    <div>
                        {order.orders?.map((order) => {
                            const formattedDate = format(order.orderDate, 'MMMM, dd');

                            return (
                                <div className="space-y-5 mb-5">
                                    <h1 className="text-2xl my-3 font-semibold text-pink-950">{formattedDate}</h1>
                                    {
                                        order.orderItems?.map((item, index) => <OrderCard item={item} orderDate={formattedDate} orderId={order?._id} index={index} orderStatus={order.orderStatus}/>)
                                    }
                                </div>
                            )
                        })}
                    </div>
                </Grid>

            </Grid>
        </div>
    );
};

export default OrderHistory;
