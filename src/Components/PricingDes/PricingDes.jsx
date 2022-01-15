import './pricingdes.scss';
import { textAnimation, headerAnimation, imageAnimation } from "../../utils/Animations";
import { useScroll } from "../useScroll/useScroll";
import { motion } from 'framer-motion/dist/framer-motion'
const AboutDes = () => {
  const [element, controls] = useScroll();
  return (
    <div className="pricing" ref={element}>
       <motion.div

variants={headerAnimation}
animate={controls}
transition={{ delay: 0.2, type: "tween" }}
>
      <h1 className="h1">Pricing</h1>
      <p className="p">
      The prices are for basic garments. Additional details such as pockets, pleats and fancy clothes may
        {' '}
        <br />
        {' '}
        <p className="p1111">require additional costs.</p>

      </p>
      </motion.div>
    </div>
  );
};
export default AboutDes;