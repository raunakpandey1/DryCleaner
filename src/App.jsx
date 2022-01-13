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
import { Vendors } from "./Pages/Services/Vendors";
import { Items } from "./Pages/Items/Items";
import { AuthContextProvider } from "./auth/useAuth";
import Cart from "./Pages/Carts/Cart";
 



const App = () => {
  return (
    <div>
      <motion.div initial="hidden" animate="show" className="App">
      <ScrollToTop />
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/services" element={<Items />} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/services/vendors" element={<Vendors />} />
          <Route path="/vendors/:id/items" element={<Items />} />
          <Route path="/about" element={<About />} />
          <Route path="/specials" element={<Specials />} />
          <Route path="/pricing" element={<Pricing />} />
          
        </Routes>
        </AuthContextProvider>
        </motion.div> 
     
    </div>
  );
}


export default App;
