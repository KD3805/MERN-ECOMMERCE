import React from 'react'

const AddressCard = ({address}) => {
  return (
    <div className='p-3 rounded-lg' style={{border: '1px solid #500724'}}>
      <div className='space-y-2'>
        <h1 className='text-lg font-semibold'>{address.firstName} {address.lastName}</h1>
        <p className='text-sm text-gray-500 font-normal'>Gokuldham society, powder gali, Mumbai, 400001</p>
        <p className='text-sm text-gray-500 font-normal'>Phone : 9876543210</p>
      </div>
    </div>
  )
}

export default AddressCard
