import './specialdes.scss';
import { textAnimation, headerAnimation, imageAnimation } from "../../utils/Animations";
import { useScroll } from "../useScroll/useScroll";
import { motion } from 'framer-motion/dist/framer-motion'
const SpecialDes = () => {
  const [element, controls] = useScroll();
  return (
    <div className="special" ref={element}> 
    <motion.div

variants={headerAnimation}
animate={controls}
transition={{ delay: 0.2, type: "tween" }}
>
      <h1 className="h1">Special</h1>
      <p className="p5">
      Please check again soon for upcoming promotions.
        {' '}
        <br />
        {' '}


      </p>
      </motion.div>
    </div>
  );
};
export default SpecialDes;