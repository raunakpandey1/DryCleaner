import React, { useState, useEffect } from "react";
// import Card from '../../Components/Cardfirst/Card'
import Navbar from "../../Components/Navbar1/Navbar";
import { auth, db } from "../../fbconfig";
import GridContainer from "../../Components/Grid/GridContainer.js";
import GridItem from "../../Components/Grid/GridItem.js";
import { Col, Row } from "react-bootstrap";
import { Card, CardMedia, makeStyles } from "@material-ui/core";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  updateDoc,
  where,
} from "@firebase/firestore";
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from "../../auth/useAuth";
import "./items.css";
import {  useParams } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: 120,
  },
  media: {
    // height: 240,
    minWidth: 150,
  },
  mar:{
    margin:theme.spacing(2),
  },
   
}));

export const Items = () => {
  const navigate = useNavigate()
  // const { id } = useParams();
  const { user } = useAuth();
  const classes = useStyles();
  const [userCartItems, setUserCartItems] = useState([]);
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      firebaseUser ? setUsers(firebaseUser) : setUsers(null);
    });
    return () => unsubscribe();
  }, []);
  
  const addItemToCart = async (mSubType) => {
    // create clicked cart item
    const cartItem = {
      id:mSubType.id,
      img: mSubType.image,
      item: mSubType.name,
      price: mSubType.price,
      // vat: mSubType.price * 0.05,
      quantity:1
    };
    if(user == undefined) {
      alert("Login to continue")
       navigate('/signin')
    }
    else{
      const userCartRef = doc(db, "users", users.uid);

      // push updated cart items to db
      await updateDoc(userCartRef, { carts: arrayUnion(cartItem) });
      alert('Item added to Cart')
      fetchCartItems()
    }
    
  };

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
    const userCartRef = doc(db, "users", user.uid);

    // push updated cart items to db
    await updateDoc(userCartRef, { carts: userCartItems });
    // alert('Item added to Cart')
    fetchCartItems();
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
      setUserCartItems(userSnap.data().carts);
    } else {
      setUserCartItems([]);
    }
  };
   
  const getItems = async () => {
    const vend = collection(db, "items");
    //console.log(data);
    const querySnapshot = await getDocs(vend);
    setItems(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const [isSubscribed, setSubscribed] = useState(true);
  useEffect(() => {
    getItems();
    return () => {
      setSubscribed(false);
    };
  }, []);
  useEffect(() => {
    if (users && users?.uid) {
      fetchCartItems();
    }
  }, [users]);
  return (
    <div>
      <Navbar />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Row className={classes.mar}>
        <Col >
          <GridContainer > 
            {items.map((item) => {
              var containItem = userCartItems.find((element) => {
                return element.id === item.id;
              })
              return (
                <GridItem xs={12} sm={12} md={12} lg={12}>
                  <Card>
                  <div className="cardcont">
                  <div className="cardit">
                  <CardMedia
                      className={classes.media}
                      image={item.image}
                      title={"Image"}
                    />
                  </div>
                     <div className="cardit">
                     <div className="itemBody">
                      <div className="itemTitle">
                        <div className="titCon">
                          <h4>
                            <b>
                              {item.name}  
                            </b>
                          </h4>
                          <p>{item.desc}</p>
                        </div>
                        <div className="titCon">
                          <h6>
                            <b>${item.price}</b>
                          </h6>
                        </div>
                        {/* <div className="titCon">
                          <p>
                            <b>{item.washIron && "wash & Iron"}</b>
                          </p>
                          <p>
                            <b>{item.washOnly && "wash Only"}</b>
                          </p>
                          <p>
                            <b>{item.ironOnly && "iron Only"}</b>
                          </p>
                          <p>
                            <b>{item.dryClean && "dry Clean"}</b>
                          </p>
                        </div> */}
                      </div>

                      <div className="itemTitle">
                        {!containItem?<button
                          onClick={async () => {
                            await addItemToCart(item);
                          }}
                          type="button"
                          className="btn btn-danger  m-4 "
                        >
                          +
                        </button>:
                                <div className="quanHandler">
                                  <button
                                    className="idButton"
                                    onClick={() =>
                                      handleDecrement(containItem)
                                    }
                                  >
                                    -
                                  </button>
                                  <span className="idTest">
                                    {containItem.quantity}
                                  </span>
                                  <button
                                    className="idButton"
                                    onClick={() =>
                                      handleIncrement(containItem)
                                    }
                                  >
                                    +
                                  </button>
                                </div>
                              }
                      </div>
                    </div>
                     </div>
                  </div>
                 
                    
                  </Card>
                  <br></br>
                </GridItem>
              );
            })}
          </GridContainer>
        </Col>
      </Row>
    </div>
  );
};
