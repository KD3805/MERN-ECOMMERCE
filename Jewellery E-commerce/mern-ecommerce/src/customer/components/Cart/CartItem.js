import { Button, Fab, IconButton } from '@mui/material';
import React, { useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const CartItem = () => {
    const [quantity, setQuantity] = useState(1);

    return (
        <div className='p-2 my-12 shadow-md rounded-md'>

            <div className='flex items-center'>

                <div className='w-[10rem] h-[10rem] shadow-sm rounded-lg'>
                    <img src="assets/images/product/25.jpg" className='w-full h-full object-cover' alt="" />
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

            <div className='lg:flex items-center lg:space-x-10 pt-3'>

                <div className='flex items-center gap-1 space-x-2'>
                    <div className="flex items-center gap-1 justify-between">
                        <IconButton disabled={quantity <= 1} onClick={() => setQuantity(quantity => (quantity - 1))}>
                            {/* <Fab variant='extended' size='small' aria-label="add"> */}
                            <RemoveCircleIcon sx={{ color: '#832729' }} fontSize='medium' />
                            {/* </Fab> */}
                        </IconButton>
                        <h1 className="py-1 px-7 border rounded-lg text-lg font-semibold">{quantity}</h1>
                        <IconButton onClick={() => setQuantity(quantity => (quantity + 1))}>
                            {/* <Fab variant='extended' size="small" color='white' aria-label="add" onClick={() => setQuantity(quantity + 1)}> */}
                            <AddCircleIcon sx={{ color: '#832729' }} fontSize='medium' />
                            {/* </Fab> */}
                        </IconButton>
                    </div>
                </div>

                <IconButton aria-label="delete" size="small" className='flex items-center gap-1'>
                    <DeleteOutlineIcon sx={{ color: '#832729' }} fontSize="medium" />
                    <h1 className='text-sm font-semibold'>Remove</h1>
                </IconButton>

            </div>

        </div>
    )
}

export default CartItem
