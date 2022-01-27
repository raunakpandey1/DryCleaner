import React from 'react'
import { Container, Col, Row } from 'react-bootstrap';
import Title from 'react-vanilla-tilt'
import "./eco.scss";
import { cardAnimation, headerAnimation, textAnimation, imageAnimation } from "../../utils/Animations";
import { useScroll } from "../useScroll/useScroll";
import { motion } from 'framer-motion/dist/framer-motion'
const Eco = () => {
    const [element, controls] = useScroll();
    return (
        <div className="join1" ref={element}>
            <motion.div

                variants={cardAnimation}
                animate={controls}
                transition={{ delay: 0.2, type: "tween" }}
            >
                <h2 className='main text-center' ref={element}>
                    <motion.div

                        variants={headerAnimation}
                        animate={controls}
                        transition={{ delay: 0.2, type: "tween" }}
                    > What is Eco Friendly dry Cleaning
                    </motion.div></h2>
                <Row className="row align-items-center ">
                    <Col className="work xl=7 lg=6" ref={element}>
                        <motion.div
                            variants={textAnimation}
                            animate={controls}
                            transition={{
                                duration: 1,
                            }}
                        >
                            <p className='ecoCont'>Most cleaners claim they are ‘eco-friendly’ however, if you look closer, they are using a dry cleaning solution called hydrocarbon. Yes, it is far better than the cancer-causing perchloroethylene, or PERC, which
                                will be banned as of 2023. However, hydrocarbon is still a petrochemical with little research on the ongoing effects on the environment and our health. Be cautious of cleaners that say they are ‘organic’, and/or ‘environmentally friendly’ dry cleaners, as hydrocarbon is a by-product of oil, which is actually ‘organic’ and naturally occurring. Be sure to ask, what dry cleaning solvent do you use!
                            </p>

                            <p>
                                Being an end-to-end environmentally friendly dry cleaner doesn’t just mean what type of dry cleaning solvent you use, it also refers to the other waste-producing products you use, such as single-use
                                plastic bags, and single-use wire hangers. </p>
                        </motion.div>
                    </Col>
                    <Col className='told'>
                        <div class="video434" ref={element}>
                            <motion.div

                                variants={imageAnimation}
                                animate={controls}
                                transition={{ type: "tween" }}
                            >
                                <Title style={{}}>
                                    <div className='Title-inner'>
                                        <img src="/eco.jpg" alt="video-thumb" className='vanilla' style={{
                                            width: "100%"
                                        }} />

                                    </div>
                                </Title>
                            </motion.div>
                        </div>

                    </Col>
                </Row>
            </motion.div>
        </div>
    )
}

export default Eco
