import {
  arrayRemove,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  updateDoc,
  addDoc,
} from "@firebase/firestore";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { auth, db } from "../../fbconfig";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "@firebase/auth";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import Navbar from "../../Components/Navbar1/Navbar";
import "./cart.css";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useAuth } from '../../auth/useAuth';
const Cart = ({ subTypesModal, setSubTypesModal }) => {
  const { user } = useAuth();
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
    name: "",
    email: "",
    alternative: "",
    mobile: "",
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
    // console.log(e)
    // e.preventDefault();
     
    for (let i = 0; i < userCartItems.length; i++) {
      
      if(userCartItems[i].id == e)
      {
        userCartItems[i].quantity +=1;
         
      }
      
  }
  const userCartRef = doc(db, "users", users.uid);

      // push updated cart items to db
      await updateDoc(userCartRef, { carts: userCartItems });
      // alert('Item added to Cart')
     fetchCartItems();
  };



  const handleDecrement = async (e) => {
    // console.log(e)
    // e.preventDefault();
     
    for (let i = 0; i < userCartItems.length; i++) {
      if(userCartItems[i].quantity > 1){
        if(userCartItems[i].id == e)
        {
          userCartItems[i].quantity -=1;
          const userCartRef = doc(db, "users", users.uid);

          // push updated cart items to db
            await updateDoc(userCartRef, { carts: userCartItems });
            fetchCartItems();
        }
        
      }
      
      // alert('Item added to Cart')
     
      
  }
  const userCartRef = doc(db, "users", users.uid);

      // push updated cart items to db
      await updateDoc(userCartRef, { carts: userCartItems });
      // alert('Item added to Cart')
     fetchCartItems();
  };
  const changeCreds = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "OrderHistory"), {
      ...state,
      items: userCartItems,
    });
    alert("Order Placed Successfully");
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
  };

  const fetchCartItems = async () => {
    if (!users || !users.uid) {
      console.log();
      return;
    }
    const userCartRef = doc(db, "users", users.uid);
    const userSnap = await getDoc(userCartRef);
    if (
      userSnap.exists() &&
      userSnap.data().carts &&
      userSnap.data().carts.length
    ) {
      console.log(userSnap.data().carts);
      setUserCartItems(userSnap.data().carts);
      setUserData(userSnap.data());
      state.name = userSnap.data()["fullName"];
      state.email = userSnap.data()["email"];
      state.address = userSnap.data()["currentAddress"]["address"];
      state.mobile = userSnap.data()["phoneNumber"];
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

  const placeFinalOrder = async () => {
    try {
      // TODO: decrease the count of subscription in user schema

      userCartItems.map(async (cartItem) => {
        const orderObj = {
          address:
            userData && userData.addresses.length ? userData.addresses[0] : "",
          coordinates: "",
          date_accepted: new Date().getTime(),
          date_assigned: new Date().getTime(),
          date_booked: new Date().getTime(),
          date_completed: new Date().getTime(),
          date_service: dateTime,
          description,
          employee_id: "",
          employee_name: "",
          employee_number: "",
          employee_review: "",
          employee_token: "",
          image: "",
          is_cancelled: false,
          is_completed: false,
          name: cartItem.name,
          order_status: "placed",
          paymentMethod: paymentMode,
          price: cartItem.price,
          service_id: cartItem.service_id,
          sub_service_id: cartItem.sub_service_id,
          sub_type_id: cartItem.sub_type_id,
          tip: tipAmount,
          total_amount: cartItem.price + cartItem.price * 0.05 + tipAmount,
          user_id: users && users.uid ? users.uid : "",
          user_review: "",
          user_sub_id: "",
          user_token: "",
          vat: cartItem.price * 0.05,
        };

        const orderDocRef = await addDoc(collection(db, "orders"), orderObj);
        console.log("ORder Doc written with ID: ", orderDocRef.id);
        // TODO: update quantity in DB
        // if (nonSubServices.length === 0) {
        //   // all services are subscribed
        //   let mSubs = [...userSubs];

        //   if (mSubs && mSubs.length) {
        //     mSubs.forEach((mSub, index) => {
        //       let qt = mSub.quantity - 1;
        //       console.log("hello", qt);
        //       if (mSub.sub_type_id === cartItem.sub_type_id) {
        //         // reduce the count of this subscription
        //         mSubs[index] = {
        //           quantity: qt,
        //           ...mSubs[index],
        //         };
        //         console.log("hello", mSubs[index]);
        //       }
        //     });
        //   }
        //   console.log("hello", mSubs);
        //   // await updateDoc(doc(db, "users", user.uid), {
        //   //   subscriptions: mSubs,
        //   // });
        // } else {
        //   console.log("ERRRRRROR", nonSubServices);
        // }
      });
      handleOpenThankYouModal();
      handleCloseDateTimeModal();
      handleCloseLocationModal();
      handleClosePaymentModal();
      handleCloseSubStatusModal();
      handleCloseSubTypesModal();
    } catch (e) {
      alert("error creating orders");
      console.log("ERROR ORDER:", e);
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
                                <h4>{mCartItem.name}</h4>
                                <span className="ciPrice">
                                  Price: ₹{mCartItem.price}/-
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
                                  <button className="idButton" onClick={() =>handleDecrement(mCartItem.id)}>-</button>
                                  <span className="idTest">{mCartItem.quantity}</span>
                                  <button
                                    className="idButton"
                                    onClick={() =>handleIncrement(mCartItem.id)}
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                              <div className="chright">
                                <span className="ciPrice">₹{(mCartItem.price)*mCartItem.quantity }/-</span>
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

      {/* END SUBSCRIPTION STATUS MODAL */}

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
        className="date_and_time"
        id="exampleModa7"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        centered
        size="lg"
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
                        value={state.name}
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
                        value={state.mobile}
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
                        value={state.alternative}
                        onChange={(event) => changeCreds(event)}
                      />
                    </div>
                  </div>
                </div>

                <div className="row row1">
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
                </div>

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
                </div>
                <div className="row row1">
                  <div className=" col-3">
                    {" "}
                    <label>Pickup Tag</label>{" "}
                  </div>
                  <div className="col-3">
                    {" "}
                    <div className="divinput">
                      <FormControl variant="outlined" halfWidth>
                        <InputLabel>PickupTag</InputLabel>
                        <Select
                          id="PickupTag"
                          name="PickupTag"
                          value={state.pickupTag}
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
                        <InputLabel>time Slot</InputLabel>
                        <Select
                          id="pickupTimeSlot"
                          name="pickupTimeSlot"
                          value={state.pickupTimeSlot}
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
                      <input
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
                      />
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
                      <input
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
                      />
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
                <div className="row justify-content-end">
                  <button
                    type="button"
                    className="btn btn-primary next_btnn"
                    onClick={handleSubmit}
                    //   () => {
                    //   if ( userCartItems.length) {
                    //     // need for payment
                    //     handleOpenPaymentModal();
                    //   } else {
                    //     // no need for payment
                    //     handleOpenLocationModal();
                    //   }
                    // }}
                    // data-toggle="modal"
                    // data-target="#exampleModa9"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      {/* DATE TIME MODAL */}

      {/* CONFIRM  location Modal */}

      <Modal
        show={locationModal}
        onHide={handleCloseLocationModal}
        className="fade confirm_location_modal"
        id="exampleModa10"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="apply_coupons_main">
                <button className="btn header_back_modal">
                  <i className="fa fa-arrow-left" aria-hidden="true"></i>
                  Confirmation
                </button>
              </div>
              <div className="date_and_time_body">
                <div className="row row1">
                  <label>Name</label>{" "}
                  <span>
                    {userData && userData.fullName ? userData.fullName : ""}
                  </span>
                </div>
                <div className="row row1">
                  <label>Contact number</label>
                  <span>
                    {userData && userData.phoneNumber
                      ? userData.phoneNumber
                      : ""}
                  </span>
                </div>
                <div className="row row1">
                  <label>Address</label>
                  <span>
                    {userData && userData.address && userData.address.length
                      ? userData.address[0]
                      : ""}
                  </span>
                </div>

                <div className="google_maps">
                  <iframe
                    title="lazy"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15258072.40570261!2d82.75252935!3d20.98801345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1632411515739!5m2!1sen!2sin"
                    allowfullscreen=""
                    loading="lazy"
                  ></iframe>
                </div>

                <div className="row row1">
                  <label>Payment method</label>
                  <span>{nonSubServices.length ? paymentMode : "N/A"}</span>
                </div>
                <div className="row row1">
                  <label>Promo Code</label>
                  <span>
                    {appliedCoupon && appliedCoupon.status
                      ? appliedCoupon.code
                      : "N/A"}
                  </span>
                </div>
                <div className="row row1">
                  <label>Payable Amount</label>
                  <span>
                    {console.log("NONSUBSER:", nonSubServices)}
                    {nonSubServices.length > 0 ? (
                      <>
                        {/* some non-subscribed services, payment is required */}
                        <span>
                          ${" "}
                          {appliedCoupon && appliedCoupon.status
                            ? userCartItems[0].price +
                              userCartItems[0].vat +
                              tipAmount -
                              appliedCoupon.benefit
                            : userCartItems[0].price +
                              userCartItems[0].vat +
                              tipAmount}
                        </span>
                      </>
                    ) : (
                      <>
                        {/* all subscribed services */}
                        <span>Subscription is getting availed</span>
                      </>
                    )}
                  </span>
                </div>
                <div className="row justify-content-center">
                  <button
                    type="button"
                    className="btn btn-primary next_btnn"
                    onClick={placeFinalOrder}
                    // data-toggle="modal"
                    // data-target="#exampleModa13"
                  >
                    BOOK
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      {/* map location Modal */}

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
                  <i className="fa fa-arrow-left" aria-hidden="true"></i>{" "}
                  Payment Details
                </button>
              </div>

              <div className="payment_modal_design_body">
                <h3>How Would like to pay?</h3>
                <div className="payment_cod">
                  <span
                    onClick={() => setPaymentMode("COD")}
                    style={{
                      backgroundColor: paymentMode === "COD" ? "#c9002b" : "",
                      color: paymentMode === "COD" ? "#fff" : "",
                      padding: "0.4em",
                      borderRadius: "0.5rem",
                      cursor: "pointer",
                    }}
                  >
                    COD
                  </span>

                  <span style={{ padding: "0.4em" }}>
                    <i className="fa fa-money" aria-hidden="true"></i>
                  </span>
                  <span
                    onClick={() => setPaymentMode("ONLINE")}
                    style={{
                      backgroundColor:
                        paymentMode === "ONLINE" ? "#c9002b" : "",
                      color: paymentMode === "ONLINE" ? "#fff" : "",
                      padding: "0.4em",
                      borderRadius: "0.5rem",
                      cursor: "pointer",
                    }}
                  >
                    Online
                  </span>
                </div>
                {paymentMode === "ONLINE" ? (
                  <div>
                    <h3>Add a New Card</h3>

                    <div className="payment_cod_input input_search_icon">
                      <input type="text" />
                    </div>

                    <div className="payment_cod_input">
                      <label>Number</label>
                      <input type="password" />
                    </div>
                    <div className="payment_cod_input">
                      <label>Name On Card</label>
                      <input type="text" />
                    </div>
                    <div className="payment_cod_cvv">
                      <div>
                        <label>EXP</label>
                        <input type="text" />
                      </div>
                      <div>
                        <label>CVV</label>
                        <input type="text" />
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="row justify-content-end m-0">
                  <button
                    type="button"
                    className="btn btn-primary next_btnn"
                    onClick={handleOpenLocationModal}
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
      {/* PAYMENT MODAL */}

      {/* THANK YOU MODAL */}
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
              {/* <img className="img-fluid" src={noto} alt="" /> */}
              <p>Thank you, Book again!</p>
              <button className="track_btn">Track your Professional</button>
            </div>
          </div>
        </div>
      </Modal>
      {/* THANK YOU MODAL */}
    </div>
  );
};

export default Cart;
