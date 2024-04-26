import React, { useState, useEffect } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox } from "@mui/material";
import { useDispatch } from "react-redux";
import { store } from "../../../state/store";
import { addWishItem, removeWishItem } from "../../../state/wishlist/Action";

const HomeSectionCard = ({ product, productLabel }) => {
  const [mouseHover, setMouseHover] = useState(false);
  const [favChecked, setFavChecked] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFavouriteChange = (event) => {
    setFavChecked(event.target.checked);

    if (event.target.checked === true) {
      dispatch(addWishItem({ productId: product._id }));
    }
    else {
      dispatch(removeWishItem(product._id))
    }
  };

  useEffect(() => {
    const handleMouseEnter = () => {
      setMouseHover(true);
    };

    const handleMouseLeave = () => {
      setMouseHover(false);
    };

    const card = document.getElementById(`product-card-${product._id}`);

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [product._id]);

  return (
    <div
      id={`product-card-${product._id}`}
      className={`transition duration-300 cursor-pointer flex flex-col bg-white rounded-lg shadow-md overflow-hidden h-[22rem] w-[18rem] border ${
        mouseHover ? "shadow-2xl -translate-y-2 z-50 absolute" : ""
      }`}
    >
      <div className="relative w-full h-[15rem] rounded-lg transition duration-1000">
        <Link
          to={`/product/${product._id}`}
          target="_blank" rel="noopener noreferrer"
        >
          <img
            src={product.imageUrls?.[0]?.imageUrl}
            style={
              mouseHover
                ? {
                  transform: "scale(1.1)",
                  transition: "transform 0.3s",
                }
                : {}
            }
            alt=""
            className="object-cover object-left-top w-full h-full transition duration-1000 rounded-lg"
          />
        </Link>

        <div className="fav-icon bg-white rounded-full h-7 w-7 shadow-sm absolute top-3 right-3 flex items-center justify-center">
          <Checkbox
            checked={favChecked}
            onChange={handleFavouriteChange}
            inputProps={{ "aria-label": "Favourites" }}
            icon={<FavoriteBorderIcon />}
            checkedIcon={<FavoriteIcon />}
            color="error"
          ></Checkbox>
        </div>

        {productLabel && (
          <div
            style={{ backgroundColor: "#832729" }}
            className="px-2 py-1 rounded-sm absolute bottom-2 left-2 z-10 text-white"
          >
            <p className="text-xs font-sans font-normal">{productLabel}</p>
          </div>
        )}
      </div>

      <Link to={`/product/${product._id}`} target="_blank" rel="noopener noreferrer" >
        <div className="p-4">
          <h3 className="text-base font-sans font-semibold inline-block w-full whitespace-nowrap overflow-hidden text-ellipsis">{product.title}</h3>
          <div className="flex items-center justify-between mt-1">
            <div className="flex gap-3 items-center justify-center">
              <p className="text-lg font-sans text-gray-800 font-semibold">
                ₹ {product.discountedPrice}
              </p>
              <p className="text-base font-sans text-gray-400 line-through font-semibold">
                ₹ {product.price}
              </p>
            </div>
            <p className="text-sm font-sans text-red-500 font-bold">
              {product.discountPercent}% off
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default HomeSectionCard;
