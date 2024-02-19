import React from 'react'
import AddressCard from '../AddressCard/AddressCard'
import Cart from '../Cart/Cart'
import CartItem from '../Cart/CartItem'
import { Button } from '@mui/material'

const OrderSummary = () => {
  return (
    <div className='my-10'>
      <div className='p-5 shadow-lg rounded-s-md h-screen overflow-y-scroll' id='order-summary'>

        {/* <AddressCard /> */}
        <div className='flex flex-wrap items-center justify-between p-3 rounded-lg' style={{ border: '1px solid #500724' }}>
          <div className='space-y-2'>
            <h1 className='text-lg font-semibold'>Jethalal Gada</h1>
            <p className='text-sm text-gray-500 font-normal'>Gokuldham society, powder gali, Mumbai, 400001</p>
            <p className='text-sm text-gray-500 font-normal'>Phone : 9876543210</p>
          </div>

          <Button
            variant="outlined"
            type="submit"
            sx={{ my: '1rem', fontSize: '0.75rem', color: '#832729', borderColor: '#832729', "&:hover": { bgcolor: "#832729", color: '#fff', borderColor: '#832729' }, }}
            className="flex w-2/12 items-center justify-center rounded-md border-none p-3"
          >
            Change Address
          </Button>
        </div>

        <hr />

        {/* <Cart />*/}
        <div>
          <div className='lg:grid grid-cols-3 relative'>

            <div className='col-span-2'>
              {/* Product 1 */}
              <div className='p-2 my-12 shadow-md rounded-md'>
                <div className='flex items-center'>
                  <div className='w-[10rem] h-[10rem] shadow-sm rounded-lg'>
                    <img src="https://res.cloudinary.com/deq0hxr3t/image/upload/v1707742451/1_koyxla.jpg" className='w-full h-full object-cover' alt="" />
                  </div>
                  <div className='ml-5 space-y-1'>
                    <p className='font-semibold text-xl'>Classy Diamond Flower Earrings</p>
                    <p className='text-xs py-1 text-gray-400 font-medium'>Weight : 2.047 g | Size : 16.40 MM</p>
                    <p className='text-xs  text-gray-400 font-medium'>Seller: Gayatri</p>

                    <div className="flex space-x-5 items-center text-lg lg:text-xl text-gray-900 mt-3">
                      <p className="font-semibold lg:text-xl">₹ 9999</p>
                      <p className="opacity-50 line-through lg:text-base">₹ 11999</p>
                      <p className="font-semibold text-green-600 lg:text-sm">
                        15% off
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product 2 */}
              <div className='p-2 my-12 shadow-md rounded-md'>
                <div className='flex items-center'>
                  <div className='w-[10rem] h-[10rem] shadow-sm rounded-lg'>
                    <img src="https://res.cloudinary.com/deq0hxr3t/image/upload/v1707742452/7_rr1ans.jpg" className='w-full h-full object-cover' alt="" />
                  </div>
                  <div className='ml-5 space-y-1'>
                    <p className='font-semibold text-xl'>Classy Diamond Flower Earrings</p>
                    <p className='text-xs py-1 text-gray-400 font-medium'>Weight : 2.047 g | Size : 16.40 MM</p>
                    <p className='text-xs  text-gray-400 font-medium'>Seller: Gayatri</p>

                    <div className="flex space-x-5 items-center text-lg lg:text-xl text-gray-900 mt-3">
                      <p className="font-semibold lg:text-xl">₹ 9999</p>
                      <p className="opacity-50 line-through lg:text-base">₹ 11999</p>
                      <p className="font-semibold text-green-600 lg:text-sm">
                        15% off
                      </p>
                    </div>
                  </div>
                </div>
              </div>
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
                  variant="contained"
                  type="submit"
                  sx={{ my: '2rem', bgcolor: '#832729', "&:hover": { bgcolor: "#500724" }, }}
                  className="flex w-full uppercase items-center justify-center rounded-md border-none px-8 py-3 text-base font-medium text-white focus:outline-none "
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
