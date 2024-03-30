import { Grid } from '@mui/material'
import React from 'react'
import Achivement from './Achivement'
import MonthlyOverview from './MonthlyOverview'
import OrdersTableView from '../view/OrderTableView'
import ProductsTableView from '../view/ProductTableView'

const AdminDashboard = () => {
  return (
    <div className='p-10'>
      
      <Grid container spacing={3}>

        <Grid item xs={12} md={4}>
          <div style={{boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"}}>
          <Achivement />
          </div>
        </Grid>

        <Grid item xs={12} md={8}>
          <div style={{boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"}}>
          <MonthlyOverview />
          </div>
        </Grid>

        <Grid item xs={12} md={6}>
          <div style={{boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"}}>
          <OrdersTableView />
          </div>
        </Grid>

        <Grid item xs={12} md={6}>
          <div style={{boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"}}>
          <ProductsTableView />
          </div>
        </Grid>

      </Grid>

    </div>
  )
}

export default AdminDashboard
