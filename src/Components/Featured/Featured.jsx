import React from "react";
import { Container, Col, Row, Section } from "react-bootstrap";
import "./featured.scss";
import { cardAnimation, headerAnimation } from "../../utils/Animations";
import { useScroll } from "../useScroll/useScroll";
import { motion } from 'framer-motion/dist/framer-motion'
const Featured = () => {
  const [element, controls] = useScroll();
  return (
    <div>
      <div className="head1" ref={element}>
        <motion.div

          variants={headerAnimation}
          animate={controls}
          transition={{ delay: 0.2, type: "tween" }}
        >
          <Container className="main">

            <h1 className="h11">
              <b>Featured Services</b>
            </h1>
            <p className="p1">
              We offer the best &amp; the most eco friendly techniques to keep
              your clothes intact &amp; in <br />
              best quality. We offer same day services on Demand.
            </p>


            <Row className="group" >
              {/* first card */}

              <Col className="dummy1 lg-4 md-6 " ref={element}>
                <motion.div

                  variants={cardAnimation}
                  animate={controls}
                  transition={{ delay: 0.2, type: "tween" }}
                >
                  <div className="service text-center">
                    <div className="service-icon">
                      <img src="./wash.jpg" alt="" style={{ width: "50%" }} />
                    </div>
                    <div className="content">
                      <h4 className="h41">Wash & Fold Laundry Service</h4>
                      <p>
                        Our Wash & Fold service gives you time back for the things
                        you enjoy. Bring your pants, shorts, shirts, socks, and
                        more. We’ll expertly clean and return laundry ready to be
                        placed in the drawer!
                      </p>
                    </div>
                  </div>
                </motion.div>
              </Col>

              {/* second card */}
              <Col className="dummy1 lg-4 md-6 " ref={element}>
                <motion.div

                  variants={cardAnimation}
                  animate={controls}
                  transition={{ delay: 0.2, type: "tween" }}
                >
                  <div className="service text-center">
                    <div className="service-icon">
                      <img src="./wash1.jpg" alt="" style={{ width: "50%" }} />
                    </div>
                    <div className="content">
                      <h4 className="h42">Commercial Laundry Service</h4>
                      <p>
                        We offer large-scale commercial dry cleaning of uniforms,
                        drapes, and other items. Our experienced fleet of drivers
                        will make sure your commercial laundry order is picked up
                        and delivered on time, every time!
                      </p>
                    </div>
                  </div>
                </motion.div>
              </Col>

              {/* third card */}
              <Col className="dummy1 lg-4 md-6 " ref={element}>
                <motion.div

                  variants={cardAnimation}
                  animate={controls}
                  transition={{ delay: 0.2, type: "tween" }}
                >
                  <div className="service text-center">
                    <div className="service-icon">
                      <img src="./wash2.jpg" alt="" style={{ width: "50%" }} />
                    </div>
                    <div className="content">
                      <h4 className="h43">Self Service and Laundromat</h4>
                      <p>
                        Chicago Green Dry cleaners offers “State of the Art”
                        commercial equipment to handle all your laundry needs.
                        Please ask one of our friendly laundromat attendants for
                        assistance in finding the best machines to complete your
                        self-service laundry as efficiently and cost-effectively as
                        possible.
                        <br></br>
                        <br></br>
                      </p>
                    </div>
                  </div>
                </motion.div>
              </Col>

            </Row>
          </Container>
        </motion.div>
      </div>

    </div >
  );
};

export default Featured;
