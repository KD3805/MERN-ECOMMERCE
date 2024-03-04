import React, { useEffect } from "react";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import {
  Box,
  Button,
  Fab,
  Grid,
  IconButton,
  LinearProgress,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "@emotion/styled";
import { styled as selectStyle } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ProductReviewCard from "./ProductReviewCard";
import ProductRatingBox from "./ProductRatingBox";
import { best_sellers } from "../Data/best_sellers";
import HomeSectionCard from "../Section_card/HomeSectionCard";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProductById } from "../../../state/product/Action";
import { store } from "../../../state/store";
import { addItemToCart } from "../../../state/cart/Action";

const product = {
  name: "Basic Tee 6-Pack",
  price: "$192",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      src: "https://res.cloudinary.com/deq0hxr3t/image/upload/v1707742456/25_p6xalo.jpg",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://res.cloudinary.com/deq0hxr3t/image/upload/v1707742452/7_rr1ans.jpg",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://res.cloudinary.com/deq0hxr3t/image/upload/v1707742451/1_koyxla.jpg",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://res.cloudinary.com/deq0hxr3t/image/upload/v1707742456/26_lnmouu.jpg",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  colors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
  sizes: [
    { name: "XXS", inStock: false },
    { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
    { name: "2XL", inStock: true },
    { name: "3XL", inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};

const ratings = [
  {
    category: "Excellent",
    rayingValue: 70,
    color: "success",
  },
  {
    category: "Very Good",
    rayingValue: 50,
    color: "warning",
  },
  {
    category: "Good",
    rayingValue: 30,
    color: "primary",
  },
  {
    category: "Average",
    rayingValue: 20,
    color: "secondary",
  },
  {
    category: "Poor",
    rayingValue: 10,
    color: "error",
  },
];

const CssTextField = selectStyle(TextField)({
  "& label.Mui-focused": {
    color: "#500724",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#500724",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#500724",
    },
    "&:hover fieldset": {
      borderColor: "#500724",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#500724",
    },
  },
});

const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const param = useParams();
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]);
  const [selectedWeight, setSelectedWeight] = useState(products.product?.sizes[0]?.weight || '');

  useEffect(() => {
    const data = { productId: param.productId };
    dispatch(findProductById(data));
  }, [param.productId]);

  const handleAddToCart = (e) => {
    e.preventDefault();

    const data = { productId: param.productId, weight: selectedWeight }
    dispatch(addItemToCart(data))
    navigate("/cart");
  };

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#831843",
    },
    "& .MuiRating-iconHover": {
      color: "#500724",
    },
  });

  return (
    <div className="bg-white lg:px-20">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a
                    href={breadcrumb.href}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {ProductDetails.product?.title}
                  </a>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <p
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {products.product?.title}
              </p>
            </li>
          </ol>
        </nav>

        {/* Product details */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10">
          {/* Image gallery */}
          <div className="flex flex-col items-center">
            <div className="max-w-[30rem] max-h-[35rem] overflow-hidden rounded-lg">
              <img
                src={products.product?.imageUrls[0].imageUrl}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="flex flex-wrap">
              {products.product?.imageUrls.map((item) => (
                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg max-w-[5rem] max-h-[5rem] mt-4 ml-2">
                  <img
                    src={item.imageUrl}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="lg:col-span-1 max-h-auto max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24">
            <div className="lg:col-span-2 pb-3 border-b-2 border-pink-950">
              <h1 className="text-lg lg:text-2xl font-semibold text-gray-950">
                {products.product?.title}
              </h1>
              {/* Reviews */}
              <div className="mt-1">
                <div className="flex items-center space-x-3">
                  <StyledRating
                    name="rating"
                    value={3.5}
                    readOnly
                    precision={0.1}
                  />
                  <Typography variant="subtitle2" component="div">
                    48 reviews
                  </Typography>
                </div>
              </div>
            </div>

            {/* Options */}
            <div className="mt-3 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>

              <p className="mt-1 text-sm lg:text-sm text-gray-600">
                {products.product?.description}
              </p>

              <div className="flex space-x-5 items-center text-lg lg:text-xl text-gray-900 mt-3">
                <p className="font-semibold lg:text-2xl">
                  ₹ {products.product?.discountedPrice}
                </p>
                <p className="opacity-50 line-through lg:text-base">
                  ₹ {products.product?.price}
                </p>
                <p className="font-semibold text-green-600 lg:text-lg">
                  {products.product?.discountPercent}% off
                </p>
              </div>

              <form className="mt-10">
                <div className="flex items-center gap-5">
                  {/* Weight */}
                  <div className="flex flex-col gap-2">
                    <Typography
                      id="size-label"
                      sx={{ fontWeight: 600 }}
                      variant="body2"
                    >
                      Gross Weight
                    </Typography>

                    <Box
                      component="form"
                      sx={{
                        "& .MuiTextField-root": { mt: 1.5, width: "20ch" },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <CssTextField
                        id="outlined-select-weight"
                        select
                        label="Wieght"
                        defaultValue={selectedWeight}
                      >
                        {products.product?.sizes?.map((wt) => (
                          <MenuItem onClick={() => setSelectedWeight(wt.weight)} value={parseFloat(wt.weight.split("  ")[0])}>
                            {wt.weight}
                          </MenuItem>
                        ))}

                        {/* <MenuItem value={5.434}>5.434 g</MenuItem>
                        <MenuItem value={5.444}>5.444 g</MenuItem> */}
                      </CssTextField>
                    </Box>
                  </div>

                  {/* Size */}
                  <div className="flex flex-col gap-2">
                    <Typography
                      id="size-label"
                      sx={{ fontWeight: 600 }}
                      variant="body2"
                    >
                      Gross Size
                    </Typography>
                    <Box
                      component="form"
                      sx={{
                        "& .MuiTextField-root": { mt: 1.5, width: "20ch" },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <CssTextField
                        id="outlined-select-size"
                        select
                        label="Size"
                        defaultValue="S"
                      >
                        {product.sizes.map((item) => (
                          <MenuItem key={item.name} value={item.name}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </CssTextField>
                    </Box>
                  </div>

                  {/*  Quantity */}
                  {/* <div className="flex flex-col items-center justify-center gap-1">
                    <Typography
                      id="size-label"
                      sx={{ fontWeight: 600 }}
                      variant="body2"
                    >
                      Qty
                    </Typography>

                    <div className="flex items-center gap-1 justify-between">
                      <IconButton disabled={quantity <= 1} onClick={() => setQuantity(quantity - 1)}>
                        <Fab size="small" aria-label="add">
                          <RemoveIcon />
                        </Fab>
                      </IconButton>
                      <h1 className="text-lg font-semibold">{quantity}N</h1>
                      <IconButton>
                        <Fab size="small" aria-label="add" onClick={() => setQuantity(quantity + 1)}>
                          <AddIcon />
                        </Fab>
                      </IconButton>
                    </div>
                  </div> */}
                </div>

                {/* Sizes
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    Size guide
                  </a>
                </div>

                <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                  <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                  <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                    {product.sizes.map((size) => (
                      <RadioGroup.Option
                        key={size.name}
                        value={size}
                        disabled={!size.inStock}
                        className={({ active }) =>
                          classNames(
                            size.inStock
                              ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                              : 'cursor-not-allowed bg-gray-50 text-gray-200',
                            active ? 'ring-2 ring-indigo-500' : '',
                            'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                            {size.inStock ? (
                              <span
                                className={classNames(
                                  active ? 'border' : 'border-2',
                                  checked ? 'border-indigo-500' : 'border-transparent',
                                  'pointer-events-none absolute -inset-px rounded-md'
                                )}
                                aria-hidden="true"
                              />
                            ) : (
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                              >
                                <svg
                                  className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                  viewBox="0 0 100 100"
                                  preserveAspectRatio="none"
                                  stroke="currentColor"
                                >
                                  <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                </svg>
                              </span>
                            )}
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div> */}

                <Button
                  onClick={(e) => handleAddToCart(e)}
                  variant="contained"
                  type="submit"
                  sx={{
                    my: "2rem",
                    bgcolor: "#832729",
                    "&:hover": { bgcolor: "#500724" },
                  }}
                  className="flex w-4/12 uppercase items-center justify-center rounded-md border-none px-8 py-3 text-base font-medium text-white focus:outline-none "
                >
                  Add to Cart
                </Button>
              </form>
            </div>

            <div className="py-0 lg:col-span-2 lg:col-start-1 lg:border-t lg:border-b lg:border-gray-400 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Highlights and details */}
              <div className="mt-4">
                <h3 className="text-base font-medium text-gray-900">
                  Highlights
                </h3>

                <div className="mt-3">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    <li>
                      <span className="text-gray-600">
                        Color: {products.product?.color}
                      </span>
                    </li>
                    <li>
                      <span className="text-gray-600">
                        Brand: {products.product?.brand}
                      </span>
                    </li>
                    <li>
                      <span className="text-gray-600">
                        Occasion: {products.product?.occasion}
                      </span>
                    </li>
                    <li>
                      <span className="text-gray-600">
                        Product: {products.product?.category.name}
                      </span>
                    </li>
                    <li>
                      <span className="text-gray-600">
                        Jewellery type: {products.product?.type} jewellery
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-base font-medium text-gray-900">Details</h2>

                <div className="mt-3 mb-4 space-y-6">
                  <p className="text-sm text-gray-600">
                    {products.product?.details}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rating & Reviews */}
        <section className="mb-20">
          <h1 className="font-semibold text-lg pb-4">
            Recent Reviews & Ratings
          </h1>

          <div className="border p-5">
            <Grid container spacing={7}>
              {/* Review */}
              <Grid item xs={7}>
                <div className="space-y-5">
                  {[1, 1, 1].map((item) => (
                    <ProductReviewCard />
                  ))}
                </div>
              </Grid>

              {/* Rating */}
              <Grid item xs={5}>
                <h1 className="text-xl font-semibold pb-1">Product Rating</h1>

                <div className="flex items-center space-x-3">
                  <StyledRating value={4.6} precision={0.1} readOnly />
                  <p className="text-sm text-gray-600">5643 reviews</p>
                </div>

                <Box className="mt-5 space-y-5">
                  {ratings.map((item) => (
                    <ProductRatingBox
                      category={item.category}
                      ratingValue={item.rayingValue}
                      color={item.color}
                    />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </div>
        </section>

        {/* Similar Products */}
        <section className="mb-20">
          <h2
            style={{ letterSpacing: "1px" }}
            className="text-3xl font-semibold text-pink-950 text-center px-10"
          >
            You may also like
          </h2>
          <img
            src="https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw78fb320b/images/home/Line-Design.svg"
            className="w-full h-20 object-cover"
            alt=""
          />

          <div className="flex flex-wrap items-baseline justify-evenly space-y-10">
            {best_sellers.map((item) => (
              <HomeSectionCard product={item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
