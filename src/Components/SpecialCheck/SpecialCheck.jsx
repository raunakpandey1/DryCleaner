import React from "react"
import { textAnimation, headerAnimation, imageAnimation, cardAnimation } from "../../utils/Animations";
import { useScroll } from "../useScroll/useScroll";
import { motion } from 'framer-motion/dist/framer-motion'
import './specialcheck.scss'

const SpecialCheck = () => {
    const [element, controls] = useScroll();
    return (
        <div className="head" ref={element}>
             
            <p className="po" >
            <motion.div

variants={headerAnimation}
animate={controls}
transition={{ delay: 0.2, type: "tween" }}
>Check our Facebook page and become a fan for Monthly specials and information on garments!</motion.div></p>
            <button className="b1">  <motion.div

variants={cardAnimation}
animate={controls}
transition={{ delay: 0.2, type: "tween" }}
>Check Now</motion.div></button>
            
        </div>
    )
}

export default SpecialCheck
