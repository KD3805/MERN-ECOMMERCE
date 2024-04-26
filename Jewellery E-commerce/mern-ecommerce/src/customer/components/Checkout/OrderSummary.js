import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { getOrderById } from '../../../state/order/Action'
import { store } from '../../../state/store'
import { createPayment } from '../../../state/payment/Action'

const OrderSummary = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { order } = useSelector(store => store);
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");
  const [disablePay, setDisablePay] = useState(false);

  useEffect(() => {
    dispatch(getOrderById(orderId));
  }, [orderId])

  const handlePayment = () => {
    setDisablePay(true)
    dispatch(createPayment(orderId)).then(() => setDisablePay(false))
  }

  // const {firstName, lastName, streetAddress, city, state, zipCode, mobile} = order.order?.shippingAddress;

  return (
    <div className='my-10'>
      <div className='p-5 shadow-lg rounded-s-md h-screen overflow-y-scroll' id='order-summary'>

        {/* <AddressCard /> */}
        <div className='flex flex-wrap items-center justify-between p-3 rounded-lg' style={{ border: '1px solid #500724' }}>
          <div className='space-y-2'>
            <h1 className='text-lg font-semibold'>{order.order?.shippingAddress.firstName+" "+order.order?.shippingAddress.lastName}</h1>
            <p className='text-sm text-gray-500 font-normal'>{order.order?.shippingAddress.streetAddress}, {order.order?.shippingAddress.city}, {order.order?.shippingAddress.zipCode}</p>
            <p className='text-sm text-gray-500 font-normal'>Phone : {order.order?.shippingAddress.mobile}</p>
          </div>

        </div>

        <hr />

        {/* <Cart />*/}
        <div>
          <div className='lg:grid grid-cols-3 relative'>

            <div className='col-span-2'>
              {order.order?.orderItems.map((item) => (
                <div className='p-2 my-12 shadow-md rounded-md'>
                  <div className='flex items-center'>
                    <div className='w-[10rem] h-[10rem] shadow-sm rounded-lg'>
                      <img src={item.product?.imageUrls[0]?.imageUrl} className='w-full h-full object-cover' alt="" />
                    </div>
                    <div className='ml-5 space-y-1'>
                      <p className='font-semibold text-xl'>{item.product?.title}</p>
                      <p className='text-sm py-1 text-gray-400 font-medium'>Weight : {item.weight} 
                      {/* | Size : 16.40 MM */}
                      </p>
                      <p className='text-sm  text-gray-400 font-medium'>Quantity: {item.quantity}</p>

                      <div className="flex space-x-5 items-center text-lg lg:text-xl text-gray-900 mt-3">
                        <p className="font-semibold lg:text-xl">₹ {item.product?.discountedPrice}</p>
                        <p className="opacity-50 line-through lg:text-base">₹ {item.product?.price}</p>
                        <p className="font-semibold text-red-500 lg:text-sm">
                        {item.product?.discountPercent}% off
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            </div>

            <div className='pl-10 sticky top-0 h-[100vh] mt-5 lg:mt-0'>
              <div className='rounded-lg shadow-md p-5 pb-0'>
                <h1
                  className='uppercase font-semibold text-lg pb-4'
                  style={{ color: "#832729" }}
                >
                  Order Summary
                </h1>
                <hr />
                <div className='space-y-3 font-semibold'>
                  <div className='flex justify-between pt-3 text-black'>
                    <span>Sub Total</span>
                    <span>₹ {order.order?.totalPrice}</span>
                  </div>

                  <div className='flex justify-between pt-3'>
                    <span>Discount</span>
                    <span className='text-red-600'>{order.order?.discount} %</span>
                  </div>

                  <div className='flex justify-between pt-3'>
                    <span>Delivery Charge</span>
                    <span className='text-red-600'>FREE</span>
                  </div>
                  <hr />
                  <div
                    className='flex justify-between font-bold'
                    style={{ color: "#832729" }}
                  >
                    <span>TOTAL (Incl of all Taxes.)</span>
                    <span>₹ {order.order?.totalDiscountedPrice}</span>
                  </div>
                </div>

                <Button
                  onClick={() => handlePayment()}
                  variant="contained"
                  type="submit"
                  disabled={disablePay}
                  sx={{ my: '2rem', bgcolor: '#832729', "&:hover": { bgcolor: "#500724" }, }}
                  className="flex w-full uppercase items-center justify-center rounded-md border-none px-8 py-3 text-base font-medium text-white focus:outline-none disabled:bg-gray-500"
                >
                  Payment
                </Button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default OrderSummary
