import React from "react";
import { Col, Row } from 'react-bootstrap';
import { motion } from 'framer-motion/dist/framer-motion'
import Video from "../../img/homepage.mp4";
import { useScroll } from "../useScroll/useScroll";
import { videoAnimation, textAnimation,  fromUp } from "../../utils/Animations";
import "./afternavbar.scss";
import { Navigate , useNavigate} from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate()
  const [element, controls] = useScroll();

  function doThis(){
    navigate('/services')
  }
  function doBook(){
    navigate('/services')
  }
  return (
    <div className="video1" ref={element}>
      <motion.div
        variants={videoAnimation}
        animate={controls}
        transition={{ type: "tween" }}>
        <video
          autoPlay
          loop
          muted
          style={{
            position: "relative",
            width: "100%",
            height: "0%",
            left: "0%",
            top: "0%",
            bottom: "50%",
            objectFit: "cover",
            filter: "brightness(50%)",
          }}
        >
          <source src={Video} type="video/mp4" />
        </video>
        <div className="typography">
          <motion.div
            variants={textAnimation}
            animate={controls}
            transition={{ duration: 0.5 }}>
            <h3 className="welcome">WELCOME TO</h3>
            <h1 className="chicago">
              CHICAGO GREEN <br /> CLEANERS
            </h1>
            <p className="dry">
              Your Dry cleaning at the best Eco Friendly Dry cleaners in Chicago.
            </p>
            <Row className="ok">
              <Col >
             
                <div className="front btn btn-danger justify-content-center align-items-center" onClick={doBook}>
                  <span className="ripple">Book Pickup</span>
                </div>
              </Col>  
              <Col >
                {/* btn2 */}
                <div className="front btn btn-danger justify-content-center align-items-center" onClick={doThis}>
                  <span className="ripple">Our Services</span>
                </div>
              </Col>
            </Row>
            </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Navbar;
