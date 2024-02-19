import React from 'react'
import CartItem from './CartItem'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
    const navigate = useNavigate();

    const handleCheckout = () => {
        navigate('/checkout/?step=2');
    }

    return (
        <div>
            <div className='lg:grid grid-cols-3 lg:px-16 relative'>
                <div className='col-span-2'>
                    {[1, 1, 1].map((item) => <CartItem />)}
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
                                <span>₹ 25222</span>
                            </div>

                            <div className='flex justify-between pt-3'>
                                <span>Discount</span>
                                <span className='text-green-600'>- ₹ 1261</span>
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
                                <span>₹ 23961</span>
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
        </div>
    )
}

export default Cart
