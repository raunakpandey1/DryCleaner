import React from "react";
import {  Col, Row } from "react-bootstrap";
import Title from "react-vanilla-tilt";
import "./alter.scss";
import { cardAnimation, textAnimation, imageAnimation } from "../../utils/Animations";
import { useScroll } from "../useScroll/useScroll";
import { motion } from 'framer-motion/dist/framer-motion'
const Alter = () => {
    const [element, controls] = useScroll();
    return (
        <div className="join112" ref={element}>
            <motion.div

variants={cardAnimation}
animate={controls}
transition={{ delay: 0.2, type: "tween" }}
>
            <div className="title112">
            Alterations & &nbsp;<br /> Repairs:
            </div>
            <Row className="row align-items-center">
               
                <Col className='told11'>
                    <div class="video11" ref={element}>
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
                <Col className="work xl=7 lg=6" ref={element}>
                <motion.div
              variants={textAnimation}
              animate={controls}
              transition={{
                duration: 1,
              }}
            >
                    <p>
                    Chicago Green Cleaners provides complete alterations and repairs on clothes and household items. We take pride in providing our customers with quality service each and every time. Our professional seamstresses are here to help you look your best and to ensure that your clothes fit you perfectly.
                    </p>
                    </motion.div>
                </Col>
            </Row>
            </motion.div>
        </div>
    );
};

export default Alter;
