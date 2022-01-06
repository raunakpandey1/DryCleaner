import Home from "./Pages/Home";
import About from "./Pages/About";
import Specials from "./Pages/Specials";
import Pricing from "./Pages/Pricing";
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import ScrollToTop from '../src/Components/ScrollToTop/ScrollToTop'
import { motion } from 'framer-motion/dist/framer-motion'





const App = () => {
  return (
    <div>
      <motion.div initial="hidden" animate="show" className="App">
      <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/specials" element={<Specials />} />
          <Route path="/pricing" element={<Pricing />} />
          
        </Routes>
        </motion.div> 
     
    </div>
  );
}


export default App;
