import React from "react";
import {  Col, Row } from "react-bootstrap";
import Title from "react-vanilla-tilt";
import "./why.scss";
import { cardAnimation, headerAnimation, textAnimation, imageAnimation } from "../../utils/Animations";
import { useScroll } from "../useScroll/useScroll";
import { motion } from 'framer-motion/dist/framer-motion'
const Why = () => {
  const [element, controls] = useScroll();
  return (
    <div
      className="join1" ref={element}>
      <motion.div

        variants={cardAnimation}
        animate={controls}
        transition={{ delay: 0.2, type: "tween" }}
      >
        <div className="title" ref={element}>
          <motion.div

            variants={headerAnimation}
            animate={controls}
            transition={{ delay: 0.2, type: "tween" }}
          >
            Chicago’s Premier Online Dry&nbsp;<br /> Cleaning Services
          </motion.div>
        </div>
        <Row className="row align-items-center">
          <Col className="work xl=7 lg=6" ref={element}>
            <motion.div
              variants={textAnimation}
              animate={controls}
              transition={{
                duration: 1,
              }}
            >
              <p>
                You expect the best and deserve none the less <br /> Are you looking for
                better service and more value for your <br /> money? We live in a world
                were good customer service is <br /> always desired but seldom experienced.
                Chicago Green <br /> Cleaners in Downtown Chicago stand out as an
                exception. <br /> We service most municipal areas in Chicago,including <br />
                Evanston, Lincolnwood, and Skokie.
              </p>
            </motion.div>
          </Col>
          <Col className='told'>
            <div class="video" ref={element}>
              <motion.div

                variants={imageAnimation}
                animate={controls}
                transition={{ type: "tween" }}
              >
                <Title style={{}}>
                  <div className="Title-inner">
                    <img
                      src="/bread.jpg"
                      alt="video-thumb"
                      className="vanilla"
                      style={{
                        width: "100%",
                      }}
                    />
                  </div>
                </Title>
                </motion.div>
            </div>
          </Col>
        </Row>
      </motion.div>
    </div>
  );
};

export default Why;
