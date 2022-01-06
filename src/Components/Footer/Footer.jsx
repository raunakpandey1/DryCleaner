import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { useScroll } from "../useScroll/useScroll";
import { motion } from 'framer-motion/dist/framer-motion'
import "./footer.scss"
import { fromUp, fromDown } from "../../utils/Animations";
const Footer = () => {
    const [element, controls] = useScroll();

    return (
        <div className='footer1' style={{ backgroundColor: "#1a1e32", color: "white", textDecoration: "none", padding: "2%" }} ref={element} >
            <Container>

                <Row className="flex justify-content-md-center">
                    <Col lg="4" md="6" >
                    <motion.div
 variants={fromUp}
 animate={controls}
 transition={{ duration: 0.5 }}>
                        <a href=''>
                            <img src="/logo.jpg" alt="logo" />
                        </a>
                        <p><b>You expect the best and deserve none the less</b><br />Are you looking for better service and more value for your money? We live in a world were good customer service is always desired but seldom experienced.</p>


                        <img src="/100.jpg" alt="logo1" />
                        <img src="/b.jpg" alt="logo2" />
                        <img src="/g.jpg" alt="logo3" />
                        </motion.div>
                    </Col>



                    {/* QUICK LINKS */}
                    <Col lg="2" md="6" >
                    <motion.div
                    variants={fromDown}
                    animate={controls}
                    transition={{ duration: 0.5 }}>
                        <h3>QUICK LINK </h3>

                        <div className="align">

                            <a className="link d-inline " href='/'>Home</a>
                            <a className="link d-block" href='/'>About Us</a>
                            <a className="link d-block" href='/'>Pricing</a>
                            <a className="link d-block" href='/'>Specials</a>
                            <a className="link d-block" href='/'>Gallery</a>
                            <a className="link d-block" href='/'>Contacts</a>
                            <a className="link d-block" href='/'>Sitemap</a>


                        </div>
                        </motion.div>
                    </Col>

                    {/* FIND US */}
                    <Col lg="3" md="6" >
                    <motion.div
            variants={fromUp}
            animate={controls}
            transition={{ duration: 0.5 }}
          >
                        <h3>FIND US ON </h3>
                        <a className='icon'>
                            <img src="/google.png" alt="" style={{ width: '80%' }} />
                        </a>
                        <a className='icon'>
                            <img src="/yelp.png" alt="" style={{ width: '90%' }} />
                        </a>
                        </motion.div>
                    </Col>

                    {/* QUICK CONTACT */}
                    <Col lg="3" md="6"  >
                    <motion.div
            variants={fromDown}
            animate={controls}
            transition={{ duration: 0.5 }}
          >

                        <h3>QUICK CONTACT </h3>
                        <ul>
                            <li>

                                <span> Phone</span>
                                <p>
                                    <a href='' style={{ textDecoration: 'none', color: 'white' }}>773 472-2391</a>
                                </p>
                                <p>
                                    <a href='' style={{ textDecoration: 'none', color: 'white' }}>321.505.9138</a>
                                </p>
                            </li>
                            <li>
                                <span>Email</span>
                                <p>
                                    <a href='' style={{ textDecoration: 'none', color: 'white' }}>azim@chicagogreendrycleaner.com</a>
                                </p>
                            </li>

                            <li>

                                <span>Address</span>
                                <p>3545 W Irving Park Rd, Chicago, IL 60618, United States</p>
                            </li>
                        </ul>
                        </motion.div>

                    </Col>




                </Row>

            </Container>



            {/* bottom */}
            <Row by="0" style={{width: "100%"}}>
            <motion.div
            variants={fromUp}
            animate={controls}
            transition={{ duration: 0.5 }}
          >
                <div class="footer-bottom-area bg-dark ">
                    <div class="container">
                        <Row class="row1">
                            <Col lg="7" class="col">
                                <ul class="footer-social">
                                    <li>
                                        <a href="http://www.facebook.com/chicagogreencleaners" style={{ textDecoration: 'none', color: 'white',listStyleType: "none"  }}><i class="fab fa-facebook-f"  ></i> Facebook</a>
                                    </li>
                                    <li>
                                        <a href="https://www.instagram.com/chicagogreendrycleaners/" style={{ textDecoration: 'none', color: 'white',listStyleType: "none"  }}><i class="fab fa-instagram" ></i> Instagram</a>
                                    </li>
                                </ul>
                            </Col>
                            <div class="col-lg-5">
                                <p class="footer-copyright">Copyright ©
                                    <a href="" style={{ textDecoration: 'none', color: 'white',listStyleType: "none"  }}>Chicago Green Cleaners</a> 2021. All Right Reserved</p>
                            </div>
                        </Row>
                    </div>
                </div>
</motion.div>
            </Row>




        </div>
    )
}

export default Footer







