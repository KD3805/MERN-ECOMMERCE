import React from 'react'

const ContactUs = () => {
  return (
    <div className='h-full bg-pink-50 w-full flex justify-center items-center flex-col gap-5'>
      <div className='text-center flex justify-center items-center flex-col gap-4'>
      <h1 className='text-5xl font-semibold' style={{color: '#852B2D'}}>Help & Contact</h1>
        <h1 className='text-xl font-semibold text-center'>Feel free to ask any questions you may have. <br/>We are here to help!</h1>
      </div>
      <div className='flex gap-3'>
          
        <div className='flex flex-col justify-center items-center pr-10 gap-2' style={{borderRight: '2px solid #852B2D'}}>
          <img src="https://res.cloudinary.com/deq0hxr3t/image/upload/v1711683553/faq-phone_hxlyye.svg" alt="call" />
          <div className='flex flex-col justify-center items-center gap-1'>
            <h1 className='text-lg font-semibold text-center text-pink-900'>Call Us At</h1>
            <p className='text-base font-medium text-center'>1800-266-0123</p>
          </div>
        </div>

        <div className='flex flex-col justify-center items-center gap-2 mt-1 pl-5'>
          <img src="https://res.cloudinary.com/deq0hxr3t/image/upload/v1711683553/faq-msg_ivw8yr.svg" alt="email" />
          <div className='flex flex-col justify-center items-center gap-1'>
            <h1 className='text-lg font-semibold text-center text-pink-900'>Write to Us</h1>
            <p className='text-base font-medium text-center'>gayatri24@gmail.com</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ContactUs
