import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import {Button} from "react-bootstrap";
  
 
 
import ReactToPrint from "react-to-print";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../../fbconfig";
import {
  Card,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Switch,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { Link, useParams } from 'react-router-dom';
import GridContainer from "../../Grid/GridContainer";
import GridItem from "../../Grid/GridItem";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: 120,
  },
  content :{
      marginLeft : 100
  }
}));
export const ComponentToPrint = React.forwardRef((props, ref) => {
  const [orders, setOrders] = useState([]);
  const ordersCollectionRef = collection(db, "OrderHistory");

  const getOrders = async () => {
    const datasnap = await query(
      ordersCollectionRef,
      orderBy("createdAt", "desc")
    );
    const data = await getDocs(datasnap);
    //console.log(data);
    setOrders(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const [eachOrder, setEachOrder] = useState([]);

  const getEachOrder = async () => {
    const datasnap = await getDoc(doc(db, "OrderHistory", props.value));
    if (datasnap.exists()) console.log(datasnap.data());
    //console.log(data);
    setEachOrder({ ...datasnap.data(), id: doc.id });
  };

  const [isSubscribed, setSubscribed] = useState(true);

  useEffect(() => {
    getOrders();
    getEachOrder();
    return () => setSubscribed(false);
  }, []);
  console.log(eachOrder);
  const classes = useStyles();
  return (
    <div ref={ref}>
      <Card>
        <h4 style={{ textAlign: "center", color: "green" }}><b> CHICAGO GREEN <br></br><span style={{ textAlign: "center", color: "blue" }}>CLEANERS</span></b> </h4>
        <br></br>
        <h5 style={{ textAlign: "center", color: "red" }}>
          <b>Order Details</b>
        </h5>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12} >
            <Card className={classes.content}>
              <b>
                Order Id : &nbsp;&nbsp;&nbsp;
                {props.value}
              </b>
              <br></br>
              <b>
                fullName : &nbsp;&nbsp;&nbsp;
                {eachOrder.fullName}
              </b>
              <br></br>
              <b>
                email: &nbsp;&nbsp;&nbsp;
                {eachOrder.email}
              </b>
              <br></br>
              <b>
                phone: &nbsp;&nbsp;&nbsp;
                {eachOrder.phone}
              </b>
              <br></br>
              <b>
                Alternative Phone: &nbsp;&nbsp;&nbsp;
                {eachOrder.alternative}
              </b>
              <br></br>
              <b>
                Address: &nbsp;&nbsp;&nbsp;
                {eachOrder.address}
              </b>
              <br></br>
              <b>
                cardHolderName: &nbsp;&nbsp;&nbsp;
                {eachOrder.cardHolderName}
              </b>
              <br></br>{" "}
              <b>
                cardNumber: &nbsp;&nbsp;&nbsp;
                {eachOrder.cardNumber}
              </b>
              <br></br>
              <b>
                CVV: &nbsp;&nbsp;&nbsp;
                {eachOrder.cvv}
              </b>
              <br></br>
              <b>
                expiry: &nbsp;&nbsp;&nbsp;
                {eachOrder.expiry}
              </b>
              <br></br>
              <b>
                couponCode: &nbsp;&nbsp;&nbsp;
                {eachOrder.couponCode}
              </b>
              <br></br>
              <b>
                discountAmount: &nbsp;&nbsp;&nbsp;
                {eachOrder.discountAmount}
              </b>
              <br></br>
              <b>
                totalAmount: &nbsp;&nbsp;&nbsp;
                {eachOrder.totalAmount}
              </b>
              <br></br>
              <b>
                finalAmount: &nbsp;&nbsp;&nbsp;
                {eachOrder.finalAmount}
              </b>
              <br></br>
              <b>
                foldedOrHanged: &nbsp;&nbsp;&nbsp;
                {eachOrder.foldedOrHanged}
              </b>
              <br></br>
              <b>
                pickupTag: &nbsp;&nbsp;&nbsp;
                {eachOrder.pickupTag}
              </b>
              <br></br>
              <b>
                pickupTimeSlot: &nbsp;&nbsp;&nbsp;
                {eachOrder.pickupTimeSlot}
              </b>
              <br></br>
              <b>
                starchPref: &nbsp;&nbsp;&nbsp;
                {eachOrder.starchPref}
              </b>
         <br></br>
              <br></br>
              <h6>Pickup Address : </h6>
              <b>
                Address: &nbsp;&nbsp;&nbsp;
                {eachOrder && eachOrder.pickupAddress && eachOrder.pickupAddress.address}
              </b>
              <b>
               
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                ZipCode: &nbsp;&nbsp;&nbsp;
                {eachOrder && eachOrder.pickupAddress && eachOrder.pickupAddress.zipCode}
              </b>
              <br></br>
              <br></br>
              <h6>Drop Address : </h6>
              <b>
                Address: &nbsp;&nbsp;&nbsp;
                {eachOrder && eachOrder.dropAddress && eachOrder.dropAddress.address}
              </b>
              <b>
                {" "}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                ZipCode: &nbsp;&nbsp;&nbsp;
                {eachOrder && eachOrder.dropAddress && eachOrder.dropAddress.zipCode}
              </b>
              <br></br>  
              <br></br>
              <b>
                Pickup Date: &nbsp;&nbsp;&nbsp;
                {eachOrder.pickupDate}
              </b>
              <br></br>
              <b>
                Drop Date: &nbsp;&nbsp;&nbsp;
                {eachOrder.dropDate}
              </b>
              <br></br>
              <br></br>
              <h5>Items</h5>
              {eachOrder && eachOrder.items && eachOrder.items.map((e, i) => {
                return (
                  <div>
                    <b>Item Name : {e.item}</b>&nbsp;&nbsp;&nbsp;
                    <b>Price : {e.price}</b>&nbsp;&nbsp;&nbsp;
                    <b>Quantity : {e.quantity}</b>&nbsp;&nbsp;&nbsp;
                    <br></br>
                    <br></br>
                  </div>
                );
              })}  
            </Card>
          </GridItem>
        </GridContainer>
      </Card>{" "}
    </div>
  );
});

const PrintOrder = function () {
  const { id } = useParams();
  const componentRef = useRef();

  return (
    <div>
      <Card>
        <ComponentToPrint ref={componentRef} value={id} />

        <ReactToPrint
          trigger={() => (
            <Button  color="success">
              Download PDF!
            </Button>
          )}
          content={() => componentRef.current}
        />
      </Card>
    </div>
  );
};

export default PrintOrder;
