import { Grid } from "@mui/material";
import React from "react";
import AdjustIcon from "@mui/icons-material/Adjust";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ item, orderId, index, orderDate, orderStatus }) => {
    const navigate = useNavigate();

    return (
        <div onClick={()=>navigate(`/account/orders/${orderId}/${index}`)} className="p-3 shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-1 rounded-lg cursor-pointer">
            <Grid
                container
                spacing={2}
                sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
                <Grid item xs={6}>
                    <div className="flex items-center">
                        <img
                            className="w-[5rem] h-[5rem] shadow-md rounded-md object-cover"
                            src={item.product?.imageUrls[0].imageUrl}
                            alt=""
                        />

                        <div className="ml-5 space-y-2">
                            <p className="font-semibold text-xl">
                                {item.product?.title}
                            </p>
                            <p className="text-sm py-1 text-gray-400 font-medium">
                                Weight : {item?.weight} | Size : {item?.width || 16.52} MM
                            </p>
                            <p className="text-sm  text-gray-400 font-medium">
                                Seller: {item.product?.brand}
                            </p>
                        </div>
                    </div>
                </Grid>

                <Grid item xs={2}>
                    <p className="flex justify-center font-semibold lg:text-xl">
                        ₹ {item?.discountedPrice}
                    </p>
                </Grid>

                <Grid xs={4}>
                    {orderStatus === 'DELIVERED' 
                    ? (
                        <div className="flex items-end justify-center flex-col mt-3 pr-5">
                            <p className="flex items-center">
                                <AdjustIcon
                                    sx={{ width: "15px", height: "15px" }}
                                    className="text-green-600 mr-2 text-sm"
                                />
                                <span className="font-semibold lg:text-lg">
                                    Delivered on {orderDate}
                                </span>
                            </p>
                            <p className="text-xs py-1 text-gray-400 font-medium">
                                Your item has been delivered
                            </p>
                        </div>
                    )
                    : (
                        <span className="flex items-center justify-end mt-3 pr-5 font-semibold lg:text-lg">
                            <AdjustIcon
                                    sx={{ width: "15px", height: "15px" }}
                                    className="text-pink-600 mr-2 text-sm"
                                />
                                <span className="font-semibold lg:text-base">
                                Expected delivery on March, 03
                                </span>
                        </span>
                    )}
                </Grid>
            </Grid>
        </div>
    );
};

export default OrderCard;
