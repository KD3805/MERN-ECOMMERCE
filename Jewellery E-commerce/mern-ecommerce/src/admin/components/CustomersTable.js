import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Card, CardHeader, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../state/store";
import { deleteUserProfile, getAllUsers } from "../../state/auth/Action";
import Swal from 'sweetalert2'


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



const CustomersTable = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector(store => store);

  console.log("CustomersTable data", auth);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [auth.deletedUserId]);

  const handleDeleteUserProfile = async (userId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      dispatch(deleteUserProfile(userId));
    }
  };

  return (
    <Card className="mt-2">
      <CardHeader title="All Customers" />
      <Divider />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Index</StyledTableCell>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="left">Email</StyledTableCell>
              <StyledTableCell align="left">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {auth.users?.map((user, index) => (
              <StyledTableRow key={user._id}>
                <StyledTableCell align="left">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell
                  sx={{ textTransform: "capitalize" }}
                  align="left"
                  component="th"
                  scope="item"
                >
                  {user.firstName} {user.lastName}
                </StyledTableCell>
                <StyledTableCell
                  align="left"
                >
                  {user.email}
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Button
                    onClick={() => handleDeleteUserProfile(user._id)}
                    variant="outlined"
                    color="error"
                  >
                    REMOVE
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default CustomersTable;
