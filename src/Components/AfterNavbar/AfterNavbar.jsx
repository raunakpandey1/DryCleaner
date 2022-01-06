import React from "react";
import { Col, Row } from 'react-bootstrap';
import { motion } from 'framer-motion/dist/framer-motion'
import Video from "../../img/video2.mp4";
import { useScroll } from "../useScroll/useScroll";
import { videoAnimation, textAnimation,  fromUp } from "../../utils/Animations";
import "./afternavbar.scss";

const Navbar = () => {
  const [element, controls] = useScroll();
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
                {/* btn1 */}
                <div className="front btn btn-danger justify-content-center align-items-center" >
                  <span className="ripple">Book Pickup</span>
                </div>
              </Col>
              <Col >
                {/* btn2 */}
                <div className="front btn btn-danger justify-content-center align-items-center" >
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
