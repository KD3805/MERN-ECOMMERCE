import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../../state/product/Action';
import { Grid, TextField, Button, Typography, styled, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#500724',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#500724',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#9ca3af',
    },
    '&:hover fieldset': {
      borderColor: '#500724',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#500724',
    },
  },
});

const initialImages = [{ imageUrl: '' }];
const initialSizes = [
  { weight: 'g', size: 'MM', stock: 0 },
];

const CreateProductForm = () => {
  const [productData, setProductData] = useState({
    imageUrls: initialImages,
    title: '',
    brand: '',
    color: '',
    discountedPrice: 0,
    price: 0,
    discountPercent: 0.0,
    description: '',
    details: '',
    occasion: '',
    quantity: 1,
    collectionName: '',
    type: '',
    sizes: initialSizes,
    topLevelCategory: '',
    secondLevelCategory: '',
    thirdLevelCategory: '',
  });

  const dispatch = useDispatch();

  // Function to handle changes in text fields
  const handleChange = async (e, index, type) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      const formData = new FormData();

      // Append each selected file to the FormData object
      for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i]);
      }

      formData.append('upload_preset', 'myCloud'); // Your Cloudinary upload preset

      // Upload images to Cloudinary
      fetch('https://api.cloudinary.com/v1_1/deq0hxr3t/image/upload', {
        method: 'POST',
        body: formData
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to upload images to Cloudinary');
          }
        })
        .then(data => {
          const newImageUrl = data.secure_url;

          // Update image URL in the productData state
          setProductData(prevProductData => {
            const updatedImageUrls = [...prevProductData.imageUrls];

            updatedImageUrls[index] = { imageUrl: newImageUrl };
            console.log("updatedImageUrls :::", updatedImageUrls)

            return { ...prevProductData, imageUrls: updatedImageUrls };
          });
          console.log("productData after new image added :::", productData)
        })
        .catch(error => {
          console.error(error.message);
        });

    }

    if (type === 'sizes') {
      const updatedSizes = [...productData.sizes];
      updatedSizes[index] = { ...updatedSizes[index], [name]: value };
      setProductData({ ...productData, sizes: updatedSizes });
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };

  // Function to add a new entry for image URLs
  const handleAddImageUrl = () => {
    setProductData((prevState) => ({
      ...prevState,
      imageUrls: [...prevState.imageUrls, { imageUrl: '' }],
    }));
  };

  // Function to add additional image input field
  const handleAddImageField = () => {
    setProductData((prevState) => ({
      ...prevState,
      imageUrls: [...prevState.imageUrls, { imageUrl: '' }] // Add an empty object for each new image input field
    }));
  };

  // Function to add a new entry for sizes
  const handleAddSize = () => {
    setProductData((prevState) => ({
      ...prevState,
      sizes: [...prevState.sizes, { weight: 'g', size: 'MM', stock: 0 }],
    }));
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(productData));
    setProductData({
      imageUrls: initialImages,
      title: '',
      brand: '',
      color: '',
      discountedPrice: 0,
      price: 0,
      discountPercent: 0.0,
      description: '',
      details: '',
      occasion: '',
      quantity: 1,
      collectionName: '',
      type: '',
      sizes: initialSizes,
      topLevelCategory: '',
      secondLevelCategory: '',
      thirdLevelCategory: '',
    })
    console.log('productData', productData);
  };

  return (
    <div className='p-10'>
      <Typography
        variant='h4'
        sx={{ textAlign: "center" }}
        className='py-10'
      >
        Add New Product
      </Typography>


      <form onSubmit={handleSubmit} className='createProductContainer min-h-screen'>

        <Grid container spacing={2}>

          <Grid item xs={12}>
            {productData.imageUrls.map((image, index) => (
              <Grid item xs={12} key={index}>
                <TextField
                  type='file'
                  name="imageUrl"
                  onChange={(e) => handleChange(e, index, 'imageUrls')}
                  fullWidth
                />
              </Grid>
            ))}

          </Grid>

          <Grid item xs={12}>
            <Button
              onClick={() => handleAddImageField()}
              sx={{ textTransform: "capitalize", fontSize: "1rem", marginBottom: "0.75rem" }}
              variant="outlined"
            >
              Add New Image
            </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label={`Title`}
              name="title"
              value={productData.title}
              onChange={(e) => handleChange(e)}
              fullWidth
              required
            />

          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Brand"
              name="brand"
              value={productData.brand}
              onChange={(e) => handleChange(e)}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Color</InputLabel>
              <Select
                label="Color"
                name='color'
                value={productData.color}
                onChange={(e) => handleChange(e)}
              >
                <MenuItem value="rose">Rose</MenuItem>
                <MenuItem value="rose-white">Rose & White</MenuItem>
                <MenuItem value="white">White</MenuItem>
                <MenuItem value="yellow">Yellow</MenuItem>
                <MenuItem value="yellow-rose">Yellow & Rose</MenuItem>
                <MenuItem value="yellow-white-rose">Yellow white & Rose</MenuItem>
              </Select>

            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Quantity"
              name="quantity"
              value={productData.quantity}
              onChange={(e) => handleChange(e)}
              required
            />
          </Grid>

          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Occasion</InputLabel>
              <Select
                label="Occasion"
                name='occasion'
                value={productData.occasion}
                onChange={(e) => handleChange(e)}
              >
                <MenuItem value="bridal">Bridal wear</MenuItem>
                <MenuItem value="casual">Casual wear</MenuItem>
                <MenuItem value="engagement">Engagement</MenuItem>
                <MenuItem value="modern">Modern wear</MenuItem>
                <MenuItem value="office">Office wear</MenuItem>
                <MenuItem value="traditional-ethenic">Traditional & ethenic wear</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Collection</InputLabel>
              <Select
                label="Collection"
                name='collectionName'
                value={productData.collectionName}
                onChange={(e) => handleChange(e)}
              >
                <MenuItem value="best-sellers">Bestsellers</MenuItem>
                <MenuItem value="reccomanded">Reccomanded</MenuItem>
                <MenuItem value="new-arrival">New Arriavals</MenuItem>
                <MenuItem value="dharohar">Dharohar</MenuItem>
                <MenuItem value="aksharam">Aksharam</MenuItem>
                <MenuItem value="gayatri">Gayatri</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Metal</InputLabel>
              <Select
                label="Metal"
                name='type'
                value={productData.type}
                onChange={(e) => handleChange(e)}
              >
                <MenuItem value="gold">Gold</MenuItem>
                <MenuItem value="silver">Silver</MenuItem>
                <MenuItem value="diamond">Diamond</MenuItem>
                <MenuItem value="platinum">Platinum</MenuItem>
                <MenuItem value="gemstone">Gemstone</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              value={productData.price}
              onChange={(e) => handleChange(e)}
              type='number'
              required
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Discounted Price"
              name="discountedPrice"
              value={productData.discountedPrice}
              onChange={(e) => handleChange(e)}
              type='number'
              required
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Discount Percentage"
              name="discountPercent"
              value={productData.discountPercent}
              onChange={(e) => handleChange(e)}
              type='number'
              required
            />
          </Grid>

          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Top level Category</InputLabel>
              <Select
                label="Top Level Category"
                name='topLevelCategory'
                value={productData.topLevelCategory}
                onChange={(e) => handleChange(e)}
              >
                <MenuItem value="gold">Gold Jewelry</MenuItem>
                <MenuItem value="silver">Silver Jewelry</MenuItem>
                <MenuItem value="diamond">Diamond Jewelry</MenuItem>
                <MenuItem value="platinum">Platinum Jewelry</MenuItem>
                <MenuItem value="gemstone">Gemstone Jewelry</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Second level Category</InputLabel>
              <Select
                label="Second Level Category"
                name='secondLevelCategory'
                value={productData.secondLevelCategory}
                onChange={(e) => handleChange(e)}
              >
                <MenuItem value="earrings">Earring</MenuItem>
                <MenuItem value="rings">Ring</MenuItem>
                <MenuItem value="nacklaces">Nacklace</MenuItem>
                <MenuItem value="best-sellers">Best Sellers</MenuItem>
                <MenuItem value="wedding">Wedding</MenuItem>
                <MenuItem value="other">Others</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Third level Category</InputLabel>
              <Select
                label="Third Level Category"
                name='thirdLevelCategory'
                value={productData.thirdLevelCategory}
                onChange={(e) => handleChange(e)}
              >
                <MenuItem value="bangle">Bangle</MenuItem>
                <MenuItem value="bracelet">Bracelet</MenuItem>
                <MenuItem value="chain">Chain</MenuItem>
                <MenuItem value="earring">Earring</MenuItem>
                <MenuItem value="mangal-sutra">Mangal Sutra</MenuItem>
                <MenuItem value="necklace">Necklace</MenuItem>
                <MenuItem value="pendant">Pendant</MenuItem>
                <MenuItem value="locket">Locket</MenuItem>
                <MenuItem value="ring">Ring</MenuItem>
                <MenuItem value="drop">Drop</MenuItem>
                <MenuItem value="hoop">Hoop</MenuItem>
                <MenuItem value="stud">Studs</MenuItem>
                <MenuItem value="jhumka">Jhumkas</MenuItem>
                <MenuItem value="eangagement-ring">Eangagement Ring</MenuItem>
                <MenuItem value="pearl-ring">Pearl Ring</MenuItem>
                <MenuItem value="bridal-ring">Bridal Ring</MenuItem>
                <MenuItem value="couple-ring">Couple Rings</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              id='outlined-multiline-description'
              label="Description"
              name="description"
              value={productData.description}
              onChange={(e) => handleChange(e)}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              id='outlined-multiline-details'
              label="Details"
              name="details"
              value={productData.details}
              onChange={(e) => handleChange(e)}
              required
            />
          </Grid>


          {/* Add dynamic fields for sizes */}
          {productData.sizes.map((size, index) => (
            <Grid container item spacing={3} key={index} className='mb-2'>
              <Grid item xs={12} sm={4}>
                <TextField
                  label={`Weight ${index + 1}`}
                  name="weight"
                  value={size.weight}
                  onChange={(e) => handleChange(e, index, 'sizes')}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label={`Size ${index + 1}`}
                  name="size"
                  value={size.size}
                  onChange={(e) => handleChange(e, index, 'sizes')}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label={`Stock ${index + 1}`}
                  name="stock"
                  type="number"
                  value={size.stock}
                  onChange={(e) => handleChange(e, index, 'sizes')}
                  fullWidth
                />
              </Grid>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button
              onClick={() => handleAddSize()}
              sx={{ textTransform: "capitalize", fontSize: "1rem", marginBottom: "0.75rem" }}
              variant="outlined"
            >
              Add New Size
            </Button>
          </Grid>

          {/* Add Submit button */}
          <Grid item xs={12} display={'flex'} justifyContent='center' alignItems='center'>
            <Button variant="contained" sx={{ p: 1.8 }} className='py-20' size='large' type="submit">
              Add New Product
            </Button>
          </Grid>

        </Grid>
      </form>
    </div>
  );
};

export default CreateProductForm;
