import React, { useState } from 'react';
import './button.scss';
import { Container, Col, Row, Section } from 'react-bootstrap';
import { cardAnimation, fromUp, headerAnimation, imageAnimation } from "../../utils/Animations";
import { useScroll } from "../useScroll/useScroll";
import { motion } from 'framer-motion/dist/framer-motion'
import { Modal } from './Modal';

// This file is used for cliet component not for button purpose client feedback


const Button = () => {
  const [element, controls] = useScroll();



  const [show, setShow] = useState(false);

  const closeModalHandler = () => setShow(false);

  
  return (

    
    <div className="button100">


      <Row className="title96" ref={element}>
        <motion.div

          variants={headerAnimation}
          animate={controls}
          transition={{ delay: 0.2, type: "tween" }}
        >
          <h1 className="h11">
            <b>Client Feedback</b>
          </h1>
          <p className="p1">
            Know what &amp; our clients are saying about their experience with us.&amp; Customer service is our
            {' '}
            <br />
            top priority & we make sure our service satisfaction is at its best.
          </p>
        </motion.div>
      </Row>

      <Row className="slick">
       
          <img className='im1' src="thumb-1.png" alt="" data-black-overlay="5" style={{ width: "20%", }} />
          <p className='p78'><b>great service </b> </p>
          <h6 className='p88'>James</h6>
          <p className='p96'>Apple.Inc</p>
          
      </Row>
      <div className="last691">
        <div
          className="ch btn btn-danger mr-5"
          style={{ borderRadius: '0.25em' }}
        >{ show ? <div onClick={closeModalHandler} className="back-drop"></div> : null }
          <span onClick={() => setShow(true)} className="ripple">Submit Review</span>
          <Modal show={show} close={closeModalHandler} />
          {/* start */}
          {/* <div >
      { show ? <div onClick={closeModalHandler} className="back-drop"></div> : null }
      <button onClick={() => setShow(true)} className="btn-openModal">Submit Review</button>
      <Modal show={show} close={closeModalHandler} />
    </div> */}
      {/* end */}
      
        </div>
      </div>
     
    </div>
    
  );
};

export default Button;
