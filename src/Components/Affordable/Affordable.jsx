import React from 'react'
import { Container, Col, Row, Section } from 'react-bootstrap';
import "./affordable.scss"
import { cardAnimation, headerAnimation } from "../../utils/Animations";
import { useScroll } from "../useScroll/useScroll";
import { motion } from 'framer-motion/dist/framer-motion'
const Affordable = () => {
    const [element, controls] = useScroll();
    return (
            <div className='head69' ref={element}>
                 <motion.div
                
                variants={cardAnimation}
                animate={controls}
                transition={{ delay: 0.2, type: "tween" }}
            >
            <Container className='main7 '>
                <Row className='title1'>
                    <h1 className='bar'><b>Affordable Prices</b></h1>
                    
                    <p>how much does it cost</p>
                </Row>


                <Row className='group'>
                    {/* first card */}
                    <Col className='dummy3 lg-4 md-6 '>
                        <div className="service text-center">
                            <div className="service-icon">
                                <img src="./t.jpg" alt="" style={{ width: "50%" }} />
                            </div>
                            <div className="content">
                                <h4>Men`s Shirts Laundered and Pressed</h4>
                                <p>Men`s button down shirts. Collar support included on Hanger.</p>

                            </div>
                        </div>
                    </Col>

                    {/* second card */}
                    <Col className='dummy3 lg-4 md-6 '>
                        <div className="service text-center">
                            <div className="service-icon">
                                <img src="./t.jpg" alt="" style={{ width: "50%" }} />
                            </div>
                            <div className="content">
                                <h4>Wash &#38; Fold Laundry</h4>
                                <p>Undergarments,PJ`s, t-shirts etc.. anything you like to wash and fold without pressing.</p>

                            </div>
                        </div>
                    </Col>

                    {/* third card */}
                    <Col className='dummy3 lg-4 md-6 '>
                        <div className="service text-center">
                            <div className="service-icon">
                                <img src="./t.jpg" alt="" style={{ width: "50%" }} />
                            </div>
                            <div className="content">
                                <h4>Two Piece Suit</h4>
                                <p>Dry Clean two piece suit. Men and Women. Sleeves filled with tissue to avoid crease.</p>
                            </div>
                        </div>
                    </Col>




                </Row >
{/* button */}
                <div className='last69'>
                <div className="ch btn btn-success justify-content-center align-items-center"style={{borderRadius:"0.25em"}}>
        <span className="ripple">View Full Price List</span>
      </div>
                </div>
            </Container>
            </motion.div>
        </div>
    )
}

export default Affordable
