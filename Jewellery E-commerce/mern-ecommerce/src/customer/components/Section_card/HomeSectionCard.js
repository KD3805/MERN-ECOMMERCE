import React, { useState, useEffect } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";
import { cn } from "./utils/cs";
import { motion } from "framer-motion";

const HomeSectionCard = ({ product, productLabel }) => {
  const [mouseHover, setMouseHover] = useState(false);
  const navigate = useNavigate();

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
    <motion.div
      id={`product-card-${product._id}`}
      onClick={() => navigate(`/product/${product._id}`)}
      className={cn(
        "transition duration-300 cursor-pointer flex flex-col bg-white rounded-lg shadow-md overflow-hidden h-[22rem] w-[18rem] border",
        mouseHover ? "shadow-2xl -translate-y-2 z-50 absolute" : ""
      )}
    >
      <div
        className="relative w-full h-[15rem] rounded-lg transition duration-1000"
      >
        <img
          src={
              product.imageUrls?.[0]?.imageUrl
          }
          style={mouseHover ? {
            transform: "scale(1.1)",
              transition: "transform 0.3s",
      
          }: {}
        }
          alt=""
          className="object-cover object-top w-full h-full transition duration-1000 rounded-lg"
        />

        <div className="fav-icon bg-white rounded-full h-7 w-7 shadow-sm absolute top-3 right-3 flex items-center justify-center">
          <FavoriteBorderIcon />
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

      <div className="p-4">
        <h3 className="text-base font-sans font-semibold">{product.title}</h3>
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
    </motion.div>
  );
};

export default HomeSectionCard;
