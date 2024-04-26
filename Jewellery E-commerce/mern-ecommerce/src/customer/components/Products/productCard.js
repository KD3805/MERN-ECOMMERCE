import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import zIndex from "@mui/material/styles/zIndex";

const ProductCard = ({ product, index }) => {
  const discount = Math.floor(
    ((product.price - product.discountedPrice) / product.price) * 100
  );
  const navigate = useNavigate();
  const [isMouseHover, setMouseHover] = useState(false);

  return (
    <div
      onMouseEnter={() => {
        setMouseHover(true);
      }}
      onMouseLeave={() => {
        setMouseHover(false);
      }}
      style={
        isMouseHover ? { zIndex: zIndex.modal + 2, boxShadow: "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px" } : { zIndex: zIndex.appBar, boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px"}
      }
      onClick={() => navigate(`/product/${product?._id}`)}
      className="p-2 rounded-lg w-[15rem] h-[23rem] overflow-hidden hover:-translate-y-10 hover:h-[30rem] hover:bg-white m-3 transition-all duration-300 cursor-pointer"
    >
      <div className="h-[15rem] mb-3 overflow-hidden">
        <img
          style={
            isMouseHover
              ? {
                transform: "scale(1.1)",
                transition: "transform 0.2s",
              }
              : {}
          }
          src={
            !isMouseHover
              ? product.imageUrls[0].imageUrl
              : product.imageUrls[1].imageUrl
          }
          alt="jewellery"
          className="h-full w-full object-cover rounded-t-lg rounded-b-none border transition duration-300"
        />
      </div>

      <div className="flex flex-col justify-center items-center text-center">
        <div className="mb-2">
          <h1 
            className="text-lg font-semibold" 
            style={{textOverflow: "ellipsis", overflow: "hidden", width: "13rem", whiteSpace: "nowrap"}}
          >
            {product.title}
          </h1>
          <button
            style={{ textTransform: "capitalize" }}
            className="text-sm font-bold text-rose-500 px-2"
          >
            {product.category.name}
          </button>
        </div>

        {isMouseHover && (
          <div>
            <img
              src="https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwd9a3b5d2/Line-Design.svg"
              alt=""
              className="w-full h-6 py-0 object-cover scale-150 px-5 overflow-hidden"
            />
            <div className="flex justify-evenly items-center w-full ">
              <p className="text-xl font-semibold">
                ₹ {product.discountedPrice}
              </p>
              <p className="text-xs font-bold text-red-500">{discount}% off</p>
            </div>
            <img
              src="https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwd9a3b5d2/Line-Design.svg"
              alt=""
              className="w-full h-6 py-0 object-cover scale-150 px-5 overflow-hidden"
            />
            <div className="flex px-2 justify-around items-center w-full my-2">
              <div className="flex-col items-center justify-center w-6/12 space-y-2">
                <p className="text-xs font-bold text-gray-500">Brand</p>
                <button className="text-sm font-bold text-fuchsia-500 bg-fuchsia-50 px-2">
                  {product.brand}
                </button>
              </div>
              <div className="flex-col items-center justify-center w-6/12 space-y-2">
                <p className="text-xs font-bold text-gray-500">Type</p>
                <button
                  style={{ textTransform: "capitalize" }}
                  className="text-sm font-bold text-rose-500 bg-rose-50 px-2"
                >
                  {product.type}
                </button>
              </div>
            </div>
          </div>
        )}

        {
          !isMouseHover &&
          (
            <div className="my-2 flex w-full gap-2 items-center justify-center hover:text-red-500 transition duration-500">
              <p className="text-sm font-medium opacity-50">Hover Details</p>
              <span>&rarr;</span>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default ProductCard;
