import { IconButton } from '@mui/material';
import React, { useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useDispatch } from 'react-redux';
import { removeCartItem, updateCartItem } from '../../../state/cart/Action';

const CartItem = ({item}) => {
    // const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    const handleUpdateCartItem = (num) => {
        const data = {data: {quantity: item.quantity + num}, cartItemId: item?._id}
        dispatch(updateCartItem(data))
    }

    const handleRemoveCartItem = () => {
        dispatch(removeCartItem(item._id));
    }

    return (
        <div className='p-2 my-12 shadow-md rounded-md'>

            <div className='flex items-center'>

                <div className='w-[10rem] h-[10rem] shadow-sm rounded-lg'>
                    <img src={item.product?.imageUrls?.[0]?.imageUrl} className='w-full h-full object-cover' alt="" />
                </div>

                <div className='ml-5 space-y-1'>
                    <p className='font-semibold text-xl'>{item.product?.title}</p>
                    <p className='text-sm py-1 text-gray-400 font-medium'>Weight : {item.weight} | Size : {item.width} MM</p>
                    <p className='text-sm  text-gray-400 font-medium'>Seller: {item.product?.brand}</p>

                    <div className="flex space-x-5 items-center text-lg lg:text-xl text-gray-900 mt-3">
                        <p className="font-semibold lg:text-xl">₹ {item.discountedPrice}</p>
                        <p className="opacity-50 line-through lg:text-base">₹ {item.price}</p>
                        <p className="font-semibold text-red-500 text-sm">
                            {item.product?.discountPercent}% off
                        </p>
                    </div>
                </div>

            </div>

            <div className='lg:flex items-center lg:space-x-10 pt-3'>

                <div className='flex items-center gap-1 space-x-2'>
                    <div className="flex items-center gap-1 justify-between">
                        <IconButton disabled={item.quantity <= 1} onClick={() => handleUpdateCartItem(-1)}>
                            <RemoveCircleIcon sx={{ color: '#832729' }} fontSize='medium' />
                        </IconButton>
                        <h1 className="py-1 px-7 border rounded-lg text-lg font-semibold">{item.quantity}</h1>
                        <IconButton onClick={() => handleUpdateCartItem(1)}>
                            <AddCircleIcon sx={{ color: '#832729' }} fontSize='medium' />
                        </IconButton>
                    </div>
                </div>

                <IconButton onClick={handleRemoveCartItem} aria-label="delete" size="small" className='flex items-center gap-1'>
                    <DeleteOutlineIcon sx={{ color: '#832729' }} fontSize="medium" />
                    <h1 className='text-sm font-semibold'>Remove</h1>
                </IconButton>

            </div>

        </div>
    )
}

export default CartItem
