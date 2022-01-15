import './aboutdes.scss';
import { textAnimation, headerAnimation, imageAnimation } from "../../utils/Animations";
import { useScroll } from "../useScroll/useScroll";
import { motion } from 'framer-motion/dist/framer-motion'
const AboutDes = () => {
  const [element, controls] = useScroll();
  return (

    <div

      className="about" ref={element}>
      <motion.div

        variants={headerAnimation}
        animate={controls}
        transition={{ delay: 0.2, type: "tween" }}
      >
        <h1 className="h1">About Us</h1>
        <p className="p">
          We provide dry cleaning free pick up and &nbsp;<span className="p2">
            delivery within the following
            ZIP codes and surrounding:
          </span>
          {' '}
          <br />
          {' '}
          <p className="p1">areas: 60657, 60614, 60610,60613</p>

        </p>
      </motion.div>
    </div>

  );
};
export default AboutDes;