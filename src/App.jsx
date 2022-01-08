import Home from "./Pages/Home";
import About from "./Pages/About";
import Specials from "./Pages/Specials";
import Pricing from "./Pages/Pricing";
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import ScrollToTop from '../src/Components/ScrollToTop/ScrollToTop'
import { motion } from 'framer-motion/dist/framer-motion'
import { LoginForm } from "./Components/accountBox/loginForm";
import { SignupForm } from "./Components/accountBox/signupForm";
import { Services } from "./Pages/Services/Services";





const App = () => {
  return (
    <div>
      <motion.div initial="hidden" animate="show" className="App">
      <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/services" element={<Services />} />
          
          <Route path="/about" element={<About />} />
          <Route path="/specials" element={<Specials />} />
          <Route path="/pricing" element={<Pricing />} />
          
        </Routes>
        </motion.div> 
     
    </div>
  );
}


export default App;
