import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, Button, Card, CardHeader, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../state/store";
import { deleteProduct, findProducts } from "../../state/product/Action";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 16,
    fontWeight: 600,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ProductsTable = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store);

  console.log("ProductsTable", products);
  console.log('product content length:', products.products?.content?.length)

  const handleProductDelete = (producttId) => {
    dispatch(deleteProduct(producttId));
  };

  useEffect(() => {
    try {
      const data = {
        category: "jewellery",
        color: [],
        minPrice: 0,
        maxPrice: 1000000,
        minDiscount: 0,
        maxDiscount: 100,
        sort: "low_to_high",
        pageNumber: 1,
        pageSize: products.products?.content?.length,
        occasion: [],
        type: [],
      };
      dispatch(findProducts(data));
    } catch (error) {
      console.error("Error in ProductsTable:", error);
    }
  }, [products?.deletedProduct]);

  return (
    <Card className="mt-2">
      <CardHeader title="All Products" />
      <Divider />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Image</StyledTableCell>
              <StyledTableCell align="left">Title</StyledTableCell>
              <StyledTableCell align="left">Category</StyledTableCell>
              <StyledTableCell align="left">Price</StyledTableCell>
              <StyledTableCell align="left">Type</StyledTableCell>
              <StyledTableCell align="left">Action</StyledTableCell>
              {/* <StyledTableCell align="left">Quantity</StyledTableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {products.products?.content?.map((item) => (
              <StyledTableRow key={item.title}>
                <StyledTableCell align="left">
                  <Avatar
                    sx={{ width: 60, height: 60 }}
                    src={item.imageUrls?.[0].imageUrl}
                  ></Avatar>
                </StyledTableCell>
                <StyledTableCell
                  sx={{ textTransform: "capitalize" }}
                  align="left"
                  component="th"
                  scope="item"
                >
                  {item.title}
                </StyledTableCell>
                <StyledTableCell
                  sx={{ textTransform: "capitalize" }}
                  align="left"
                >
                  {item.category.name}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {item.discountedPrice}
                </StyledTableCell>
                <StyledTableCell
                  sx={{ textTransform: "capitalize" }}
                  align="left"
                >
                  {item.type}
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Button
                    onClick={() => handleProductDelete(item._id)}
                    variant="outlined"
                    color="error"
                  >
                    Delete
                  </Button>
                </StyledTableCell>
                {/* <StyledTableCell align="left">{item.quantity}</StyledTableCell> */}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default ProductsTable;
