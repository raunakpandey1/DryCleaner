import React from "react";
import { Col, Row } from "react-bootstrap";
import Title from "react-vanilla-tilt";
import "./clothes.scss";
import { cardAnimation, textAnimation, imageAnimation } from "../../utils/Animations";
import { useScroll } from "../useScroll/useScroll";
import { motion } from 'framer-motion/dist/framer-motion'
const Clothes = () => {
    const [element, controls] = useScroll();
    return (
        <div className="join11" ref={element}>
            <motion.div

                variants={cardAnimation}
                animate={controls}
                transition={{ delay: 0.2, type: "tween" }}
            >
                <div className="title11">
                    Services Go Beyond&nbsp;<br /> Clothes!
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
                        <p className="class">
                            Chicago Green Cleaners are not just experts at cleaning, repairing and altering clothes. We equally extend our services for wedding and bridesmaid dresses, draperies, bedspreads, comforters, tablecloths, suede, leather and other fine household fabrics.
                            < br /> < br />
                            Our professionals work to remove the most stubborn dirt, whiten whites and enhance colors. Your home is sure to look beautiful once our services are complete.
                            < br />
                            < br />
                            All household items are carefully inspected, pre-spotted, cleaned, checked for missing buttons and enhanced with hand touch ups. We ALWAYS follow manufacturer’s recommendations in completing our duties.
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

export default Clothes;
