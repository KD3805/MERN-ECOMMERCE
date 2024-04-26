import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, AvatarGroup, Button, Card, CardHeader, Divider, Menu, MenuItem, alpha } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../state/store";
import { getOrders } from '../../state/admin/order/Action';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1e293b",
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


const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));



const OrdersTableView = () => {
  const [anchorEl, setAnchorEl] = React.useState([]);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const { adminOrder } = useSelector(store => store);
  const len = adminOrder.orders?.length;

  const handleClick = (event, index) => {
    const newAnchorElArray = [...anchorEl]
    newAnchorElArray[index] = event.currentTarget
    setAnchorEl(newAnchorElArray)
  };

  const handleClose = (index) => {
    const newAnchorElArray = [...anchorEl]
    newAnchorElArray[index] = null
    setAnchorEl(newAnchorElArray)
  };

  useEffect(() => {
    dispatch(getOrders());
  }, [adminOrder.confirmed, adminOrder.shipped, adminOrder.delivered, adminOrder.deletedOrder])

  return (
    <div className="p-2">
      <Card className="mt-2">
        <CardHeader title="Recent Orders" />
        <Divider />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Image</StyledTableCell>
                <StyledTableCell align="left">Order Items</StyledTableCell>
                <StyledTableCell align="left">Quantity</StyledTableCell>
                <StyledTableCell align="left">Total Price</StyledTableCell>
                <StyledTableCell align="left">Discount</StyledTableCell>
                <StyledTableCell align="left">Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {adminOrder.orders?.slice(len-5, len).map((item, index) => (
                <StyledTableRow key={item._id}>
                  <StyledTableCell align="left">
                    <AvatarGroup max={3} sx={{ justifyContent: "start" }}>
                      {item.orderItems?.map((orderItem, index) => (
                        <Avatar
                          key={index}
                          src={orderItem.product?.imageUrls?.[0].imageUrl}
                        />
                      ))}
                    </AvatarGroup>
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{ textTransform: "capitalize" }}
                    align="left"
                    component="th"
                    scope="item"
                  >
                    {item.orderItems?.map((orderItem, i) => (
                      <p key={i}> {i + 1}. {orderItem.product?.title} </p>
                    ))}
                  </StyledTableCell>

                  <StyledTableCell
                    align="left"
                  >
                    {item.totalItem}
                  </StyledTableCell>

                  <StyledTableCell align="left">
                    {item.totalPrice}
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                  >
                    {item.discount}%
                  </StyledTableCell>
                  <StyledTableCell>
                  <button
                    className={`
                      text-white text-xs font-semibold rounded-md p-2 flex items-center justify-center border-none focus:outline-none
                      ${item.orderStatus === 'CONFIRMED' ? "bg-[#369236]" :
                      item.orderStatus === 'SHIPPED' ? "bg-[#4141ff]" :
                      item.orderStatus === 'PLACED' ? "bg-[#02B290]" :
                      item.orderStatus === 'PENDING' ? "bg-[#a3a3a3]" :
                      "bg-[#831843]" 
                    }`}
                  >
                    {item.orderStatus}
                  </button>
                  </StyledTableCell>

                  {/* <StyledTableCell align="left">{item.quantity}</StyledTableCell> */}
                </StyledTableRow>
              ))}
            </TableBody>

          </Table>
        </TableContainer>
      </Card>
    </div>
  )
}

export default OrdersTableView
