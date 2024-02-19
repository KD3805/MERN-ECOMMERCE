import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Fragment, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { best_sellers } from "../Data/best_sellers";
import ProductCard from "./productCard";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

const sortOptions = [
  // { name: 'Most Popular', href: '#', current: true },
  // { name: 'Best Rating', href: '#', current: false },
  // { name: 'Newest', href: '#', current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

// const subCategories = [
//   { name: 'Totes', href: '#' },
//   { name: 'Backpacks', href: '#' },
//   { name: 'Travel Bags', href: '#' },
//   { name: 'Hip Bags', href: '#' },
//   { name: 'Laptop Sleeves', href: '#' },
// ];

const rangeFilters = [
  {
    id: "price",
    name: "Price",
  },
  {
    id: "discount",
    name: "Discount",
  },
];

const filters = [
  {
    id: "product",
    name: "Product",
    options: [
      { value: "bangle", label: "Bangles", checked: false },
      { value: "bracelet", label: "Bracelets", checked: false },
      { value: "earring", label: "Earrings", checked: false },
      { value: "earring", label: "Pendants", checked: false },
      { value: "mangal-sutra", label: "Mangal sutra", checked: false },
      { value: "chains", label: "Chains", checked: false },
      { value: "necklace", label: "Necklaces", checked: false },
      { value: "ring", label: "Rings", checked: false },
    ],
  },
  {
    id: "type",
    name: "Jewellery Type",
    options: [
      { value: "diamond", label: "Diamond Jewellery", checked: false },
      { value: "gold", label: "Gold Jewellery", checked: false },
      { value: "silver", label: "Silver Jewellery", checked: false },
      { value: "gemstones", label: "Jewellery with Gemstones", checked: false },
      { value: "platinum", label: "Platinum Jewellery", checked: false },
    ],
  },
  {
    id: "color",
    name: "Color",
    options: [
      { value: "rose", label: "Rose", checked: false },
      { value: "rose-white", label: "Rose and White", checked: false },
      { value: "white", label: "White", checked: false },
      { value: "yellow", label: "Yellow", checked: false },
      { value: "yellow-white", label: "Yellow and White", checked: false },
      { value: "yellow-rose", label: "Yellow and Rose", checked: false },
      {
        value: "yellow-white-rose",
        label: "Yellow white and Rose",
        checked: false,
      },
    ],
  },
  {
    id: "occasion",
    name: "Occasion",
    options: [
      { value: "bridal", label: "Bridal wear", checked: false },
      { value: "casual", label: "Casual wear", checked: false },
      { value: "engagement", label: "Engagement", checked: false },
      { value: "modern", label: "Modern wear", checked: false },
      { value: "office", label: "Office wear", checked: false },
      {
        value: "traditional-ethenic",
        label: "Traditional and ethenic wear",
        checked: false,
      },
    ],
  },
  {
    id: "metal",
    name: "Metal",
    options: [
      { value: "gold", label: "Gold", checked: false },
      { value: "silver", label: "Silver", checked: false },
      { value: "platinum", label: "Platinum", checked: false },
    ],
  },
  // {
  //   id: 'category',
  //   name: 'Category',
  //   options: [
  //     { value: 'new-arrivals', label: 'New Arrivals', checked: false },
  //     { value: 'sale', label: 'Sale', checked: false },
  //     { value: 'travel', label: 'Travel', checked: true },
  //     { value: 'organization', label: 'Organization', checked: false },
  //     { value: 'accessories', label: 'Accessories', checked: false },
  //   ],
  // },
  // {
  //   id: 'price',
  //   name: 'Price',
  //   options: [
  //     { value: '5999-9999', label: 'White', checked: false },
  //     { value: '9999-19999', label: 'Beige', checked: false },
  //     { value: '19999-29999', label: 'Blue', checked: true },
  //     { value: '29999-39999', label: 'Brown', checked: false },
  //     { value: '39999-49999', label: 'Green', checked: false },
  //     { value: '49999-59999', label: 'Purple', checked: false },
  //     { value: '59999-69999', label: 'Purple', checked: false },
  //     { value: '69999-59999', label: 'Purple', checked: false },
  //   ],
  // },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Product() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [priceVal, setPriceVal] = useState([2000, 60000]);
  const [discountVal, setDiscountVal] = useState([5, 50]);
  const location = useLocation();
  const navigate = useNavigate();


  // Handle multiple filters on cards
  const handleFilters = (value, sectionId)  => {
    const searchParams = new URLSearchParams(location.search);

    let filterValue = searchParams.getAll(sectionId);

    if(filterValue.length>0 && filterValue[0].split(',').includes(value)) {
      filterValue = filterValue[0].split(',').filter((item)=> item !== value);

      if(filterValue.length===0) {
        searchParams.delete(sectionId)
      }
    }
    else {
      filterValue.push(value)
    }

    if(filterValue.length>0) {
      searchParams.set(sectionId, filterValue.join(','));
    }

    const query = searchParams.toString();
    navigate({search:`?${query}`});
  }


  // Handle PRICE range filters on cards
  const handlePriceRangeFilter = (sectionId) => {
    const searchParams = new URLSearchParams(location.search);

    searchParams.set(sectionId, priceVal);
    const query = searchParams.toString();
    navigate({search:`?${query}`});
  }

  // Handle DISCOUNT range filters on cards
  const handleDiscountRangeFilter = (sectionId) => {
    const searchParams = new URLSearchParams(location.search);

    searchParams.set(sectionId, discountVal);
    const query = searchParams.toString();
    navigate({search:`?${query}`});
  }

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    <ul
                      role="list"
                      className="px-2 py-3 font-medium text-gray-900"
                    >
                      {/* {subCategories.map((category) => (
                        <li key={category.name}>
                          <a href={category.href} className="block px-2 py-3">
                            {category.name}
                          </a>
                        </li>
                      ))} */}
                    </ul>

                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto px-4 sm:px-6 lg:px-20">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              New Arrivals
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <ul
                  role="list"
                  className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                >
                  {/* {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href}>{category.name}</a>
                    </li>
                  ))} */}
                </ul>


                {/* Price range slider */}
                <Disclosure
                  as="div"
                  key='price'
                  className="border-b border-gray-200 py-6"
                >
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            Price
                          </span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <PlusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-4">
                          <RangeSlider
                            onThumbDragEnd={(e)=>handlePriceRangeFilter('price')}
                            value={priceVal}
                            onInput={setPriceVal}
                            min={1000}
                            max={120000}
                            step={5}
                            id="range-slider-price"
                          />

                          <div className="d-flex pt-2 pb-2 priceRange">
                            <span>
                              From:{" "}
                              <strong className="text-pink-800">
                                Rs: {priceVal[0]}
                              </strong>
                            </span>
                            <span className="ml-auto">
                              From:{" "}
                              <strong className="text-pink-800">
                                Rs: {priceVal[1]}
                              </strong>
                            </span>
                          </div>
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>

                {/* Discount range slider */}
                <Disclosure
                  as="div"
                  key='discount'
                  className="border-b border-gray-200 py-6"
                >
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            Discount
                          </span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <PlusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-4">
                          <RangeSlider
                            onThumbDragEnd={(e)=>handleDiscountRangeFilter('discount')}
                            value={discountVal}
                            onInput={setDiscountVal}
                            min={10}
                            max={90}
                            step={1}
                            id="range-slider-discount"
                          />

                          <div className="d-flex pt-2 pb-2 priceRange">
                            <span>
                              From:{" "}
                              <strong className="text-pink-800">
                                {discountVal[0]} %
                              </strong>
                            </span>
                            <span className="ml-auto">
                              From:{" "}
                              <strong className="text-pink-800">
                                {discountVal[1]} %
                              </strong>
                            </span>
                          </div>
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>

                {/* Multiple checkbox filter */}
                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  onChange={()=>handleFilters(option.value, section.id)}
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600 cursor-pointer"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-4 w-full">
                <div className="flex flex-wrap justify-center bg-white py-3">
                  {best_sellers.map((item) => (
                    <ProductCard product={item} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
