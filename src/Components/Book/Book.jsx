import React from 'react'
import { Col, Row } from 'react-bootstrap';
import "./book.scss"
import { textAnimation, headerAnimation, imageAnimation } from "../../utils/Animations";
import { useScroll } from "../useScroll/useScroll";
import { motion } from 'framer-motion/dist/framer-motion'

const Book = () => {
    const [element, controls] = useScroll();
    return (
        <div>
            <div className="join3" ref={element}>
                <motion.div

                    variants={headerAnimation}
                    animate={controls}
                    transition={{ delay: 0.2, type: "tween" }}
                >
                    <h2 className=' title1 text-center'> Book our services</h2>
                    <Row className="ko align-items-center" >

                        <Col className="ser" ref={element}>
                            <motion.div
                                variants={textAnimation}
                                animate={controls}
                                transition={{
                                    duration: 1,
                                }}
                            >
                                <p>At Chicago Green Cleaners, we strongly believe that it is our duty to provide an unparalleled service and expertise to our clients. We recognize that your expectations may be high, but our commitment and assurance to you will forever tackle every issue on your behalf in a result-driven and customer-friendly manner.</p>
                                <div className="all align-items-center">
                                    <Row>
                                        <Col>
                                            {/* btn1 */}
                                            <div className="ch btn btn-success justify-content-center align-items-center" style={{ borderRadius: "0.25em" }}>
                                                <span className="ripple">Book Now</span>
                                            </div>
                                        </Col>
                                        <Col>
                                            {/* btn2 */}
                                            <div className="ch btn btn-success justify-content-center align-items-center" style={{ borderRadius: "0.25em" }}>
                                                <span className="ripple">Read Now</span>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                </motion.div>
                        </Col>
                        <Col lg="6" md="6" className='where '>
                            <div class="video56" ref={element}>
                                <motion.div

                                    variants={imageAnimation}
                                    animate={controls}
                                    transition={{ type: "tween" }}
                                >

                                    <div className='Title-inner'>
                                        <img src="/eco.jpg" alt="video-thumb" className='vanilla' style={{
                                            width: "80%", float: "right"
                                        }} />

                                    </div>
                                </motion.div>

                            </div>

                        </Col>

                    </Row>
                </motion.div>
            </div>

        </div >
    )
}

export default Book
