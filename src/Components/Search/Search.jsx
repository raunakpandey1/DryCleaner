import React from "react";
import { useScroll } from "../useScroll/useScroll";
import { motion } from 'framer-motion/dist/framer-motion'
import { fromUp, fromDown, headerAnimation } from "../../utils/Animations";
import { Container, Col, Row } from "react-bootstrap";
import "./search.scss";

const Search = () => {
  const [element, controls] = useScroll();

  return (
    <div className="center" ref={element}>
      <h3 className="gift" >
      <motion.div

variants={headerAnimation}
animate={controls}
transition={{ delay: 0.2, type: "tween" }}
> You can find us by Searching
</motion.div> </h3>

      <div
        className="footer1"
        style={{ backgroundColor: "white", color: "white" }}
      >
        <Container style={{ color: "#878f9c" }}>
          <Row className="flex justify-content-md-center">
            <Col lg="3" md="6">
            <motion.div
 variants={fromUp}
 animate={controls}
 transition={{ duration: 0.5 }}>
              <p>
                Dry Cleaners in Chicago
                <br />
                green dry cleaners near me
                <br />
                eco friendly dry cleaners near me best green dry cleaners near
                me green dry cleaning at home green dry cleaning chemicals
                chemical free dry cleaners near me
                <br />
              </p>
              </motion.div>
            </Col>

            {/* QUICK LINKS */}
            <Col lg="3" md="6">
            <motion.div
                    variants={fromDown}
                    animate={controls}
                    transition={{ duration: 0.5 }}>
              <div className="align">
                <p>
                  Green Dry Cleaners
                  <br />
                  green dry cleaners near me
                  <br />
                  best dry cleaners in chicago
                  <br />
                  dry cleaners chicago
                  <br />
                  best dry cleaners near me
                  <br />
                  dry cleaners skokie
                  <br />
                  dry cleaning delivery chicago
                  <br />
                  eco friendly dry cleaners
                  <br />
                </p>
              </div>
              </motion.div>

            </Col>

            {/* FIND US */}
            <Col lg="3" md="6">
            <motion.div
 variants={fromUp}
 animate={controls}
 transition={{ duration: 0.5 }}>
              <p>
                dry cleaning delivery chicago
                <br />
                green dry cleaners near me
                <br />
                best dry cleaners in chicago
                <br />
                dry cleaners chicago
                <br />
                best dry cleaners near me
                <br />
                dry cleaners skokie
                <br />
                dry cleaning delivery chicago
                <br />
                green cleaners near me
                <br />
              </p>
              </motion.div>
            </Col>

            {/* QUICK CONTACT */}
            <Col lg="3" md="6">
            <motion.div
                    variants={fromDown}
                    animate={controls}
                    transition={{ duration: 0.5 }}>
              <p>
                dry cleaners near me
                <br />
                best dry cleaners in chicago
                <br />
                dry cleaners near me open now
                <br />
                dry cleaners open near me
                <br />
                best dry cleaners near me
                <br />
                green dry cleaners near me
                <br />
                same day dry cleaners near me
                <br />
                dry cleaning delivery chicago
                <br />
              </p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Search;