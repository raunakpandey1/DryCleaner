import React from "react";
import "./button.scss";
import { Container, Col, Row, Section } from "react-bootstrap";
import {
  cardAnimation,
  fromUp,
  headerAnimation,
  imageAnimation,
} from "../../utils/Animations";
import { useScroll } from "../useScroll/useScroll";
import { motion } from "framer-motion/dist/framer-motion";
import Box from "@mui/material/Box";
import Button1 from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { TextareaAutosize } from "@mui/material";
 
import Paper from "@mui/material/Paper";
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

// This file is used for cliet component not for button purpose client feedback
const Button = () => {
  const [element, controls] = useScroll();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="button100">
      <Row className="title96" ref={element}>
        <motion.div
          variants={headerAnimation}
          animate={controls}
          transition={{ delay: 0.2, type: "tween" }}
        >
          <h1 className="h11">
            <b>Client Feedback</b>
          </h1>
          <p className="p1">
            Know what &amp; our clients are saying about their experience with
            us.&amp; Customer service is our <br />
            top priority & we make sure our service satisfaction is at its best.
          </p>
        </motion.div>
      </Row>

      
    
    
      <Row className="slick">
              <img
                className="im1"
                src="thumb-1.png"
                alt=""
                data-black-overlay="5"
                style={{ width: "20%" }}
              />
              <p className="p78">
                <b>great service </b>{" "}
              </p>
              <h6 className="p88">James</h6>
              <p className="p78">Apple.Inc</p>
            </Row>

      
      <div className="last691">
        <div
          className="ch btn btn-danger mr-5"
          style={{ borderRadius: "0.25em" }}
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
                      required
                      className="reviewupInput"
                      name="firstname"
                    />

                    <label for="">Name</label>
                  </div>

                  <TextareaAutosize
                    className="reviewupInput"
                    aria-label="maximum height"
                    placeholder="Review"
                    minRows={4}
                    style={{ borderRadius: "10px" }}
                  />

                  <button type="submit" className="reviewupButton">
                    {" "}
                    SUBMIT
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Button;
