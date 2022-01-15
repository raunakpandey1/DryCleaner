import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import "./count.scss";
import { textAnimation, headerAnimation, imageAnimation } from "../../utils/Animations";
import { useScroll } from "../useScroll/useScroll";
import { motion } from 'framer-motion/dist/framer-motion'

const Count = () => {
  const [element, controls] = useScroll();
  return (
    <div className="container1" ref={element}>
      <motion.div

        variants={headerAnimation}
        animate={controls}
        transition={{ delay: 0.2, type: "tween" }}
      >
      <Row className="align-items-center">
        <Col lg="5" md="12">
          <h1>The last 9 years
            What we have done</h1>
        </Col>
      </Row>
      </motion.div>
    </div >
  );
};

export default Count;
