import react, { useState , useEffect } from "react";
import Navbar from "../../Navbar1/Navbar";
import "./Account.css";
// import { Table } from './Table';
import Search1 from "../../Search1/Search1";
import Footer from "../../Footer/Footer";
import { NavLink, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { auth, db } from "../../../fbconfig";
import GridContainer from "../../Grid/GridContainer";
import GridItem from "../../Grid/GridItem";
import { Col, Row } from "react-bootstrap";
import { Card, CardMedia, makeStyles } from "@material-ui/core";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { addDoc, collection, doc, getDocs, onSnapshot, query, updateDoc, where , orderBy} from "firebase/firestore";
 
const Account = () => {
  const navigate = useNavigate();
  const columns = [
    { id: "id", label: "Order id"  },
    { id: "fullName", label: "Name"  },
    { id: "zipCode", label: "Delivery Zipcode"  },
    { id: "couponCode", label: "Coupon"  },
    { id: "discountAmount", label: "Coupan Value"  },
    { id: "totalAmount", label: "Total"  },
    { id: "finalAmount", label: "Final Total"  },
    // { id: "createdAt", label: "Order Date & Time"  },
    { id: "status", label: "Status"  },

    
  ];

  function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
  }
 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [orders, setOrders]= useState([]);
   
  const ordersCollectionRef = collection(db ,"OrderHistory")
   
//   const getOrders= async()=>{
//     const data = await getDocs(ordersCollectionRef);
//     //console.log(data);
//     setOrders(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
//   };

const [isSubscribed, setSubscribed] = useState(true); 
  const [users, setUsers] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      firebaseUser ? setUsers(firebaseUser) : setUsers(null);
    });
    return () => unsubscribe();
  }, []);
  const getOrders = async () => {
    let orders=[];
    const orderRef = collection(db, 'OrderHistory');
    const ord = query(orderRef, where("userId", "==", users.uid) ,orderBy("createdAt", "desc"));
    // const ord = query(orderRef, where("user_id", "==", users.uid)
    // const neword = query(orderRef , orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(ord);
      
     querySnapshot.forEach((doc) => {
       console.log(doc.data())
      orders.push(doc.data())
  });
  setOrders(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  // return vender
  };
  const handleClick  = async(id) =>{
    navigate(`/orderDetails/${id}`)
  }
  
  useEffect(() => {
   
   if (users && users?.uid) {
    getOrders()
  }
 
    const unsubscribe = onSnapshot(collection(db, "OrderHistory"), (snapshot) => {
      // Respond to data
      // ...
      if(snapshot.docChanges().length > 0){
        getOrders()
      }
    });
    return () => { setSubscribed(false); unsubscribe()}
 
  }, [users])
  return (
    <div>
      <Navbar style={{ marginBottom: "300vw" }} />
      <div className="account11">
        {/* <div className="account-content"> */}
        <div className="left">
          <h3>Account</h3>
          <a href="/orderDetails">Order Details</a>
          <a href="/changepassword">Change Password</a>
          <a href="/updateProfile">Update Profile</a>
          <a href="/updateAddress">Update Address</a>
          <a href="/updateCardDetails">Update Card Details</a>
          <a
            onClick={() =>
              signOut(auth)
                .then(() => {
                  // Sign-out successful.
                  console.log("Sign-out successful");
                  localStorage.removeItem("authenticated");
                  navigate("/");
                })
                .catch((error) => {
                  // An error happened.
                  const errorCode = error.code;
                  console.log(errorCode);
                })
            }
          >
            Logout
          </a>
        </div>
        {/* <div className="Right"> */}
        {/* <br/><br/><h2>Order Details</h2><br/> */}

        {/* <Table />  */}
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table >
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {orders
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((order) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={order.code}
                        onClick={() => handleClick(order.id)}
                      >
                        {columns.map((column) => {
                          const value = order[column.id];
                          return (
                            <TableCell key={column.id} align={column.align} >
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={orders.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>

        {/* <table>
                        <tr>
                            <th>Order No.</th>
                            <th>Delivery Zipcode</th>
                            <th>Coupon</th>
                            <th>Coupon Value</th>
                            <th>Total</th>
                            <th>Discount</th>
                            <th>Final Total</th>
                            <th>Order Date & Time</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </table> */}
        {/* </div> */}
        {/* </div> */}
      </div>
      <Search1 />
      <Footer />
    </div>
  );
};
export default Account;
