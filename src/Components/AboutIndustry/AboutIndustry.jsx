import React from 'react'
import {  Col, Row } from 'react-bootstrap';
import "./aboutindustry.scss"
import { cardAnimation, headerAnimation, textAnimation, imageAnimation } from "../../utils/Animations";
import { useScroll } from "../useScroll/useScroll";
import { motion } from 'framer-motion/dist/framer-motion'

const AboutIndustry = () => {
    const [element, controls] = useScroll();
    return (
        <div
            className='join' ref={element}>
                <motion.div
                
                variants={cardAnimation}
                animate={controls}
                transition={{ delay: 0.2, type: "tween" }}
            >
        <Row className="title">
            <Col className='jod'>
                <h2 className=''> <b>Our Services</b></h2>
                {/* <p className='align-items-center'>We serve the entire Residential &amp; Commercial needs in Chicago. Our advanced B2B <br /> management team helps Businesses to grow Fast , Easy &amp; in an affordable manner.</p> */}
            </Col>
        </Row>

        <Row className='justify-content-center '>
            {/* 1 */}

            <Col lg="4" md="6" s="12" className="bg">
                <img src="res.jpg" alt="" data-black-overlay="5" style={{ width: "80%", height: "100%", }}  />
                <div className="centered1">
                    
                </div>
            </Col>

            {/* 2 */}

            <Col lg="4" md="6" s="12" className="bg">
                <img src="com.jpg" alt="" data-black-overlay="5" style={{ width: "80%" }} />
                <div className="centered1">
                
                </div>
            </Col>

            {/* 3 */}

            <Col lg="4" md="6" s="12" className="bg">
                <img src="hotel.jpg" alt="" data-black-overlay="5" style={{ width: "80%" }} />
                <div className="centered1">
               
                </div>
            </Col>



        </Row>
        </motion.div>
    </div>
    )
}

export default AboutIndustry
