import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import Title from "react-vanilla-tilt";
import "./choose.scss";
import ProgressBar from "../Choose/ProgressBar";
import { cardAnimation, headerAnimation, textAnimation, imageAnimation } from "../../utils/Animations";
import { useScroll } from "../useScroll/useScroll";
import { motion } from 'framer-motion/dist/framer-motion'
const Choose = () => {
  const [element, controls] = useScroll();
  return (
    <div className="join1" ref={element}>
       <motion.div
                
                variants={cardAnimation}
                animate={controls}
                transition={{ delay: 0.2, type: "tween" }}
            >
      <div className="title" ref={element}>  <motion.div

variants={headerAnimation}
animate={controls}
transition={{ delay: 0.2, type: "tween" }}
> Why Choose Us?</motion.div> </div>
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
            Free and Convenient Online Reservations System Weekly, biweekly and
            monthly pickup and drop-off services VIP service for corporate
            clients Personalized care Remember that we cater to those who expect
            the best, many of whom require an elegant appearance. We cater to
            many icons, CEOs and socialites and as a high-end dry cleaning
            provider, we serve the discerning tastes of the city`s most
            judicious clients...that includes you.
          </p>
          <div className="skills">
            <ProgressBar
              title={"Wash & Fold Laundry Service"}
              width={"98%"}
              text={""}
            />
            <ProgressBar
              title={"Commercial Laundry Service"}
              width={"95%"}
              text={""}
            />
            <ProgressBar
              title={"Self Service And Laundromat"}
              width={"96%"}
              text={""}
            />
          </div>
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
                            <div className='Title-inner'>
                                <img src="/eco.jpg" alt="video-thumb" className='vanilla' style={{
                                    width: "100%"
                                }} />

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

export default Choose;
