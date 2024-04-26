import { Box, Button, Grid, TextField, styled } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../../state/order/Action';
import { store } from '../../../state/store';


const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#500724',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#500724',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#9ca3af',
    },
    '&:hover fieldset': {
      borderColor: '#500724',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#500724',
    },
  },
});


const DeliveryAddressForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    mobile: ''
  });
  const { auth } = useSelector(store => store);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("address on handleSubmit", data)
    
    const address = {
      firstName: data.firstName,
      lastName: data.lastName,
      streetAddress: data.streetAddress,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
      mobile: data.mobile
    }
    const orderData = { address, navigate }
    dispatch(createOrder(orderData))
  }

  const handleDelivery = () => {
    navigate('/checkout/?step=3');
  }


  return (
    <div className='my-20'>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={5}>
          <div className='overflow-y-scroll h-[30.5rem] rounded-md shadow-md ' id='deli-add-form'>
            <Grid item>
              <div className="p-3 flex flex-col gap-4 cursor-pointer">
                <h1 className='text-lg font-semibold text-pink-950 uppercase'>Deliver To</h1>
                <hr />
                <div>
                  {auth.user?.address.map((address) => (
                    <div className='p-3 rounded-lg' style={{ border: '1px solid #500724' }}>
                      <div className='space-y-2'>
                        <h1 className='text-lg font-semibold'>{address.firstName} {address.lastName}</h1>
                        <p className='text-sm text-gray-500 font-normal'>{address.streetAddress}, {address.city}, {address.state}, {address.zipCode}</p>
                        <p className='text-sm text-gray-500 font-normal'>Phone : {address.mobile}</p>
                      </div>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setData(address)
                          console.log(address)
                        }}
                        sx={{ my: '1rem', fontSize: '0.75rem', color: '#832729', borderColor: '#832729', "&:hover": { bgcolor: "#832729", color: '#fff', borderColor: '#832729' }, }}
                        className="flex w-4/12 items-center justify-center rounded-md border-none px-3 py-1"
                      >
                        Use This Address
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

            </Grid>
          </div>
        </Grid >

        <Grid item xs={12} lg={7}>

          <Box className="border rounded-s-md shadow-md p-5">

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>

                <Grid item xs={12} sm={6}>
                  <CssTextField
                    id='firstName'
                    name='firstName'
                    label='First Name'
                    fullWidth
                    required
                    autoComplete='given-name'
                    value={data.firstName}
                    onChange={(e) => {
                      setData({ ...data, firstName: e.target.value })
                    }}
                    // defaultValue={data ? data.firstName : ''}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CssTextField
                    id='lastName'
                    name='lastName'
                    label='Last Name'
                    fullWidth
                    required
                    autoComplete='given-name'
                    value={data.lastName}
                    onChange={(e) => {
                      setData({ ...data, lastName: e.target.value })
                    }}
                    // defaultValue={data ? data.lastName : ''}
                  />
                </Grid>

                <Grid item sm={12}>
                  <CssTextField
                    id='address'
                    name='address'
                    label='Address'
                    fullWidth
                    required
                    autoComplete='given-name'
                    multiline
                    rows={4}
                    value={data.streetAddress}
                    onChange={(e) => {
                      setData({ ...data, streetAddress: e.target.value })
                    }}
                    // defaultValue={data ? data.streetAddress : ''}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CssTextField
                    id='city'
                    name='city'
                    label='City'
                    fullWidth
                    required
                    autoComplete='given-name'
                    value={data.city}
                    onChange={(e) => {
                      setData({ ...data, city: e.target.value })
                    }}
                    // defaultValue={data ? data.city : ''}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CssTextField
                    id='state'
                    name='state'
                    label='State/Region'
                    fullWidth
                    required
                    autoComplete='given-name'
                    value={data.state}
                    onChange={(e) => {
                      setData({ ...data, state: e.target.value })
                    }}
                    // defaultValue={data ? data.state : ''}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CssTextField
                    id='zip'
                    name='zip'
                    label='Zip/Postal-code'
                    fullWidth
                    required
                    autoComplete='shipping postal-code'
                    value={data.zipCode}
                    onChange={(e) => {
                      setData({ ...data, zipCode: e.target.value })
                    }}
                    // defaultValue={data ? data.zipCode : ''}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <CssTextField
                    id='phoneNumber'
                    name='phoneNumber'
                    label='Phone Number'
                    fullWidth
                    required
                    autoComplete='given-number'
                    value={data.mobile}
                    onChange={(e) => {
                      setData({ ...data, mobile: e.target.value })
                    }}
                    // defaultValue={data ? data.mobile : ''}
                  />
                </Grid>

                <Button
                  // onClick={handleDelivery}
                  variant="contained"
                  type="submit"
                  sx={{ mt: '2rem', ml: '1.5rem', bgcolor: '#832729', "&:hover": { bgcolor: "#500724" }, }}
                  className="flex w-4/12 uppercase items-center justify-center rounded-md border-none px-8 py-3 text-base font-medium text-white focus:outline-none "
                >
                  Deliver Here
                </Button>

              </Grid>
            </form>

          </Box>
        </Grid>



      </Grid >
    </div >
  )
}

export default DeliveryAddressForm
