import react, { useEffect, useState } from "react";
import Navbar from "../../Navbar1/Navbar";
import "./Changepassword.css";
import Search1 from "../../Search1/Search1";
import Footer from "../../Footer/Footer";
import { NavLink, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { auth, db } from "../../../fbconfig";
import { getAuth, updatePassword } from "firebase/auth";
const auth1 = getAuth();
const user = auth1.currentUser;

const Changepassword = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({});
  const changeCreds = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    console.log(user)
    console.log(state.newpass);
    e.preventDefault();
    updatePassword(user, state.newpass)
      .then(() => {
        alert("Password updated successfully");
        // setState({ newpass: "", oldpass: "" });
        navigate("/signin");
        // Update successful.
      })
      .catch((error) => {
        alert("Please try again");
        // An error ocurred
        // ...
      });
  };
  const [users, setUsers] = useState(null);
   
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      firebaseUser ? setUsers(firebaseUser) : setUsers(null);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <Navbar style={{ marginBottom: "300vw" }} />
      <div className="account112">
        {/* <div className="account-content"> */}
        <div className="left12">
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
          <div className="profilebody112">
            <div class="container112">
              <div class="titlee112">Change Password</div>
              <div class="conttent112">
                <form action="#">
                  <div class="userdetailss112">
                    <div class="inputboxl112">
                      <span class="details112"> Password</span>
                      <input
                        type="text"
                        id="oldpass"
                        name="oldpass"
                        placeholder="Old Password"
                        required
                        value={state.oldpass}
                        onChange={(event) => changeCreds(event)}
                      />
                    </div>

                    <div class="inputboxl112">
                      <span class="details112">Confirm Password</span>
                      <input
                        type="text"
                        id="newpass"
                        name="newpass"
                        placeholder="New Password"
                        required
                        value={state.newpass}
                        onChange={(event) => changeCreds(event)}
                      />
                    </div>
                  </div>

                  <div class="button112">
                    <input
                      type="submit"
                      value="Update Password"
                      onClick={handleSubmit}
                    />
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
export default Changepassword;
