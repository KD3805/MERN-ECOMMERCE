import React, { useContext, useEffect, useState } from 'react';
import OrderTracker from './OrderTracker';
import { Grid, IconButton } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import CancelIcon from '@mui/icons-material/Cancel';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById } from '../../../state/order/Action';
import { useNavigate, useParams } from 'react-router-dom';
import RatingReviewForm from './RatingReviewForm';
import { RRContext } from '../../../context/rrBox/rrContext';

const OrderDetails = () => {
    const { order } = useSelector(store => store);
    const dispatch = useDispatch();
    const params = useParams(); 
    const index = parseInt(params.index);
    const navigate = useNavigate();
    const modal = useContext(RRContext);
    const [activeStep, setActiveStep] = useState(1);

    useEffect(()=> {
        const fetchOrder = () => {
            dispatch(getOrderById(params.orderId));
        };

        fetchOrder();
    }, [dispatch, params.orderId]);

    useEffect(() => {
        if (!order || !order.order?.orderStatus) return;

        let newActiveStep;
        switch(order.order?.orderStatus) {
            case "CONFIRMED":
                newActiveStep = 1;
                break;  
            case "SHIPPED":
                newActiveStep = 2;   
                break;
            case "DELIVERED":
                newActiveStep = 5;        
                break;
            default:
                newActiveStep = 1;   
        }

        setActiveStep(newActiveStep);
    }, [order?.order?.orderStatus]);

    const handleOpen = () => {
        navigate(`/product/${order.order?.orderItems[index]?.product._id}/ratrev`)
        modal.openModal();
    };

    const handleClose = () => {
        modal.closeModal();
    };

    const { firstName, lastName, streetAddress, city, zipCode, mobile, state } = order.order?.shippingAddress || {};

    return (
        <div className='p-5'>
            <div className='p-3 bg-pink-50 text-pink-950 rounded-lg' style={{ border: '1px solid #500724' }}>
                <h1 className='font-bold text-xl py-3'>Delivery Address</h1>
                <div className='space-y-2'>
                    <h1 className='text-lg font-semibold'>{firstName} {lastName}</h1>
                    <p className='text-sm font-normal'>{streetAddress}, {city}, {zipCode}</p>
                    <div>
                        <p className='text-sm font-semibold'>Phone Number : </p>
                        <p className='text-sm font-normal'>{mobile}</p>
                    </div>
                </div>
            </div>

            <div className='my-3'>
                <OrderTracker activeStep={activeStep} />
            </div>

            <div className="p-3 shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-1 rounded-lg cursor-pointer">
                <Grid
                    onClick={()=>navigate(`/product/${order.order?.orderItems[index]?.product._id}`)}
                    container
                    spacing={2}
                    sx={{ justifyContent: "space-between", alignItems: "center", flexWrap: 'wrap' }}
                >
                    <Grid item>
                        <div className="flex items-center">
                            <img
                                className="w-[7rem] h-[7rem] shadow-md rounded-md object-cover"
                                src={order.order?.orderItems[index]?.product.imageUrls[0].imageUrl}
                                alt=""
                            />

                            <div className="ml-5 space-y-2">
                                <p className="font-semibold text-xl">
                                    {order.order?.orderItems[index]?.product.title}
                                </p>
                                <p className="text-sm py-1 text-gray-400 font-medium">
                                    Weight : {order.order?.orderItems[index]?.weight} | Size : {order.order?.orderItems[index]?.size} MM
                                </p>
                                <p className="text-sm  text-gray-400 font-medium">
                                    Seller: {order.order?.orderItems[index]?.product.brand}
                                </p>

                                <div className="flex space-x-5 items-center text-lg lg:text-xl text-gray-900 mt-3">
                                    <p className="font-semibold lg:text-lg">₹ {order.order?.orderItems[index]?.product.discountedPrice}</p>
                                    <p className="font-semibold text-red-500 lg:text-sm">
                                        {order.order?.orderItems[index]?.product.discountPercent}% off
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
                                    <span className="font-semibold text-pink-950 lg:text-base" 
                                    onClick={(e)=>{
                                        e.preventDefault();
                                        handleOpen();
                                    }}
                                    >
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

            <RatingReviewForm open={modal.state} handleClose={handleClose}/>
        </div>
    )
}

export default OrderDetails;
