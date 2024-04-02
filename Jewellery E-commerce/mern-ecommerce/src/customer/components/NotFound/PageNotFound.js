import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col justify-center items-center gap-5 h-[80vh]'>
      <img src="https://res.cloudinary.com/deq0hxr3t/image/upload/v1711953278/404-Desktop_krj0z8.webp" alt="404" className='w-fit object-cover' />
      <Button
        onClick={() => navigate('/')}
        variant="contained"
        type="submit"
        sx={{
          ml: '2rem', fontSize: '0.75rem', fontWeight: 'bold', color: '#fff', bgcolor: "#832729",
          "&:hover": { bgcolor: "#500724" },
        }}
        className="flex font-medium items-center justify-center rounded-md border-none p-3 focus:outline-none"
      >
        Back to Home
      </Button>
    </div>
  )
}

export default PageNotFound
