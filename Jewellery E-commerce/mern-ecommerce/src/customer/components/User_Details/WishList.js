import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getWish, addWishItem, removeWishItem } from '../../../state/wishlist/Action';
import { useNavigate } from 'react-router-dom';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Button, Checkbox } from "@mui/material";

const WishList = () => {
  const dispatch = useDispatch();
  const { wishlist } = useSelector(store => store);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getWish());
    console.log("wishlist.wishItems", wishlist.wishItems)

  }, [wishlist.deleteWishItem]);

  // Initialize state to keep track of checked status for each product
  const [checkedProducts, setCheckedProducts] = useState({});

  const handleFavouriteChange = (event, productId) => {
    const isChecked = event.target.checked;

    // Update the checked status for the product
    setCheckedProducts(prevState => ({
      ...prevState,
      [productId]: isChecked
    }));

    // Dispatch addWishItem or removeWishItem based on isChecked status
    if (isChecked) {
      dispatch(addWishItem({ productId }));
    } else {
      dispatch(removeWishItem(productId));
    }
  };


  return (

    wishlist?.wishItems?.length === 0 ?
      (
        <div className="p-4 h-full flex justify-center flex-col gap-4 items-center flex-wrap flex-grow">
          <div>
            <img src="https://res.cloudinary.com/deq0hxr3t/image/upload/v1711647890/empty_wish_rp1zy3.webp" alt="empty-wish" />
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <h1 className="text-2xl font-semibold text-pink-900">Your WishList is Empty!</h1>
            <Button
              onClick={() => navigate('/')}
              variant="contained"
              type="submit"
              sx={{ bgcolor: '#832729', "&:hover": { bgcolor: "#500724" }, }}
              className="flex w-full uppercase items-center justify-center rounded-md border-none px-8 py-3 text-base font-medium text-white focus:outline-none "
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      )
      :
      (<div className='relative p-4 flex gap-3 flex-wrap flex-grow'>
        {
          wishlist && wishlist.wishItems && wishlist.wishItems.map((item) => {
            const product = item?.product; // Modified to use optional chaining
            if (!product || !product._id) return null; // Check for product existence and _id property

            return (
              <div
                key={item._id}
                className=
                "transition duration-300 cursor-pointer flex flex-col bg-white rounded-lg shadow-md overflow-hidden h-[22rem] w-[16rem] border"
              >
                <div className="relative w-full h-[15rem] rounded-lg transition duration-1000">
                  <img
                    src={product?.imageUrls?.[0]?.imageUrl}
                    onClick={() => navigate(`/product/${product?._id}`)}
                    alt=""
                    className="object-cover object-top w-full h-full transition duration-1000 rounded-lg"
                  />

                  <div className="fav-icon bg-white rounded-full h-7 w-7 shadow-sm absolute top-3 right-3 flex items-center justify-center">
                    <Checkbox
                      checked={checkedProducts[product?._id] ?? true} // Default to true if checked state is not defined
                      onChange={(e) => handleFavouriteChange(e, product?._id)}
                      inputProps={{ "aria-label": "Favourites" }}
                      icon={<FavoriteBorderIcon />}
                      checkedIcon={<FavoriteIcon />}
                      color="error"
                    />
                  </div>
                </div>

                <div className="p-4" onClick={() => navigate(`/product/${product?._id}`)}>
                  <h3 className="text-base font-sans font-semibold">{product?.title}</h3>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex gap-3 items-center justify-center">
                      <p className="text-lg font-sans text-gray-800 font-semibold">
                        ₹ {product?.discountedPrice}
                      </p>
                      <p className="text-base font-sans text-gray-400 line-through font-semibold">
                        ₹ {product?.price}
                      </p>
                    </div>
                    <p className="text-sm font-sans text-red-500 font-bold">
                      {product?.discountPercent}% off
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>)
  )
}

export default WishList;
