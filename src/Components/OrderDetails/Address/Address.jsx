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
const Address = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
     
    pickupAddress: {
      address: "",
      tag: "",
      zipCode: "",
    },
    dropAddress: {
        address: "",
        tag: "",
        zipCode: "",
      },
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
         
        pickupAddress: userSnap.data()["pickupAddress"],
        dropAddress: userSnap.data()["dropAddress"],
         
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
      alert("Address Updated Successfully")
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
              <div class="titlee21">Address</div>
              <div class="conttent21">
                <form action="#">
                <br></br>
                <div> Pickup Address  </div> 
                  <div class="userdetails21">
                    
                    <div class="inputbox21">
                    
                   
                      <span class="details">Address</span>
                      <input
                        type="text"
                        // name="pickupAddress.address"
                        value={state.pickupAddress?.address}
                        onInput={(e) => {
                        setState({
                          ...state, pickupAddress:
                          {
                            ...state?.pickupAddress,
                            address: e.target.value   
                          }
                        })
                      }}
                        placeholder="Enter your Address"
                        required
                      />
                    </div>
                    <div class="inputbox21">
                      <span class="details">Zip Code</span>
                      <input
                        type="text"
                        name="pickupAddress.zipCode"
                        value={state.pickupAddress?.zipCode}
                        onInput={(e) => {
                        setState({
                          ...state, pickupAddress:
                          {
                            ...state?.dropAddress,
                            zipCode: e.target.value   
                          }
                        })
                      }}
                        placeholder="Enter your Zip Code"
                        required
                      />
                    </div>
                     </div>

                     <div>Drop Address  </div> 
                     
                  <div class="userdetails21">
                    <div class="inputbox21">
                      <span class="details">Address</span>
                      <input
                        type="text"
                        // name="dropAddress.address"
                        value={state.dropAddress?.address}
                        onInput={(e) => {
                        setState({
                          ...state, dropAddress:
                          {
                            ...state?.dropAddress,
                            address: e.target.value   
                          }
                        })
                      }}
                        placeholder="Enter your Address"
                        required
                      />
                    </div>
                    <div class="inputbox21">
                      <span class="details">Zip Code</span>
                      <input
                        type="text"
                        // name="dropAddress.zipCode"
                        value={state.dropAddress?.zipCode}
                        onInput={(e) => {
                        setState({
                          ...state, dropAddress:
                          {
                            ...state?.dropAddress,
                            zipCode: e.target.value   
                          }
                        })
                      }}
                        placeholder="Enter your Zip Code"
                        required
                      />
                    </div>
                  </div>
                  
                  <div class="button21">
                    <input type="submit" onClick={handleSubmit} value="Update" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        
      </div>
       
      <Search1 />
      <Footer />
    </div>
  );
};
export default Address;
