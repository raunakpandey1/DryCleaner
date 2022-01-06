import React from 'react'
import { Container, Col, Row } from 'react-bootstrap';
import { cardAnimation, headerAnimation } from "../../utils/Animations";
import { useScroll } from "../useScroll/useScroll";
import { motion } from 'framer-motion/dist/framer-motion'
import "./dry.scss"

const Dry = () => {
    const [element, controls] = useScroll();
    return (
        <div className='container10' ref={element}>
            <motion.div

variants={headerAnimation}
animate={controls}
transition={{ delay: 0.2, type: "tween" }}
>
            <Row className="joy align-items-center">
                <Col lg="5" md="12" >
                    <h1>Chicago’s Premier Online Dry Cleaning Services</h1>
                </Col>

                <Col lg="7" className="this">
                    <Row className='now'>
                        {/* btn1 */}

                        <div className="ch btn btn-danger justify-content-center align-items-center" style={{ borderRadius: "0.25em" }}>
                            <span className="ripple">Email Us</span>
                        </div>
                        {/* btn2 */}
                        <div className="ch btn btn-danger justify-content-center align-items-center" style={{ borderRadius: "0.25em" }}>
                            <span className="ripple">Call Us</span>
                        </div>
                        {/* btn3 */}
                        <div className="ch btn btn-danger justify-content-center align-items-center" style={{ borderRadius: "0.25em" }}>
                            <span className="ripple"> Schedule A Pickup</span>
                        </div>

                    </Row>
                </Col>


            </Row>
        </motion.div>

        </div >
    )
}

export default Dry
