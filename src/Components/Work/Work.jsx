import React from 'react'
import "./work.scss"
import { useScroll } from "../useScroll/useScroll";
import { motion } from 'framer-motion/dist/framer-motion'
import { Container, Col, Row } from "react-bootstrap";
import { cardAnimation, textAnimation } from "../../utils/Animations";
import img8 from './img11.jpeg'
const Work = () => {
    const [element, controls] = useScroll();
    return (
        <div>
        <div className='workHead'><h2>How it Works</h2></div>
        <div className='danny'>
            
            <img src={img8} alt="" className='hd' style={{ width: "100%" }} />
            <div className="no"style={{padding:"22px"}}>
            <motion.div
            variants={cardAnimation}
            animate={controls}
            transition={{ duration: 0.5 }}>


                <Row className='tro' ref={element}>
                    <motion.div variants={textAnimation}
                        animate={controls}
                        transition={{ duration: 1 }}>
                    <Col className='lp'>

                        
                        <p>Book your laundry service in just a few clicks . Dry Cleaning made easy with Chicago Green Dry Cleaners.</p>
                    </Col>
                    </motion.div>
                </Row>

                <Row className='zz'>

                    <Col className='ll'>
                        <i class="fa fa-mobile fa-4x imgwork" style={{ color: "#e34a32", justifyContent: "center", display: "flex" }}></i>
                        <h4 className='text-center'>1</h4>
                        <p>Choose when and where you wish us to collect &amp; deliver your laundry.</p>
                    </Col>


                    <Col className='ll'>
                        <i class="fa fa-car fa-4x imgwork1" style={{ color: "#e34a32", justifyContent: "center", display: "flex" }}  ></i>
                        <h4 className='text-center'>2</h4>
                        <p>We collect your bag, list and clean your items according to your requirements.</p>            </Col>

                    <Col className='ll'>
                        <img src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/64/fa314a/external-tshirt-clothes-and-fashion-kiranshastry-solid-kiranshastry.png" className='juice ' />
                        <h4 className='text-center'>3</h4>
                        <p>We deliver your items cleaned within 24 hours and at the time required.</p>
                    </Col>

                </Row>
                </motion.div>
            </div>
        
    </div>
        </div>
        
    )
}

export default Work
