import React from "react";
import './tablecomponent.scss';
import { textAnimation, headerAnimation, cardAnimation } from "../../utils/Animations";
import { useScroll } from "../useScroll/useScroll";
import { motion } from 'framer-motion/dist/framer-motion'

const TableComponent = ({ text1, text2, text3 }) => {
    const [element, controls] = useScroll();
    return (

        <div className="tabl1" ref={element}>
            <motion.div

                variants={cardAnimation}
                animate={controls}
                transition={{ delay: 0.2, type: "tween" }}
            ><div className="tab11">
                    {text1}
                </div>
                <div className="tab2">{text2}</div>
                <div className="tab3">{text3}</div>
                </motion.div></div>

    )
}

export default TableComponent
