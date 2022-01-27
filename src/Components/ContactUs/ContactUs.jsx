import react, { useState } from "react";
import Navbar from "../Navbar1/Navbar";
import "./contactus.css";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Search from "../Search1/Search1";
import Footer from "../Footer/Footer";
import { auth, db } from "../../fbconfig";
import { onAuthStateChanged } from "firebase/auth";
import {
  arrayRemove,
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  Timestamp,
  onSnapshot,
} from "@firebase/firestore";
const ContactUs = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const changeCreds = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "enquiries"), {
      ...state,
    });
    alert("Enquiry send Successfully");
    setState({ name: "", email: "", phone: "", subject: "", message: "" });
  };
  return (
    <div>
       
      <div className="bluelinenew">
        <p>Our Dry Clean Locations in Chicago</p>
      </div>

      <div className="contactpage">
        <div className="signupContainer">
          <div className="signupWrapper">
            <form className="signupRight">
              <div class="text">Contact Form</div>
              <div class="tea">Let' have a cup of tea</div>
              <div className="signupBox">
                <div className="divinput divadd">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="signupInput"
                    value={state.name}
                    onChange={(event) => changeCreds(event)}
                  />

                  <label for="">Name</label>
                </div>

                <div className="divinput divadd">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="signupInput"
                    value={state.email}
                    onChange={(event) => changeCreds(event)}
                  />
                  <label for="email">Email</label>
                </div>

                <div className="divinput divadd">
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    required
                    className="signupInput"
                    value={state.phone}
                    onChange={(event) => changeCreds(event)}
                  />
                  <label for="">Phone</label>
                </div>

                <div className="divinput divadd">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="signupInput"
                    value={state.subject}
                    onChange={(event) => changeCreds(event)}
                  />
                  <label for="">Subject</label>
                </div>

                <TextareaAutosize
                  maxRows={4}
                  className="signupInput divadd"
                  id="message"
                  name="message"
                  aria-label="maximum height"
                  placeholder="Message"
                  minRows={3}
                  style={{ borderRadius: "10px" }}
                  value={state.message}
                  onChange={(event) => changeCreds(event)}
                />
                {/* <input type="password" required  className="signupInput" 
                        name="cpassword" 
                         />
                        
                        <label for="">Confirm Password</label> */}

                <button
                  type="submit"
                  className="signupButton divadd"
                  onClick={handleSubmit}
                >
                  SUBMIT
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="right">
          <h2>Quick Content</h2>
          <h3>Phone Number</h3>
          <div className="atag">
            <a href="tel:312-505-9138">312-505-9138 </a>
            <a href="tel:773472-2391">/ 773 472-2391</a>
          </div>

          <h3>E-Mail Address</h3>
          <div className="atag">
            <a href="mailto:azim@chicagogreendrycleaners.com">
              azim@chicagogreendrycleaners.com
            </a>
          </div>

          <h3>Our Address</h3>
          <a>3545 W Irving Park Rd, Chicago, IL 60618, United States</a>
        </div>
      </div>
 
    </div>
  );
};
export default ContactUs;
