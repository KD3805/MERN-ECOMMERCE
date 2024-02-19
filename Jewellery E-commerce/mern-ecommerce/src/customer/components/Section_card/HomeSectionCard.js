import React from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const HomeSectionCard = ({product}) => {
  return (
    <div className='hover:shadow-2xl hover:-translate-y-2 transition duration-300 cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-md overflow-hidden w-[15rem] border'>
      <div className='relative w-full h-[13rem] rounded-lg '>
        <img src={product.imgUrl} alt="" className='object-cover object-top w-full h-full'/>
        <div className='fav-icon bg-white rounded-full h-7 w-7 shadow-sm absolute top-3 right-3 flex items-center justify-center'>
          <FavoriteBorderIcon />
        </div>
      </div>

      <div className='p-4'>
        <h3 className='text-lg font-medium text-gray-900'>{product.topLevelCategory}</h3>
        <p className='mt-2 text-sm text-gray-500'>{product.title}</p>
      </div>
    </div>
  )
}

export default HomeSectionCard;
