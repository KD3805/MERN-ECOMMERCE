import { Grid, LinearProgress } from '@mui/material'
import React from 'react'

const ProductRatingBox = (rating) => {
  return (
    <div>
      <Grid container alignItems="center" gap={2}>
        <Grid item xs={2}>
          <p>{rating.category}</p>
        </Grid>
        <Grid item xs={7}>
          <LinearProgress sx={{ bgcolor: '#d0d0d0', borderRadius: 4, height: 7 }} variant="determinate" value={rating.ratingValue} color={rating.color} />
        </Grid>
      </Grid>
    </div>
  )
}

export default ProductRatingBox
