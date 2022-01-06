import React from "react"
import './payment.scss';
import { textAnimation, headerAnimation, cardAnimation } from "../../utils/Animations";
import { useScroll } from "../useScroll/useScroll";
import { motion } from 'framer-motion/dist/framer-motion'

const Payment = () => {
    const [element, controls] = useScroll();
    return (
        <div className="payment" ref={element}>
            <motion.div

variants={headerAnimation}
animate={controls}
transition={{ delay: 0.2, type: "tween" }}
>
            <div className="pay1">Payment:</div>
            
            <p className="p99">The prices above are for basic garments. Additional details such as pockets, pleats and fancy clothes may require additional costs. Specific garments made of silk, satin and chiffon are differently priced and may require additional charges as well. To enquire more about the pricing, please call our pick-up/delivery hotline. Our customer service representative will be able to give you a precise estimate of your costs.</p>
            <p className="p98">All major credit and debit cards are accepted. You will only be charged once the whole order is complete.</p>
            </motion.div>
        </div>
    )
}

export default Payment
