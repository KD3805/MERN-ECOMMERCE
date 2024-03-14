import { Button } from '@mui/material'
import React from 'react'

const AddressCard = ({address}) => {
  return (
    <div className='p-3 rounded-lg' style={{border: '1px solid #500724'}}>
      <div className='space-y-2'>
        <h1 className='text-lg font-semibold'>{address.firstName} {address.lastName}</h1>
        <p className='text-sm text-gray-500 font-normal'>Gokuldham society, powder gali, Mumbai, 400001</p>
        <p className='text-sm text-gray-500 font-normal'>Phone : 9876543210</p>
      </div>
      {/* <Button
        variant="outlined"
        type="submit"
        sx={{ my: '1rem', fontSize: '0.75rem', color: '#832729', borderColor: '#832729', "&:hover": { bgcolor: "#832729", color: '#fff', borderColor: '#832729' }, }}
        className="flex w-4/12 items-center justify-center rounded-md border-none px-3 py-1"
      >
        Change Address
      </Button> */}
    </div>
  )
}

export default AddressCard
