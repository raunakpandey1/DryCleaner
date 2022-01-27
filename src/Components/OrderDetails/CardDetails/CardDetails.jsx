import react, { useEffect, useState } from "react";
import Navbar from "../../Navbar1/Navbar";
import "../UpdateProfile/UpdateProfile.css";
import Search1 from "../../Search1/Search1";
import Footer from "../../Footer/Footer";
import { NavLink, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
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
import { auth, db } from "../../../fbconfig";
import { useAuth } from "../../../auth/useAuth";
const CardDetails = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    cardHolderName: "",
    cardNumber: "",
    cvv: "",
    expiry :""
     
  });

  const [users, setUsers] = useState(null);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      firebaseUser ? setUsers(firebaseUser) : setUsers(null);
    });

    return () => unsubscribe();
  }, []);

  const fetchUser = async () => {
    if (!users || !users.uid) {
      return;
    }
    const userCartRef = doc(db, "users", users.uid);
    const userSnap = await getDoc(userCartRef);
    if (userSnap.exists()) {
      setState({
        cardHolderName: userSnap.data()["cardHolderName"],
        cardNumber: userSnap.data()["cardNumber"],
        cvv: userSnap.data()["cvv"],
       expiry: userSnap.data()["expiry"],
      });
      setUserData(userSnap.data());
    }
  };

  const changeCreds = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
 
     e.preventDefault();
    
      const userCartRef = doc(db, "users", users.uid);
  // push updated cart items to db
      await updateDoc(userCartRef, {...state});
      alert("Card Updated Successfully")
      fetchUser();
    
  };
  useEffect(() => {
    if (users && users?.uid) {
      fetchUser();
    }
  }, [users]);

  console.log(users);
  return (
    <div>
      <Navbar style={{ marginBottom: "300vw" }} />
      <div className="account21">
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
        <div className="Right12">
          <div className="profilebody21">
            <div class="container21">
              <div class="titlee21">Update Card Details</div>
              <div class="conttent21">
                <form action="#">
                  <div class="userdetails21">
                    <div class="inputbox21">
                      <span class="details21">cardHolderName</span>
                      <input
                        type="text"
                         
                        value={state.cardHolderName}
                        onInput={(e) => {
                          setState({
                            ...state, cardHolderName: e.target.value    

                          })
                        }}
                        placeholder="Enter Card Holder Name"
                        required
                      />
                    </div>
                    <div class="inputbox21">
                      <span class="details">Card Number</span>
                      <input
                        type="text"
                         
                        value={state.cardNumber}
                        onInput={(e) => {
                          setState({
                            ...state, cardNumber: e.target.value    

                          })
                        }}
                        placeholder="Enter Card Number"
                        required
                      />
                    </div>
                    <div class="inputbox21">
                      <span class="details">CVV</span>
                      <input
                        type="text"
                        name="cvv"
                        value={state.cvv}
                        onInput={(e) => {
                          setState({
                            ...state, cvv: e.target.value    

                          })
                        }}
                        placeholder="Enter CVV"
                        required
                      />
                    </div>
                    <div class="inputbox21">
                      <span class="details">Address</span>
                      <input
                        type="text"
                        name="expiry"
                        value={state.expiry}
                        onInput={(e) => {
                          setState({
                            ...state, expiry: e.target.value    

                          })
                        }}
                        placeholder="Enter Expiry"
                        required
                      />
                    </div>
                    
                  </div>
                  {/* <div class="genderdetails21">
          <input type="radio" name="gender" id="dot-1"/>
          <input type="radio" name="gender" id="dot-2"/>
          <input type="radio" name="gender" id="dot-3"/>
          <span class="gendertitle21">Gender</span>
          <div class="category21">
            <label for="dot-1">
            <span class="dot one"></span>
            <span class="gender">Male</span>
          </label>
          <label for="dot-2">
            <span class="dot two"></span>
            <span class="gender">Female</span>
          </label>
          <label for="dot-3">
            <span class="dot three"></span>
            <span class="gender">Prefer not to say</span>
            </label>
          </div>
        </div> */}
                  <div class="button21">
                    <input type="submit" onClick={handleSubmit} value="Update" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
      {/* <div className="account1">
        <div className="left">
                    <h3>Account</h3>
                    <a>Order Details</a><br/>
                    <a>Change Password</a><br/>
                    <a>Update Profile</a><br/>
                    <a>Order Details</a><br/>
                    <a>Logout</a>
                </div> */}

      {/* <div className="profile-body">
        <div class="container">
    <div class="titlee">Update Profile</div>
    <div class="conttent">
      <form action="#">
        <div class="user-details">
          <div class="input-box">
            <span class="details">Full Name</span>
            <input type="text" placeholder="Enter your name" required/>
          </div>
          <div class="input-box">
            <span class="details">Username</span>
            <input type="text" placeholder="Enter your username" required/>
          </div>
          <div class="input-box">
            <span class="details">Email</span>
            <input type="text" placeholder="Enter your email" required/>
          </div>
          <div class="input-box">
            <span class="details">Phone Number</span>
            <input type="text" placeholder="Enter your number" required/>
          </div>
          <div class="input-box">
            <span class="details">Password</span>
            <input type="text" placeholder="Enter your password" required/>
          </div>
          <div class="input-box">
            <span class="details">Confirm Password</span>
            <input type="text" placeholder="Confirm your password" required/>
          </div>
        </div>
        <div class="gender-details">
          <input type="radio" name="gender" id="dot-1"/>
          <input type="radio" name="gender" id="dot-2"/>
          <input type="radio" name="gender" id="dot-3"/>
          <span class="gender-title">Gender</span>
          <div class="category">
            <label for="dot-1">
            <span class="dot one"></span>
            <span class="gender">Male</span>
          </label>
          <label for="dot-2">
            <span class="dot two"></span>
            <span class="gender">Female</span>
          </label>
          <label for="dot-3">
            <span class="dot three"></span>
            <span class="gender">Prefer not to say</span>
            </label>
          </div>
        </div>
        <div class="button">
          <input type="submit" value="Update"/>
        </div>
      </form>
    </div>
  </div>
  </div>  */}
      {/* </div> */}
      <Search1 />
      <Footer />
    </div>
  );
};
export default CardDetails;
