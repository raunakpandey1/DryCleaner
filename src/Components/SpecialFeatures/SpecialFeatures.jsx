import React from "react"
import './specialfeatures.scss';
import { textAnimation, headerAnimation, imageAnimation, cardAnimation } from "../../utils/Animations";
import { useScroll } from "../useScroll/useScroll";
import { motion } from 'framer-motion/dist/framer-motion'

const SpecialFeatures = () => {
    const [element, controls] = useScroll();
    return (
        <div ref={element}>
             <motion.div

variants={headerAnimation}
animate={controls}
transition={{ delay: 0.2, type: "tween" }}
>
            <p className="p9">This page features specials, coupons and deals that you may use while booking. Please advice us of the coupon when you call in. This is our way of saying thank you to all the customers who support us in our services and in being environmentally conscious.</p>
            </motion.div>
        </div>
    )
}

export default SpecialFeatures
