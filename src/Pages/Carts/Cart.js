import {
  arrayRemove,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  updateDoc,
  addDoc,
  Timestamp,
} from "@firebase/firestore";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { auth, db } from "../../fbconfig";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import Navbar from "../../Components/Navbar1/Navbar";
import "./cart.css";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useAuth } from "../../auth/useAuth";
import { Card, CardMedia, makeStyles } from "@material-ui/core";
import { onAuthStateChanged } from "firebase/auth";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 160,
  },
  media: {
    // height: 240,
    minWidth: 150,
  },
  mar: {
    margin: theme.spacing(2),
  },
}));
const Cart = ({ subTypesModal, setSubTypesModal }) => {
  const { user } = useAuth();
  const classes = useStyles();
  const [users, setUsers] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      firebaseUser ? setUsers(firebaseUser) : setUsers(null);
    });
    return () => unsubscribe();
  }, []);

  const [userCartItems, setUserCartItems] = useState([]);
  const [userData, setUserData] = useState(null);
  const [nonSubServices, setNonSubServices] = useState([]);
  const [couponsList, setCouponsList] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [tipAmount, setTipAmount] = useState(0);
  const [loadingCart, setLoadingCart] = useState(false);
  const [dateTime, setDateTime] = useState(new Date().getTime());
  const [description, setDescription] = useState("");
  const [paymentMode, setPaymentMode] = useState("COD");
  const [state, setState] = useState({
    fullName: "",
    email: "",
    alternative: "",
    phone: "",
    address: "",
    cardHolderName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    foldedOrHanged:"",
    pickupTag:"",
    starchPref:"",
    dropAddress: {
      address: "",
      tag: "",
      zipCode: "",
    },
    pickupAddress: {
      address: "",
      tag: "",
      zipCode: "",
    },
  });

  const [totalPrice, setTotalPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const handleIncrement = async (e) => {
    e.quantity += 1;
    const userCartRef = doc(db, "users", users.uid);

    // push updated cart items to db
    await updateDoc(userCartRef, { carts: userCartItems });
    // alert('Item added to Cart')
    fetchCartItems();
  };

  const handleDecrement = async (e) => {
    // console.log(e)
    // e.preventDefault();
    if (e.quantity > 1) {
      e.quantity -= 1;
      const userCartRef = doc(db, "users", users.uid);

      // push updated cart items to db
      await updateDoc(userCartRef, { carts: userCartItems });
      fetchCartItems();
    }
    // alert('Item added to Cart')
  };
  const changeCreds = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "OrderHistory"), {
      ...state,
      items: userCartItems,
      userId: users && user.uid ? users.uid : "",
      createdAt: Timestamp.now(),
      totalAmount: totalPrice ,
       finalAmount : totalPrice - discountPrice,
       couponCode : appliedCoupon && appliedCoupon.coupon && appliedCoupon.coupon.code ?  appliedCoupon.coupon.code :"",
       discountAmount : discountPrice
    });
    setTotalPrice(0)
    setDiscountPrice(0)
    const userCartRef = doc(db, "users", users.uid);

    // push updated cart items to db
    await updateDoc(userCartRef, {cardHolderName : state?.cardHolderName , cardNumber : state?.cardNumber , cvv : state?.cvv ,expiry :state?.expiry,  pickupAddress: {address : state.pickupAddress.address , zipCode : state.pickupAddress.zipCode}, dropAddress: {address : state.dropAddress.address , zipCode : state.dropAddress.zipCode}});
    // alert("Order Placed Successfully");
    setPlacedMessage({
      status: true,
      message: "Congratulations for placing this order \n\n\n Please follow us on Facebbok and Instagram for special offer updates",
    });
    handleOpenOrderPlacedModal()
    userCartItems.length && (
      userCartItems.map((mCartItem, index) => (
         deleteCartItem(mCartItem) 
                 
      ))
    )
    navigate("/orderDetails");
  };
  const handleOpenSubTypesModal = () => setSubTypesModal(true);
  const handleCloseSubTypesModal = () => {
    setTipAmount(0);
    setAppliedCoupon(null);
    setSubTypesModal(false);
  };

  const [congratsModal, setCongratsModal] = useState(false);
  const handleOpenCongratsModal = () => setCongratsModal(true);
  const handleCloseCongratsModal = () => setCongratsModal(false);

  const [subStatusModal, setSubStatusModal] = useState(false);
  const handleOpenSubStatusModal = () => setSubStatusModal(true);
  const handleCloseSubStatusModal = () => setSubStatusModal(false);

  const [dateTimeModal, setDateTimeModal] = useState(false);
  const handleOpenDateTimeModal = () => setDateTimeModal(true);
  const handleCloseDateTimeModal = () => setDateTimeModal(false);

  const [locationModal, setLocationModal] = useState(false);
  const handleOpenLocationModal = () => setLocationModal(true);
  const handleCloseLocationModal = () => setLocationModal(false);

  const [paymentModal, setPaymentModal] = useState(false);
  const handleOpenPaymentModal = () => setPaymentModal(true);
  const handleClosePaymentModal = () => setPaymentModal(false);

  const [thankYouModal, setThankYouModal] = useState(false);
  const handleOpenThankYouModal = () => setThankYouModal(true);
  const handleCloseThankYouModal = () => setThankYouModal(false);


  const [orderPlacedModal, setOrderPlacedModal] = useState(false);
  const handleOpenOrderPlacedModal = () => setOrderPlacedModal(true);
  const handleCloseOrderPlacedModal = () => setOrderPlacedModal(false);

  const [placedMessage, setPlacedMessage] = useState({
    status: false,
    message: "",
  });




  const [congratsMessage, setCongratsMessage] = useState({
    status: false,
    message: "",
  });

  useEffect(() => {
    if (congratsMessage.message) {
      handleOpenCongratsModal();
      handleCloseCouponModal();
    }
  }, [congratsMessage]);

  useEffect(() => {
    if (users && users?.uid) {
      fetchCartItems();
      fetchAllCoupons();
    }
  }, [users, subTypesModal]);

  const [couponModal, setCouponModal] = useState(false);
  const handleOpenCouponModal = () => {
    setCouponModal(true);
  };
  const handleCloseCouponModal = () => setCouponModal(false);

  const fetchAllCoupons = async () => {
    const couponsRef = collection(db, "coupons");
    const querySnapshot = await getDocs(couponsRef);
    const mCouponsList = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      mCouponsList.push({ id: doc.id, ...doc.data() });
    });
    setCouponsList(mCouponsList);
    console.log(mCouponsList);
  };

  const fetchCartItems = async () => {
    if (!users || !users.uid) {
      return;
    }
    const userCartRef = doc(db, "users", users.uid);
    const userSnap = await getDoc(userCartRef);
    if (
      userSnap.exists() &&
      userSnap.data().carts &&
      userSnap.data().carts.length
    ) {
      var total = 0;
      userSnap.data().carts.forEach((item) => {
        total += item.price * item.quantity;
      });
      setTotalPrice(total);
      console.log(total);
      setUserCartItems(userSnap.data().carts);
      console.log(userSnap.data())
      setUserData(userSnap.data());
      state.fullName = userSnap.data()["fullName"];
      state.email = userSnap.data()["email"];
      state.address = userSnap.data()["currentAddress"]["address"];
      state.phone = userSnap.data()["phoneNumber"];
      state.cardHolderName = userSnap.data()["cardHolderName"];
      state.cardNumber = userSnap.data()["cardNumber"];
      state.cvv = userSnap.data()["cvv"];
      state.expiry = userSnap.data()["expiry"];
      state.dropAddress.address = userSnap.data()["dropAddress"]["address"];
      state.dropAddress.zipCode = userSnap.data()["dropAddress"]["zipCode"];
      state.pickupAddress.address = userSnap.data()["pickupAddress"]["address"];
      state.pickupAddress.zipCode = userSnap.data()["pickupAddress"]["zipCode"];
    } else {
      setUserCartItems([]);
    }
  };

  const deleteCartItem = async (mCartItem) => {
    // let tempCartItems = [...userCartItems];
    // tempCartItems = tempCartItems.filter(
    //   (mCart) => mCartItem.sub_type_id !== mCart.sub_type_id
    // );

    setLoadingCart(true);
    // push this to db
    const userCartRef = doc(db, "users", users.uid);
    await updateDoc(userCartRef, { carts: arrayRemove(mCartItem) });
    await fetchCartItems();
    setLoadingCart(false);
  };

  const checkCouponValidity = async (mCoupon) => {
  
    setDiscountPrice(mCoupon.discount)
    let val1 = mCoupon.discount
    setCongratsMessage({
      status: true,
      message: `Congrats! You saved $ ${mCoupon.discount}`,
    });
    setAppliedCoupon({
      status: true,
      coupon: mCoupon,
      val1
    });
  
    
  };

  return (
    <div>
      <Navbar />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      {/* Place Booking Modal */}
      {/* <Modal
        show={true}
        onHide={handleCloseSubTypesModal}
        size="lg"
        className="place_booking_popup"
        id="exampleModa2"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        centered
      > */}
      {/* <div className="cho btn-danger " onClick={() => navigate('/orderDetails')} style={{ borderRadius: "1em" , marginTop: "10px" , marginLeft: "80px" ,height :"40px" , width : "140px"}}>
      <span className="ripple27" >ORDER DETAILS</span></div> */}
      <div className="modal-dialog-centered">
        <div
          className="modal-dialog-centered"
          style={{
            maxHeight: "100%",
            overflowY: "auto",
            width: "80%",
            margin: "5px auto",
          }}
        >
          <div className="modal-content">
            <div className="modal-body">
              <div className="place_product_main">
                <div className="row">
                  {!loadingCart ? (
                    userCartItems.length ? (
                      userCartItems.map((mCartItem, index) => (
                        <div className="cartitem">
                          <div className="cartitemWrapper">
                            <div className="chleft">
                              <img
                                className="cartHeaderImg"
                                src={mCartItem.img}
                                alt="product image"
                              />
                              <div className="headerText">
                                <h4>{mCartItem.item}</h4>
                                <span className="ciPrice">
                                  Price: ${mCartItem.price}/-
                                </span>

                                <span
                                  className="removeCart"
                                  onClick={() => deleteCartItem(mCartItem)}
                                >
                                  Remove
                                </span>
                              </div>
                            </div>
                            <div className="secDiv">
                              <div className="chmid">
                                <div className="quanHandler">
                                  <button
                                    className="idButton"
                                    onClick={() => handleDecrement(mCartItem)}
                                  >
                                    -
                                  </button>
                                  <span className="idTest">
                                    {mCartItem.quantity}
                                  </span>
                                  <button
                                    className="idButton"
                                    onClick={() => handleIncrement(mCartItem)}
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                              <div className="chright">
                                <span className="ciPrice">
                                  ${mCartItem.price * mCartItem.quantity}/-
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <span className="p-4">No Cart Items Found!</span>
                    )
                  ) : (
                    <div
                      className="row"
                      style={{
                        width: "100%",
                        justifyContent: "center",
                        margin: "1em 0px",
                      }}
                    >
                      <div className="spinner-border"></div>
                    </div>
                  )}
                  <div className="col-12 d-flex justify-content-center">
                    <h3>
                      <label>Total price : $</label>
                      {totalPrice}
                    </h3>
                  </div>
                  <br></br><br></br>
                  <div className="col-12 d-flex justify-content-center">
                    <h3>
                      <label>Final price : $</label>
                      {totalPrice - discountPrice}
                    </h3>
                  </div>
                  <div className="col-12 d-flex justify-content-center">
                    <button
                      style={{ backgroundColor: "#c9002b", border: "none" }}
                      type="button"
                      className="btn btn-primary m-2"
                      onClick={() => navigate("/services")}
                    >
                      Add more items!
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 place_right_main">
                <div className="row">
                  {/* if nonSubServices array is empty then show bill details */}
                  {userCartItems && userCartItems.length ? (
                    <>
                      <div className="col-12 add_coupons">
                        <div className="booking_product_inr">
                          <button className="btn" onClick={handleOpenCouponModal}>
                            ADD COUPONS{" "}
                            <i
                              className="fa fa-chevron-right"
                              aria-hidden="true"
                            ></i>
                          </button>
                          {appliedCoupon &&
                          appliedCoupon.status &&
                          appliedCoupon.coupon ? (
                            <button
                              type="button"
                              className="btn btn-primary"
                              style={{ color: "green" }}
                            >
                              {appliedCoupon.coupon.code}
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="btn btn-primary"
                              // data-toggle="modal"
                              // data-target="#exampleModa4"
                              onClick={handleOpenCouponModal}
                            >
                              ADD COUPONS
                            </button>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="col-12 text-center">
                <button
                  type="button"
                  className="btn btn-primary place_btnn"
                  onClick={() => {
                    handleOpenDateTimeModal();
                  }}
                  disabled={!userCartItems.length}
                  // data-toggle="modal"
                  // data-target="#exampleModa7"
                >
                  Place Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </Modal> */}
      {/* END BOOKING MODAL */}

      {/* APPLY COUPOBNS */}
      <Modal
        show={couponModal}
        onHide={handleCloseCouponModal}
        className="modal fade apply_coupons_model"
        id="exampleModa4"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="apply_coupons_main">
                <button className="btn header_back_modal"  onClick={handleCloseCouponModal}>
                  <i
                   
                    className="fa fa-arrow-left"
                    aria-hidden="true"
                  ></i>{" "}
                  Back
                </button>
                <div className="enter_cooupon_code">
                  <input
                    type="text"
                    id="code"
                    className="storeregInput"
                    name="code"
                    value={state.code}
                    onChange={(event) => changeCreds(event)}
                    placeholder="Enter Coupon Code"
                  />
                  <button
                    type="button"
                    className="btn btn-info"
                    // data-toggle="modal"
                    // data-target="#exampleModa5"
                    // data-dismiss="modal"
                    onClick={() => {
                      console.log(state.code)
                      var containItem = couponsList.find((element) => {
                        return element.code === state.code;
                      });
                      if (containItem){
                        console.log(containItem.discount)
                        setDiscountPrice(containItem.discount)
                        let val1 = containItem.discount
                        setCongratsMessage({
                          status: true,
                          message: `Congrats! You saved $ ${containItem.discount}`,
                        });
                        setAppliedCoupon({
                          status: true,
                          coupon: containItem,
                          val1
                        });
                        
                        }
                        
                    }
                    
                    }
                  >
                    Apply
                  </button>
                </div>
                {/* <h3>Applicable coupons</h3>
                {couponsList && couponsList.length
                  ? couponsList.map((mCoupon) => (
                      <div className="applicable_coupons">
                        <h5>{mCoupon.code}</h5>
                        <p className="d-flex justify-content-between align-items-center">
                           
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => checkCouponValidity(mCoupon)}
                            disabled={new Date() > new Date(mCoupon.validity)}
                            // data-toggle="modal"
                            // data-target="#exampleModa5"
                          >
                            Apply
                          </button>
                        </p>
                      </div>
                    ))
                  : ""} */}
              </div>
            </div>
          </div>
        </div>
      </Modal>
      {/* END APPLY COUPOBNS */}

      {/* CONGRATS */}
      <Modal
        show={congratsModal}
        onHide={handleCloseCongratsModal}
        className="congrats_model you_save_aed_10"
        id="exampleModa5"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        centered
      >
        <div className="modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              {/* {congratsMessage.status ? (
                  <img className="img-fluid" src={noto} alt="dd" />
                ) : (
                  ""
                )} */}
              <h4>{congratsMessage.message}</h4>
            </div>
            <button
              type="button"
              className="btn btn-info"
              onClick={() => {
                  setCongratsMessage({ status: false, message: "" });
                  handleCloseCongratsModal();
                }}
              // data-toggle="modal"
              // data-target="#exampleModa3"
              // data-dismiss="modal"
            >
              <i
                class="fa fa-times"
                aria-hidden="true"
                
              ></i>
            </button>
          </div>
        </div>
      </Modal>
      {/* CONGRATS */}


{/* Order Placed */}
<Modal
        show={orderPlacedModal}
        onHide={handleCloseOrderPlacedModal}
        className="congrats_model you_save_aed_10"
        id="exampleModa5"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        centered
      >
        <div className="modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              {/* {congratsMessage.status ? (
                  <img className="img-fluid" src={noto} alt="dd" />
                ) : (
                  ""
                )} */}
              <h4>{placedMessage.message}</h4>
            </div>
            <button
              type="button"
              className="btn btn-info"
              onClick={() => {
                  setPlacedMessage({ status: false, message: "" });
                  handleCloseOrderPlacedModal();
                }}
            >
              <i
                class="fa fa-times"
                aria-hidden="true"
                
              ></i>
            </button>
          </div>
        </div>
      </Modal>
      {/* Order Placed */}

      {/* DATE TIME MODAL */}
      <Modal
        show={dateTimeModal}
        onHide={handleCloseDateTimeModal}
        className="fade payment_modal_design "
        id="exampleModa9"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog-centered ">
          <div className="modal-content modal11">
            <div className="modal-body">
              <div className="apply_coupons_main">
                <button className="btn header_back_modal" onClick={handleCloseDateTimeModal}>
                  <i
                    
                    className="fa fa-arrow-left"
                    aria-hidden="true"
                  ></i>{" "}
                  Details
                </button>
              </div>
              <div className="date_and_time_body">
                <div className="row row1">
                  <div className="col-3">
                    {" "}
                    <label><b>Name</b></label>{" "}
                  </div>
                  <div className="col-3">
                    {" "}
                    <div className="divinput">
                      <input
                        type="text"
                        required
                        id="name"
                        className="storeregInput"
                        name="name"
                        value={state.fullName}
                        onChange={(event) => changeCreds(event)}
                      required/>
                    </div>
                  </div>
                </div>
                <div className="row row1">
                  <div className="col-3">
                    {" "}
                    <label><b>Email</b></label>{" "}
                  </div>
                  <div className="col-3">
                    {" "}
                    <div className="divinput">
                      <input
                        type="text"
                        required
                        id="email"
                        name="email"
                        className="storeregInput"
                        value={state.email}
                        onChange={(event) => changeCreds(event)}
                      required/>
                    </div>
                  </div>
                </div>

                <div className="row row1">
                  <div className="col-3">
                    {" "}
                    <label><b>Number</b></label>{" "}
                  </div>
                  <div className="col-3">
                    {" "}
                    <div className="divinput">
                      <input
                        type="text"
                        required
                        id="mobile"
                        name="mobile"
                        className="storeregInput"
                        value={state.phone}
                        onChange={(event) => changeCreds(event)}
                      required/>
                    </div>
                  </div>
                </div>
                <div className="row row1">
                  <div className="col-3">
                    {" "}
                    <label><b>Alternate Number</b></label>{" "}
                  </div>
                  <div className="col-3">
                    {" "}
                    <div className="divinput">
                      <input
                        type="text"
                        required
                        id="alternative"
                        name="alternative"
                        className="storeregInput"
                        value={state.alternative}
                        onChange={(event) => changeCreds(event)}
                      required/>
                    </div>
                  </div>
                </div>

                {/* <div className="row row1">
                  <div className="col-3">
                    {" "}
                    <label> Address</label>{" "}
                  </div>
                  <div className="col-3">
                    {" "}
                    <div className="divinput">
                      <input
                        type="text"
                        required
                        id="address"
                        name="address"
                        className="storeregInput"
                        value={state.address}
                        onChange={(event) => changeCreds(event)}
                      />
                    </div>
                  </div>
                </div> */}

                {/* <div className="row row1">
                  <div className=" col-3">
                    {" "}
                    <label>Zip Code</label>{" "}
                  </div>
                  <div className="col-3">
                    {" "}
                    <div className="divinput">
                      <input
                        type="text"
                        required
                        id="zip"
                        name="zip"
                        className="storeregInput"
                        value={state.zip}
                        onChange={(event) => changeCreds(event)}
                      />
                    </div>{" "}
                  </div>
                </div> */}
                <div className="row row1">
                  <div className=" col-3">
                    {" "}
                    <label><b>Pickup Tag</b></label>{" "}
                  </div>
                  <div className="col-3">
                    {" "}
                    <div className="divinput">
                      <FormControl variant="outlined">
                        <InputLabel>PickupTag</InputLabel>
                        <Select
                          id="pickupTag"
                          name="pickupTag"
                          value={state.pickupTag}
                          className={classes.formControl}
                          label="pickupTag"
                          onChange={(event) => changeCreds(event)}
                        required>
                          <MenuItem value="Leaving it outside in front porch or back porch">
                            Leaving it outside in front porch or back porch
                          </MenuItem>
                          <MenuItem value="Leaving it with the doorman">
                            Leaving it with the doorman
                          </MenuItem>
                          <MenuItem value="Someone will be available at home during pickup">
                            Someone will be available at home during pickup
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </div>{" "}
                  </div>
                </div>
                <div className="row row1">
                  <div className=" col-3">
                    {" "}
                    <label><b>Select Time Slot</b></label>{" "}
                  </div>
                  <div className="col-3">
                    {" "}
                    <div className="divinput">
                      <FormControl variant="outlined" halfWidth>
                        <InputLabel>Time Slot</InputLabel>
                        <Select
                          id="pickupTimeSlot"
                          name="pickupTimeSlot"
                          value={state.pickupTimeSlot}
                          className={classes.formControl}
                          label="pickupTimeSlot"
                          onChange={(event) => changeCreds(event)}
                        required>
                          <MenuItem value="9:00 am - 5:00 pm">
                            9:00 am - 5:00 pm
                          </MenuItem>
                          <MenuItem value="5:00 pm - 10:00 pm">
                            5:00 pm - 10:00 pm
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </div>{" "}
                  </div>
                </div>

                <div className="row justify-content-end m-0">
                  <button
                    type="button"
                    className="btn btn-primary next_btnn contBtn"
                    onClick={() => {
                      if(state.pickupTag =="" || state.alternative =="" || state.pickupTimeSlot==""){
                        alert('Complete all fields')
                        return
                      }
                      handleOpenThankYouModal();
                      handleCloseDateTimeModal();
                    }}
                    // data-toggle="modal"
                    // data-target="#exampleModa10"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      {/* DATE TIME MODAL */}

      {/* CONFIRM  location Modal */}

      {/* PAYMENT MODAL */}
      <Modal
        show={paymentModal}
        onHide={handleClosePaymentModal}
        className="fade payment_modal_design"
        id="exampleModa9"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="apply_coupons_main">
                <button className="btn header_back_modal" onClick={() => {
                  
                    handleClosePaymentModal()
                    handleOpenThankYouModal();
                  }}>
                  <i
                    className="fa fa-arrow-left"
                    aria-hidden="true"
                    
                    
                  ></i>{" "}
                  Payment Details
                </button>
              </div>

              <div className="payment_modal_design_body">
                <div className="row row1">
                  <div className="col-3">
                    {" "}
                    <label><b>Card Holder Name</b></label>{" "}
                  </div>

                  <div className="col-3">
                    {" "}
                    <div className="divinput">
                      <input
                        type="text"
                        required
                        id="cardHolderName"
                        name="cardHolderName"
                        className="storeregInput"
                        value={state.cardHolderName}
                        onChange={(event) => changeCreds(event)}
                      />
                    </div>{" "}
                  </div>
                </div>

                <div className="row row1">
                  <div className="col-3">
                    {" "}
                    <label><b>Card Number</b></label>{" "}
                  </div>
                  <div className="col-3">
                    <div className="divinput">
                      <input
                        type="text"
                        required
                        id="cardNumber"
                        name="cardNumber"
                        className="storeregInput"
                        value={state.cardNumber}
                        onChange={(event) => changeCreds(event)}
                      />
                    </div>{" "}
                  </div>
                </div>

                <div className="row row1">
                  <div className="col-3">
                    {" "}
                    <label><b>Expiry</b></label>{" "}
                  </div>
                  <div className="col-3">
                    {" "}
                    <div className="divinput">
                      <input
                        type="text"
                        required
                        id="expiry"
                        name="expiry"
                        className="storeregInput"
                        value={state.expiry}
                        onChange={(event) => changeCreds(event)}
                      />
                    </div>{" "}
                  </div>
                </div>

                <div className="row row1">
                  <div className="col-3">
                    {" "}
                    <label><b>CVV</b></label>{" "}
                  </div>
                  <div className="col-3">
                    {" "}
                    <div className="divinput">
                      <input
                        type="text"
                        required
                        id="cvv"
                        name="cvv"
                        className="storeregInput"
                        value={state.cvv}
                        onChange={(event) => changeCreds(event)}
                      />
                    </div>{" "}
                  </div>
                </div>
                <div className="row justify-content-end m-0">
                  <button
                    type="button"
                    className="btn btn-success next_btnn contBtn"
                    onClick={(event) => {
                      if(state.cardNumber =="" || state.cardName =="" || state.cvv=="" || state.expiry ==""  ){
                        alert('Complete all fields')
                        return
                      }
                      handleClosePaymentModal();
                      handleSubmit(event);
                    }}
                    // data-toggle="modal"
                    // data-target="#exampleModa10"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      {/* PAYMENT MODAL */}

      {/* Address YOU MODAL */}
      <Modal
        show={thankYouModal}
        onHide={handleCloseThankYouModal}
        className="fade congrats_model"
        id="exampleModa13"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="apply_coupons_main">
                <button className="btn header_back_modal" onClick={() => {
                    // console.log('HEWllo')
                    handleOpenDateTimeModal()
                    handleCloseThankYouModal();
                  }}>
                  <i
                    
                    className="fa fa-arrow-left"
                    aria-hidden="true"
                  ></i>{" "}
                  Details
                </button>
              </div>
              <div className="row row1">
                <div className=" col-3">
                  {" "}
                  <label><b>Starch you want</b></label>{" "}
                </div>
                <div className="col-3">
                  {" "}
                  <div className="divinput">
                    <FormControl variant="outlined">
                      <InputLabel>Select</InputLabel>
                      <Select
                        id="starchPref"
                        name="starchPref"
                        value={state.starchPref}
                        label="starchPref"
                        className={classes.formControl}
                        onChange={(event) => changeCreds(event)}
                      >
                        <MenuItem value="Light ">Light</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="Heavy">Heavy</MenuItem>
                      </Select>
                    </FormControl>
                  </div>{" "}
                </div>
              </div>
              <div className="row row1">
                <div className=" col-3">
                  {" "}
                  <label><b>How you want</b></label>{" "}
                </div>
                <div className="col-3">
                  {" "}
                  <div className="divinput">
                    <FormControl variant="outlined" halfWidth>
                      <InputLabel> Select </InputLabel>
                      <Select
                        id="foldedOrHanged"
                        name="foldedOrHanged"
                        value={state.foldedOrHanged}
                        label="foldedOrHanged"
                        className={classes.formControl}
                        onChange={(event) => changeCreds(event)}
                      >
                        <MenuItem value="Folded ">Folded</MenuItem>
                        <MenuItem value="Hanger">Hanger</MenuItem>
                      </Select>
                    </FormControl>
                  </div>{" "}
                </div>
              </div>
              <div className="row row1">
                <div className=" col-3">
                  {" "}
                  <label><b>PickUp Date</b></label>{" "}
                </div>
                <div className="col-3">
                  {" "}
                  <div className="divinput">
                    <input
                      type="date"
                       
                      required
                      id="pickupDate"
                      name="pickupDate"
                      className="pkDate storeregInput"
                      value={state.pickupDate}
                      onChange={(event) => changeCreds(event)}
                    />
                    {/* <Datetime
                      initialValue={dateTime}
                      id="date"
                      name="date"
                      onChange={(mDateTime) => {
                        console.log("DATETIME:", mDateTime.toDate().getTime());
                        setDateTime(mDateTime.toDate().getTime());
                      }}
                    /> */}
                  </div>{" "}
                </div>
              </div>

              <div className="row row1">
                <div className=" col-3">
                  {" "}
                  <label><b>Drop Date</b></label>{" "}
                </div>
                <div className="col-3">
                  {" "}
                  <div className="divinput">
                    <input
                      type="date"
                      required
                      id="dropDate"
                      name="dropDate"
                      className="storeregInput"
                      value={state.dropDate}
                      onChange={(event) => changeCreds(event)}
                    />
                  </div>{" "}
                </div>
              </div>

              <div className="row row1">
                <div className=" col-3">
                  {" "}
                  <label><b>Pickup Time</b></label>{" "}
                </div>
                <div className="col-3">
                  {" "}
                  <div className="divinput">
                    <input
                      type="time"
                      required
                      id="pickupTime"
                      name="pickupTime"
                      className="storeregInput"
                      value={state.pickupTime}
                      onChange={(event) => changeCreds(event)}
                    />
                  </div>{" "}
                </div>
              </div>

              <div className="row row1">
                <div className="col-3">
                  {" "}
                  <label><b>Drop Address</b></label>{" "}
                </div>
                <div className="col-3">
                  {" "}
                  <div className="divinput">
                    <input
                      type="text"
                      required
                      id="address"
                      name="address"
                      value={state.dropAddress.address}
                      placeholder="Address"
                      className="storeregInput"
                      onChange={(e) => {
                        setState({
                          ...state,
                          dropAddress: {
                            ...state?.dropAddress,
                            address: e.target.value,
                          },
                        });
                      }}
                    /></div>
                    {/* <input
                      type="text"
                      required
                      id="tag"
                      name="tag"
                      placeholder="tag"
                      className="storeregInput"
                      onChange={(e) => {
                        setState({
                          ...state,
                          dropAddress: {
                            ...state?.dropAddress,
                            tag: e.target.value,
                          },
                        });
                      }}
                    /> */}
                     
                    <div className="divinput addzip">
                    <input
                      type="text"
                      required
                      id="zipCode"
                      name="zipCode"
                      value={state.dropAddress.zipCode}
                      className="storeregInput"
                      placeholder="zipcode"
                      onChange={(e) => {
                        setState({
                          ...state,
                          dropAddress: {
                            ...state?.dropAddress,
                            zipCode: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>{" "}
                </div>
              </div>
               
              <div className="row row1">
                <div className="col-3">
                  {" "}
                  <label><b>Pickup Address</b></label>{" "}
                </div>
                <div className="col-3">
                  {" "}
                  <div className="divinput">
                    <input
                      type="text"
                      required
                      id="address"
                      name="address"
                      value={state.pickupAddress.address}
                      placeholder="Address"
                      className="storeregInput"
                      onChange={(e) => {
                        setState({
                          ...state,
                          pickupAddress: {
                            ...state?.pickupAddress,
                            address: e.target.value,
                          },
                        });
                      }}
                    /> </div>
                    {/* <input
                      type="text"
                      required
                      id="tag"
                      name="tag"
                      placeholder="tag"
                      className="storeregInput"
                      onChange={(e) => {
                        setState({
                          ...state,
                          pickupAddress: {
                            ...state?.pickupAddress,
                            tag: e.target.value,
                          },
                        });
                      }}
                    /> */}
                    <div className="divinput addzip">
                    <input
                      type="text"
                      required
                      id="zipCode"
                      name="zipCode"
                      value={state.pickupAddress.zipCode}
                      className="storeregInput"
                      placeholder="zipcode"
                      onChange={(e) => {
                        setState({
                          ...state,
                          pickupAddress: {
                            ...state?.pickupAddress,
                            zipCode: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>{" "}
                </div>
              </div>
              <div className="row justify-content-end m-0">
                <button
                  type="button"
                  className="btn btn-primary next_btnn contBtn"
                  onClick={() => {
                    if(state.starchPref =="" || state.foldedOrHanged =="" || state.dropDate=="" || state.pickupDate =="" || state.dropAddress.address =="" ||state.dropAddress.zipCode =="" || state.pickupAddress.address =="" ||state.pickupAddress.zipCode ==""  ){
                        alert('Complete all fields')
                        return
                      }
                    handleOpenPaymentModal();
                    handleCloseThankYouModal();
                  }}
                  // data-toggle="modal"
                  // data-target="#exampleModa10"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      {/* Address YOU MODAL */}
    </div>
  );
};

export default Cart;
