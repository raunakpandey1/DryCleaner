import React from 'react'
import {  Col, Row } from 'react-bootstrap';
import { useScroll } from "../useScroll/useScroll";
import { motion } from 'framer-motion/dist/framer-motion'
import "./card.scss";
import { cardAnimation } from "../../utils/Animations";
const Card = () => {
    const [element, controls] = useScroll();
    return (
        <div className='head27' ref={element}>
             <motion.div
 variants={cardAnimation}
 animate={controls}
 transition={{ duration: 0.5 }}>
            < div className='main '>
                <Row className='row1 '>
                    {/* first card */}
                    <Col className='dummy'>
                        <div className="service text-center">
                            <div className="service-icon">
                                <img src="./card1.png" alt="" style={{ width: "50%" }} />
                            </div>
                            <div className="content">
                                <h4>Trusted</h4>
                                <p>We are the most trusted Dry cleaning service in Chicago offering Same day services</p>

                            </div>
                        </div>
                    </Col>

                    {/* second card */}
                    <Col className='dummy'>
                        <div className="service text-center">
                            <div className="service-icon">
                                <img src="./card2.png" alt="" style={{ width: "50%",height:"50%" }} />
                            </div>
                            <div className="content">
                                <h4>Simple</h4>
                                <p> Book any Drycleaning services in a single click with our advanced Dry cleaning management system.</p>
                            </div>
                        </div>
                    </Col>

                    {/* third card */}
                    <Col className='dummy'>
                        <div className="service text-center">
                            <div className="service-icon">
                                <img src="./card3.png" alt="" style={{ width: "50%" }} />
                            </div>
                            <div className="content">
                                <h4>Affordable</h4>
                                <p>We offer the most affordable Dry cleaning services in Chicago .
                                    <br></br>
                                    <br></br>
                                </p>
                            </div>
                        </div>
                    </Col>




                </Row>
            </div>
            </motion.div>
        </div>
    )
}

export default Card
