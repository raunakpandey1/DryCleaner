import React, { useEffect, useState, useRef } from "react";
import dirImg from "../../img/216151_right_chevron_icon.png";
import "./reviews.css";
import Box from "@mui/material/Box";
import Button1 from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { TextareaAutosize } from "@mui/material";
import Paper from "@mui/material/Paper";
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
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 350,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

const Reviews = () => {
  // slider start
  const [data, setData] = useState([]);
  const carousel = useRef(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [state, setState] = useState({
    name: "",
    review: "",
    status:false 
   
  });

  // useEffect(() => {
  //   fetch('http://localhost:3000/static/users.json')
  //     .then((response) => response.json())
  //     .then(setData);
  // }, []);

  const handleLeftClick = (e) => {
    e.preventDefault();
    carousel.current.scrollLeft -= carousel.current.offsetWidth;
  };

  const handleRightClick = (e) => {
    e.preventDefault();

    carousel.current.scrollLeft += carousel.current.offsetWidth;
  };

  const changeCreds = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "reviews"), {
      ...state,
       
    });
    alert("Review send Successfully");
    setState({name:"",review:"" , status:false}) 
    setOpen(false)
  };

  const [reviews, setReviews] = useState([])
  const getReviews = async () => {
    const vend = collection(db, "reviews");
    //console.log(data);
    const querySnapshot = await getDocs(vend);
    setReviews(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const [isSubscribed, setSubscribed] = useState(true);
  useEffect(() => {
    getReviews();
    const unsubscribe = onSnapshot(collection(db, "reviews"), (snapshot) => {
        // Respond to data
        // ...
        if(snapshot.docChanges().length > 0){
          getReviews()
        }
      });
      return () => { setSubscribed(false); unsubscribe()}
  }, []);
console.log(reviews)
  return (
    <div>
      <section class="services" id="">
        <div class="max-width">
          <h2 class="title">
          Client Feed<span>back </span>
          </h2>
          <h3> Know what &amp; our clients are saying about their experience with
            us.&amp; Customer service is our <br />
            top priority & we make sure our service satisfaction is at its best.</h3>
          <div className="container2">
            <div className="carousel" ref={carousel}>
            {
                reviews.map((rev) => {
                    return <div>
                     {rev.status &&  <div className="item">
                <div className="box">
                  <img
                    src="thumb-1.png"
                    style={{ float: "left" }}
                  />
                  <h4 className="name">&emsp;{rev.name}</h4>
                  <div className="stars">
                    
                    <br />
                    <br />
                    <br />
                  </div>
                  <div className="description">
                  {rev.review}
                  </div>
                </div>
              </div>}
                   
                    </div>
                })
            }
              
              
            </div>
            <div className="buttons">
              <button onClick={handleLeftClick}>
                <img src={dirImg} alt="Scroll Left" />
              </button>
              <button onClick={handleRightClick}>
                <img src={dirImg} alt="Scroll Right" />
              </button>
            </div>
            <div className="last691">
              <div
                className="ch btn btn-success mr-5"
                style={{ borderRadius: "0.25em"  }}
              >
                <span className="ripple" onClick={handleOpen}>
                  Submit Review
                </span>
              </div>
            </div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="mobBox" sx={style}>
                <h6>
                  <b>SUBMIT REVIEW</b>
                </h6>

                <hr></hr>
                <div className="reviewContainer">
                  <div className="reviewWrapper">
                    <form className="reviewRight">
                      <div className="reviewBox">
                        <div className="reviewinput">
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="reviewupInput"
                            value={state.name}
                            onChange={(event) => changeCreds(event)} 
                          />

                          <label for="">Name</label>
                        </div>

                        <TextareaAutosize
                          id="review"
                          name="review"
                          className="reviewupInput"
                          aria-label="maximum height"
                          placeholder="Review"
                          minRows={4}
                          style={{ borderRadius: "10px" }}
                          value={state.review}
                          onChange={(event) => changeCreds(event)}
                        />

                        <button type="submit" className="reviewupButton" onClick={handleSubmit}>
                           SUBMIT
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Box>
            </Modal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reviews;
