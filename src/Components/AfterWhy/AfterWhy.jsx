import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import Title from 'react-vanilla-tilt';
import { cardAnimation, headerAnimation, textAnimation, imageAnimation } from "../../utils/Animations";
import { useScroll } from "../useScroll/useScroll";
import './afterwhy.scss';
import { motion } from 'framer-motion/dist/framer-motion'
const AfterWhy = () => {
  
  const [element, controls] = useScroll();
  return (
    <div
      className="join1" ref={element}>
        <motion.div

variants={cardAnimation}
animate={controls}
transition={{ delay: 0.2, type: "tween" }}
>
        <Row className="row align-items-center">
          <Col className="told">
            <div class="video">
              <Title style={{}}>
                <div className="Title-inner">
                  <img
                    src="/about1.jpg"
                    alt="video-thumb"
                    className="vanilla"
                    style={{
                      width: '100%',
                    }}
                  />

                </div>
              </Title>
            </div>

          </Col>
          <Col className="work xl=7 lg=6">
            <p>
              At Chicago Green Cleaners, we strongly believe that it is our duty
              to provide an unparalleled service and expertise to our clients. We
              recognize that your expectations may be high, but our commitment and
              assurance to you will forever  tackle every issue on your behalf in a
              result-driven and customer-friendly manner.<br /> <br />
              <br />
              Every customer who walks
              through our doors or utilizes our online services enjoys  our
              attentive, custom-tailored services with an unwavering commitment to
              quality.  Our experience in the garment care industry has been marked
              by exceptional craftsmanship, uncompromising attention to detail and
              our willingness to evolve and improve our processes and services.
              {' '}
              <br />
              <br />
              Our purpose as a laundry service company in Chicago…..
              {' '}
              <br />
              {' '}
              <br />
              {' '}
              To create a
              competitive advantage by setting new standards of customer service
              and customer satisfaction.
              {' '}
              <br />
              <br />
              To surpass our competitors and to be
              acknowledged as the industry leaders in dry cleaning and laundry
              services.
              {' '}
              <br />
              <br />
              To build a foundation that supports our clients in their
              daily duties and enables them to live stress-free lifestyles.
            </p>
          </Col>
        </Row>
        </motion.div>
    </div>
  );
};

export default AfterWhy;
