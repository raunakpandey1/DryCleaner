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
    margin: theme.spacing(0),
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
    alternative_phone: "",
    phone: "",
    address: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
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
      user_id: users && user.uid ? users.uid : "",
      createdAt: Timestamp.now(),
      totalAmount: totalPrice,
    });
    alert("Order Placed Successfully");
    navigate("/");
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
    }
  }, [users, subTypesModal]);

  const [couponModal, setCouponModal] = useState(false);
  const handleOpenCouponModal = () => {
    fetchAllCoupons();
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
    console.log(mCouponsList)
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
      setUserData(userSnap.data());
      state.fullName = userSnap.data()["fullName"];
      state.email = userSnap.data()["email"];
      state.address = userSnap.data()["currentAddress"]["address"];
      state.phone = userSnap.data()["phoneNumber"];
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
    // decrement quantity after success apply

    // check if date is valid
    if (new Date() > new Date(mCoupon.validity)) {
      return setCongratsMessage({
        status: false,
        message: `This coupon is expired`,
      });
    }
    if (mCoupon.type === "percentage") {
      // order amount > min_order_amount
      if (userCartItems[0].price > mCoupon.min_order) {
        // TODO: replace discount with value from db
        const percentDiscount = 5;
        let benefit = userCartItems[0].price * percentDiscount * 0.01;
        // total benefit < max_benefit
        if (benefit > mCoupon.max_benefit) {
          benefit = mCoupon.max_benefit;
        }
        const couponDoc = doc(db, "coupons", mCoupon.id);
        await updateDoc(couponDoc, { quantity: increment(-1) });
        setCongratsMessage({
          status: true,
          message: `Congrats! You saved $ ${benefit}`,
        });
        setAppliedCoupon({
          status: true,
          coupon: mCoupon,
          benefit,
        });
      } else {
        setCongratsMessage({
          status: false,
          message: `Minimum order amount is $ ${mCoupon.min_order}`,
        });
      }
    }
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
                <h3><label>Total price : $</label>
                {totalPrice}</h3>
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
                          {/* <button className="btn">ADD COUPONS <i className="fa fa-chevron-right" aria-hidden="true"></i></button> */}
                          {/* {appliedCoupon &&
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
                              )} */}
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
                <button className="btn header_back_modal">
                  <i
                    onClick={handleCloseCouponModal}
                    className="fa fa-arrow-left"
                    aria-hidden="true"
                  ></i>{" "}
                  Apply coupon
                </button>
                <div className="enter_cooupon_code">
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Enter Coupon Code"
                  />
                  <button
                    type="button"
                    className="btn btn-info"
                    // data-toggle="modal"
                    // data-target="#exampleModa5"
                    // data-dismiss="modal"
                    onClick={() => {
                      // TODO: add custom coupon code
                    }}
                  >
                    Apply
                  </button>
                </div>
                <h3>Applicable coupons</h3>
                {couponsList && couponsList.length
                  ? couponsList.map((mCoupon) => (
                      <div className="applicable_coupons">
                        <h5>{mCoupon.code}</h5>
                        <p className="d-flex justify-content-between align-items-center">
                          {mCoupon.description}
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
                        <h4>Details</h4>
                      </div>
                    ))
                  : ""}
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
              // data-toggle="modal"
              // data-target="#exampleModa3"
              // data-dismiss="modal"
            >
              <i
                class="fa fa-times"
                aria-hidden="true"
                onClick={() => {
                  setCongratsMessage({ status: false, message: "" });
                  handleCloseCongratsModal();
                }}
              ></i>
            </button>
          </div>
        </div>
      </Modal>
      {/* CONGRATS */}

      {/* DATE TIME MODAL */}
      <Modal
        show={dateTimeModal}
        onHide={handleCloseDateTimeModal}
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
                <button className="btn header_back_modal">
                  <i
                    onClick={handleCloseDateTimeModal}
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
                    <label>Name</label>{" "}
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
                      />
                    </div>
                  </div>
                </div>
                <div className="row row1">
                  <div className="col-3">
                    {" "}
                    <label>Email</label>{" "}
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
                      />
                    </div>
                  </div>
                </div>

                <div className="row row1">
                  <div className="col-3">
                    {" "}
                    <label>Number</label>{" "}
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
                      />
                    </div>
                  </div>
                </div>
                <div className="row row1">
                  <div className="col-3">
                    {" "}
                    <label>Alternate Number</label>{" "}
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
                        value={state.alternative_phone}
                        onChange={(event) => changeCreds(event)}
                      />
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
                    <label>Pickup Tag</label>{" "}
                  </div>
                  <div className="col-3">
                    {" "}
                    <div className="divinput">
                      <FormControl
                        variant="outlined"
                      >
                        <InputLabel>PickupTag</InputLabel>
                        <Select
                          id="PickupTag"
                          name="PickupTag"
                          value={state.pickupTag}
                          className={classes.formControl}
                          label="pickupTag"
                          onChange={(event) => changeCreds(event)}
                        >
                          <MenuItem value="Leaving it outside in front porch or back porch">
                            Leaving it outside in front porch or back porch
                          </MenuItem>
                          <MenuItem value="Leaving it with the doorman">
                            Leaving it with the doorman
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </div>{" "}
                  </div>
                </div>
                <div className="row row1">
                  <div className=" col-3">
                    {" "}
                    <label>Select Time Slot</label>{" "}
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
                        >
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
                    className="btn btn-primary next_btnn"
                    onClick={() => {
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
                <button className="btn header_back_modal">
                  <i
                    className="fa fa-arrow-left"
                    aria-hidden="true"
                    onClick={handleClosePaymentModal}
                  ></i>{" "}
                  Payment Details
                </button>
              </div>

              <div className="payment_modal_design_body">
                <div className="row row1">
                  <div className="col-3">
                    {" "}
                    <label>Card Holder Name</label>{" "}
                  </div>

                  <div className="col-3">
                    {" "}
                    <div className="divinput">
                      <input
                        type="text"
                        required
                        id="cardName"
                        name="cardName"
                        className="storeregInput"
                        value={state.cardName}
                        onChange={(event) => changeCreds(event)}
                      />
                    </div>{" "}
                  </div>
                </div>

                <div className="row row1">
                  <div className="col-3">
                    {" "}
                    <label>Card Number</label>{" "}
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
                    <label>Expiry</label>{" "}
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
                    <label>CVV</label>{" "}
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
                    className="btn btn-success next_btnn"
                    onClick={(event)=>{handleClosePaymentModal();handleSubmit(event)}}
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
                <button className="btn header_back_modal">
                  <i
                    onClick={handleCloseThankYouModal}
                    className="fa fa-arrow-left"
                    aria-hidden="true"
                  ></i>{" "}
                  Details
                </button>
              </div>
              <div className="row row1">
                  <div className=" col-3">
                    {" "}
                    <label>Starch you want</label>{" "}
                  </div>
                  <div className="col-3">
                    {" "}
                    <div className="divinput">
                      <FormControl
                        variant="outlined"
                        
                      >
                        <InputLabel >Select</InputLabel>
                        <Select
                          id="starchPref"
                          name="starchPref"
                          value={state.starchPref}
                          label="starchPref"
                          className={classes.formControl}
                          onChange={(event) => changeCreds(event)}
                        >
                          <MenuItem value="Light ">
                          Light 
                          </MenuItem>
                          <MenuItem value="Medium">
                            Medium
                          </MenuItem>
                          <MenuItem value="Heavy">
                            Heavy
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </div>{" "}
                  </div>
                </div>
                <div className="row row1">
                  <div className=" col-3">
                    {" "}
                    <label>How you want</label>{" "}
                  </div>
                  <div className="col-3">
                    {" "}
                    <div className="divinput">
                      <FormControl variant="outlined" halfWidth>
                        <InputLabel>  Select </InputLabel>
                        <Select
                          id="starchPref"
                          name="starchPref"
                          value={state.starchPref}
                          label="starchPref"
                          className={classes.formControl}
                          onChange={(event) => changeCreds(event)}
                        >
                          <MenuItem value="Folded ">
                          Folded 
                          </MenuItem>
                          <MenuItem value="Hanger">
                          Hanger
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </div>{" "}
                  </div>
                </div>
              <div className="row row1">
                  <div className=" col-3">
                    {" "}
                    <label>PickUp Date</label>{" "}
                  </div>
                  <div className="col-3">
                    {" "}
                    <div className="divinput">
                      <input
                        type="date"
                        required
                        id="pickupDate"
                        name="pickupDate"
                        className="storeregInput"
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
                  <label>Drop Date</label>{" "}
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
                <div className="col-3">
                  {" "}
                  <label>Drop Address</label>{" "}
                </div>
                <div className="col-3">
                  {" "}
                  <div className="divinput">
                    <input
                      type="text"
                      required
                      id="address"
                      name="address"
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
                    />
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
                    <input
                      type="text"
                      required
                      id="zipCode"
                      name="zipCode"
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
                  <label>Pickup Address</label>{" "}
                </div>
                <div className="col-3">
                  {" "}
                  <div className="divinput">
                    <input
                      type="text"
                      required
                      id="address"
                      name="address"
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
                    />
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
                    <input
                      type="text"
                      required
                      id="zipCode"
                      name="zipCode"
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
                  className="btn btn-primary next_btnn"
                  onClick={() => {
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
