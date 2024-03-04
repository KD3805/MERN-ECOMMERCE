import React from 'react';
import './productStyle.css'
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
    console.log("product",product)
    const discount = Math.floor(((product.price - product.discountedPrice) / product.price) * 100);
    const navigate = useNavigate();

    return (
        <div onClick={()=> navigate(`/product/${product?._id}`)} className='productCard w-[15rem] m-3 transition-all cursor-pointer'>
            <div className='h-[15rem]'>
                <img src={product.imageUrls[0].imageUrl} alt="jewellery" className='h-full w-full object-cover' />
            </div>

            <div className='textPart bg-white p-3'>
                <div>
                    <p className='font-bold opacity-60'>{product.brand}</p>
                    <p>{product.title}</p>
                    <p className='font-medium opacity-50'>{product.color}</p>
                    <p className='font-medium opacity-50'>{product.category.parentCategory.name}</p>
                    <p className='font-medium opacity-50'>{product.category.name}</p>
                    <p className='font-medium opacity-50'>{product.type}</p>
                    <p className='font-medium opacity-50'>{product.occasion}</p>
                </div>
                <div className='flex space-x-2 items-center'>
                    <p className='font-semibold'>₹ {product.discountedPrice}</p>
                    <p className='line-through'>₹ {product.price}</p>
                    <p className='text-green-600 font-semibold'>{discount}% off</p>
                </div>
            </div>

        </div>
    )
}

export default ProductCard;
