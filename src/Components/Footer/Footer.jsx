import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { useScroll } from "../useScroll/useScroll";
import { motion } from 'framer-motion/dist/framer-motion'
import "./footer.scss"
import { fromUp, fromDown } from "../../utils/Animations";
import { NavLink, useNavigate } from 'react-router-dom';
const Footer = () => {
    const [element, controls] = useScroll();
    const navigate = useNavigate()
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


                        <img className='footImg' src="/100.jpg" alt="logo1" />
                        <img className='footImg' src="/b.jpg" alt="logo2" />
                        <img className='footImg' src="/g.jpg" alt="logo3" />
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

                            <a className="link d-inline "style={{ textDecoration: 'none', color: 'white' }} href='/'>Home</a>
                            <a className="link d-block" href='/about' style={{ textDecoration: 'none', color: 'white' }}>About Us</a>
                            <a className="link d-block" href='/pricing' style={{ textDecoration: 'none', color: 'white' }}>Pricing</a>
                            <a className="link d-block" href='/specials' style={{ textDecoration: 'none', color: 'white' }}>Specials</a>
                            <a className="link d-block" href='/' style={{ textDecoration: 'none', color: 'white' }}>Gallery</a>
                            <a className="link d-block" href='/' style={{ textDecoration: 'none', color: 'white' }}>Contacts</a>
                            {/* <a className="link d-block" href='/' style={{ textDecoration: 'none', color: 'white' }}>Sitemap</a> */}


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
                            <img src="/google.png" className='imgSocialFoot' onClick={() => window.location.href ='https://www.google.com/search?q=dry%20cleaners%20in%20chicago&rlz=1C1CHBF_enIN883IN883&oq=Dry+cleaners+in+chicago&aqs=chrome.0.35i39j0i512j0i22i30l2j69i60l3j69i65.9915j0j7&sourceid=chrome&ie=UTF-8&tbs=lf:1,lf_ui:14&tbm=lcl&sxsrf=AOaemvLComNM2K_--Il0vF7UaQRQjj7LQg:1642063437065&rflfq=1&num=10&rldimm=9964434204770945957&lqi=ChdkcnkgY2xlYW5lcnMgaW4gY2hpY2Fnb0j__qukmJaAgAhaLRAAEAEYABgBGAIYAyIXZHJ5IGNsZWFuZXJzIGluIGNoaWNhZ28qBggDEAAQAZIBC2RyeV9jbGVhbmVyqgEUEAEqECIMZHJ5IGNsZWFuZXJzKAA&ved=2ahUKEwjvg_X-qq71AhU1lFYBHTH7A1QQvS56BAgDEDs&rlst=f#rlfi=hd:;si:9964434204770945957,l,ChdkcnkgY2xlYW5lcnMgaW4gY2hpY2Fnb0j__qukmJaAgAhaLRAAEAEYABgBGAIYAyIXZHJ5IGNsZWFuZXJzIGluIGNoaWNhZ28qBggDEAAQAZIBC2RyeV9jbGVhbmVyqgEUEAEqECIMZHJ5IGNsZWFuZXJzKAA;mv:[[42.0087869,-87.6156591],[41.790766399999995,-87.7504392]];tbs:lrf:!1m4!1u3!2m2!3m1!1e1!1m4!1u2!2m2!2m1!1e1!1m4!1u16!2m2!16m1!1e1!1m4!1u16!2m2!16m1!1e2!2m1!1e2!2m1!1e16!2m1!1e3!3sIAE,lf:1,lf_ui:14'} alt="" style={{ width: '80%' }} />
                        </a>
                        <a className='icon'>
                            <img className='imgSocialFoot yelpFoot' src="/yelp.png" onClick={() => window.location.href = "https://www.yelp.com/biz/chicago-green-cleaners-chicago-3" } alt="" style={{ width: '90%' }} />
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
                                {/* <p>
                                    <a href='' style={{ textDecoration: 'none', color: 'white' }}>773 472-2391</a>
                                </p> */}
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
                                <p>3545 W Irving Park Rd, Chicago, IL 60618, United States <br></br><br></br>
                                3949 N Pine Grove Ave, Suite 102
Chicago, IL 60613
United States
</p>
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
                                {/* <i class="fab fa-facebook-f"  ></i> */}
                                    <li>
                                        <a href="http://www.facebook.com/chicagogreencleaners" style={{ textDecoration: 'none', color: 'white',listStyleType: "none"  }}><i class="fab fa-facebook-f "></i> &nbsp; Facebook</a>
                                    </li>
                                    <li>
                                        <a href="https://www.instagram.com/chicagogreendrycleaners/" style={{ textDecoration: 'none', color: 'white',listStyleType: "none"  }}> <i class="fab fa-instagram"></i> &nbsp; Instagram</a>
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







