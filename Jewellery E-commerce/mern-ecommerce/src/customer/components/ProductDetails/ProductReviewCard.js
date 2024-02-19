import { Avatar, Box, Grid, Rating } from '@mui/material';
import React from 'react';
import styled from "@emotion/styled";

const ProductReviewCard = () => {
    const StyledRating = styled(Rating)({
        "& .MuiRating-iconFilled": {
          color: "#831843",
        },
        "& .MuiRating-iconHover": {
          color: "#500724",
        },
    });

  return (
    <div>
      <Grid container gap={3}>
        <Box>
            <Avatar className='text-white' sx={{width: 50, height: 50, fontSize: '1rem', bgcolor: '#832729'}}>
                KD
            </Avatar>
        </Box>

        <Grid item xs={9}>
            <div className="mb-2">
                <div>
                    <h1 className='font-semibold text-lg m-0'>Krishna</h1>
                    <p className='font-medium text-sm text-gray-500'>April 5, 2023</p>
                </div>
            </div>

            <StyledRating name="rating" value={3.5} readOnly precision={0.5}/>

            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, eveniet.</p>
        </Grid>

      </Grid>
    </div>
  )
}

export default ProductReviewCard
