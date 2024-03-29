import { Box, Button, Divider, Grid, TextField, styled } from '@mui/material'
import React, { useState } from 'react'
import AddressCard from '../AddressCard/AddressCard'
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
  const [data, setData] = useState({});
  const { auth } = useSelector(store => store);
  console.log('auth user', auth?.user)

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('e.currentTarget', e.currentTarget)
    const data = new FormData(e.currentTarget);
    console.log('formdata', data.set('firstName', 'jsk'))
    console.log('formdata', data.get('firstName'))

    const address = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      streetAddress: data.get('address'),
      city: data.get('city'),
      state: data.get('state'),
      zipCode: data.get('zip'),
      mobile: data.get('phoneNumber')
    }
    const orderData = {address, navigate}
    dispatch(createOrder(orderData))
    console.log('address', orderData);
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
                        type="submit"
                        onClick={() => {
                          setData(
                            {
                              ...data,
                              firstName: address.firstName,
                              lastName: address.lastName,
                              streetAddress: address.streetAddress, 
                              city: address.city,
                              state: address.state,
                              zipCode: address.zipCode,
                              mobile: address.mobile
                            }
                          )
                        }}
                        sx={{ my: '1rem', fontSize: '0.75rem', color: '#832729', borderColor: '#832729', "&:hover": { bgcolor: "#832729", color: '#fff', borderColor: '#832729' }, }}
                        className="flex w-4/12 items-center justify-center rounded-md border-none px-3 py-1"
                      >
                        Use This Address
                      </Button>
                    </div>
                  ))}
                </div>

                {/* <Button
                  variant="contained"
                  type="submit"
                  sx={{ my: '2rem', bgcolor: '#832729', "&:hover": { bgcolor: "#500724" }, }}
                  className="flex w-full uppercase items-center justify-center rounded-md border-none px-8 py-3 text-base font-medium text-white focus:outline-none "
                >
                  Deliver Here
                </Button> */}
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
                    defaultValue={data ? data.firstName : ''}
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
                    defaultValue={data ? data.lastName : ''}
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
                    defaultValue={data ? data.streetAddress : ''}
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
                    defaultValue={data ? data.city : ''}
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
                    defaultValue={data ? data.state : ''}
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
                    defaultValue={data ? data.zipCode : ''}
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
                    defaultValue={data ? data.mobile : ''}
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
