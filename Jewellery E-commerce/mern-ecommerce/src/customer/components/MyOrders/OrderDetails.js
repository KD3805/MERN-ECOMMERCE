import React from 'react'
import OrderTracker from './OrderTracker';
import { Grid, IconButton } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import CancelIcon from '@mui/icons-material/Cancel';

const OrderDetails = () => {
    return (
        <div className='p-5 '>

            <div className='p-3 bg-pink-50 text-pink-950 rounded-lg' style={{ border: '1px solid #500724' }}>
                <h1 className='font-bold text-xl py-3'>Delivery Address</h1>
                <div className='space-y-2'>
                    <h1 className='text-lg font-semibold'>Jethalal Gada</h1>
                    <p className='text-sm font-normal'>Gokuldham society, powder gali, Mumbai, 400001</p>
                    <div>
                        <p className='text-sm font-semibold'>Phone Number : </p>
                        <p className='text-sm font-normal'>9876543210</p>
                    </div>
                </div>
            </div>

            <div className='my-3'>
                <OrderTracker activeStep={4} />
            </div>


            <div className="p-3 shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-1 rounded-lg cursor-pointer">
                <Grid
                    container
                    spacing={2}
                    sx={{ justifyContent: "space-between", alignItems: "center", flexWrap: 'wrap' }}
                >
                    <Grid item>
                        <div className="flex items-center">
                            <img
                                className="w-[7rem] h-[7rem] shadow-md rounded-md object-cover"
                                src="https://res.cloudinary.com/deq0hxr3t/image/upload/v1707742451/1_koyxla.jpg"
                                alt=""
                            />

                            <div className="ml-5 space-y-2">
                                <p className="font-semibold text-lg">
                                    Classy Diamond Flower Earrings
                                </p>
                                <p className="text-xs py-1 text-gray-400 font-medium">
                                    Weight : 2.047 g | Size : 16.40 MM
                                </p>
                                <p className="text-xs  text-gray-400 font-medium">
                                    Seller: Gayatri
                                </p>

                                <div className="flex space-x-5 items-center text-lg lg:text-xl text-gray-900 mt-3">
                                    <p className="font-semibold lg:text-lg">₹ 9999</p>
                                    {/* <p className="opacity-50 line-through lg:text-base">₹ 11999</p> */}
                                    <p className="font-semibold text-green-600 lg:text-base">
                                        15% off
                                    </p>
                                </div>
                            </div>

                        </div>
                    </Grid>

                    <Grid item>
                        {true && (
                            <div className="flex items-end justify-center flex-col mt-3 pr-5">
                                <IconButton className="flex items-center">
                                    <StarIcon
                                        sx={{ width: "20px", height: "20px" }}
                                        className="text-pink-950 mr-2 text-sm"
                                    />
                                    <span className="font-semibold text-pink-950 lg:text-base">
                                        Rate & Review Product
                                    </span>
                                </IconButton>
                            </div>
                        )}

                        {false && (
                            <IconButton className="flex items-center justify-end mt-3 pr-5 font-semibold lg:text-lg">
                                <CancelIcon
                                    sx={{ width: "20px", height: "20px" }}
                                    className="text-pink-950 mr-2 text-sm"
                                />
                                <span className="font-semibold text-pink-950 lg:text-base">
                                    Cancel Order
                                </span>
                            </IconButton>
                        )}
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default OrderDetails
