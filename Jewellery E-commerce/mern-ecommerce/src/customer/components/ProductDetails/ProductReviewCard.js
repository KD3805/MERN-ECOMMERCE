import { Avatar, Box, Grid, Rating } from '@mui/material';
import React from 'react';
import styled from "@emotion/styled";
import { format, isValid } from 'date-fns';

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#831843",
  },
  "& .MuiRating-iconHover": {
    color: "#500724",
  },
});

const ProductReviewCard = ({ reviewData, ratingData }) => {

  // const formattedDate = format(reviewData.createdAt, 'MMMM d, yyyy');
  const formattedDate = reviewData.createdAt && isValid(new Date(reviewData.createdAt)) ? format(new Date(reviewData.createdAt), 'MMMM d, yyyy') : '';


  return (
    <div className='my-3'>
      <Grid container gap={3}>
        <Box>
          <Avatar className='text-white' sx={{ width: 50, height: 50, fontSize: '1.3rem', bgcolor: '#832729' }}>
            {reviewData.user?.firstName.charAt(0).toUpperCase() ?? ''}
          </Avatar>
        </Box>

        <Grid item xs={9}>
          <div className="mb-2">
            <div>
              <h1 className='font-semibold text-xl m-0'>{reviewData.user?.firstName}</h1>
              <p className='font-medium text-sm text-gray-500'>{formattedDate}</p>
            </div>
          </div>

          <StyledRating name="rating" value={ratingData?.rating} readOnly precision={0.5} />

          <p>{reviewData.review}</p>
        </Grid>

      </Grid>
    </div>
  )
}

export default ProductReviewCard
