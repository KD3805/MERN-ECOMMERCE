import React, { useEffect } from 'react'
import CartItem from './CartItem'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCart } from '../../../state/cart/Action'
import { store } from '../../../state/store'


const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cart, auth } = useSelector(store => store);

    const handleCheckout = () => {
        navigate('/checkout/?step=2');
    }

    useEffect(() => {
        dispatch(getCart());

    }, [cart.updateCartItem, cart.deleteCartItem, cart.cartItems])

    return (
        <div>
            {
                cart.cart ?
                    (
                        <div className='lg:grid grid-cols-3 lg:px-16 relative'>
                            <div className='col-span-2'>
                                {cart.cart?.cartItems?.map((item) => <CartItem item={item} />)}

                                <div className='flex items-center justify-center my-5'>
                                    <Button
                                        onClick={() => navigate('/')}
                                        variant="outlined"
                                        type="submit"
                                        sx={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#832729', borderColor: '#832729', "&:hover": { boxShadow: "#832729 0px 5px 30px", borderColor: '#832729' }, }}
                                        className="flex items-center justify-center rounded-md border-none p-3 focus:outline-none"
                                    >
                                        Continue Shopping
                                    </Button>
                                </div>
                            </div>

                            <div className='px-10 sticky top-0 h-[100vh] mt-5 lg:mt-0'>
                                <div className='rounded-lg shadow-md p-5 pb-0'>
                                    <h1
                                        className='uppercase font-semibold text-lg pb-4'
                                        style={{ color: "#832729" }}
                                    >
                                        Price Details
                                    </h1>
                                    <hr />
                                    <div className='space-y-3 font-semibold'>
                                        <div className='flex justify-between pt-3 text-black'>
                                            <span>Sub Total</span>
                                            <span>₹ {cart.cart?.totalPrice}</span>
                                        </div>

                                        <div className='flex justify-between pt-3'>
                                            <span>Discount</span>
                                            <span className='text-green-600'>{cart.cart?.discount} %</span>
                                        </div>

                                        <div className='flex justify-between pt-3'>
                                            <span>Delivery Charge</span>
                                            <span className='text-green-600'>FREE</span>
                                        </div>
                                        <hr />
                                        <div
                                            className='flex justify-between font-bold'
                                            style={{ color: "#832729" }}
                                        >
                                            <span>TOTAL (Incl of all Taxes.)</span>
                                            <span>₹ {cart.cart?.totalDiscountedPrice}</span>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={handleCheckout}
                                        variant="contained"
                                        type="submit"
                                        sx={{ my: '2rem', bgcolor: '#832729', "&:hover": { bgcolor: "#500724" }, }}
                                        className="flex w-full uppercase items-center justify-center rounded-md border-none px-8 py-3 text-base font-medium text-white focus:outline-none "
                                    >
                                        Check Out
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )
                    :
                    (
                        <div className='flex items-center justify-center h-[80vh]'>
                            <div className='flex flex-col justify-center items-center space-y-6'>
                                <img src="https://res.cloudinary.com/deq0hxr3t/image/upload/v1709462235/no-found_mnvvpf.svg" alt="" />
                                <h1 style={{ color: '#832729', fontFamily: 'sans-serif' }} className='text-2xl font-semibold uppercase'>Your Cart Is Empty</h1>

                                <div>
                                    <Button
                                        onClick={() => navigate('/')}
                                        variant="outlined"
                                        type="submit"
                                        sx={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#832729', borderColor: '#832729', "&:hover": { boxShadow: "#832729 0px 5px 30px", borderColor: '#832729' }, }}
                                        className="flex items-center justify-center rounded-md border-none p-3 focus:outline-none"
                                    >
                                        Continue Shopping
                                    </Button>

                                    {
                                        !auth.user && (
                                            <Button
                                                onClick={() => navigate('/login')}
                                                variant="contained"
                                                type="submit"
                                                sx={{
                                                    ml: '2rem', fontSize: '0.75rem', fontWeight: 'bold', color: '#fff', bgcolor: "#832729",
                                                    "&:hover": { bgcolor: "#500724" },
                                                }}
                                                className="flex font-medium items-center justify-center rounded-md border-none p-3 focus:outline-none"
                                            >
                                                Login to View Your Cart
                                            </Button>
                                        )
                                    }
                                </div>


                            </div>
                        </div>
                    )
            }
        </div>
    )
}

export default Cart
