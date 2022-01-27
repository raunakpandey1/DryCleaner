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
import Contact from "./Components/Contact/Contact.jsx";
import Gallery from "./Components/gallery/Gallery.js" 
import Account from "./Components/OrderDetails/Account/Account.js"
import ChangePass from "./Components/OrderDetails/Changepassword/Changepassword.js"
import UpdateProfile from "./Components/OrderDetails/UpdateProfile/UpdateProfile.js"
import Address from "./Components/OrderDetails/Address/Address"
import CardDetails from "./Components/OrderDetails/CardDetails/CardDetails"
import Building from "./Components/Building/Building";
import Commercial from "./Components/Building/Commercial";
import Hotel from "./Components/Building/Hotel";
import WpIcon from "./Components/WpIcon/WpIcon";
import PrintOrder from "./Components/OrderDetails/Account/PrintOrder";
const App = () => {
  return (
    <div>
    
      <motion.div initial="hidden" animate="show" className="App">
      <WpIcon />
      <ScrollToTop />
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/services" element={<Items />} />
          <Route path="/contacts" element={<Contact />} />
          <Route path="/Gallery" element={<Gallery />} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/services/vendors" element={<Vendors />} />
          <Route path="/vendors/:id/items" element={<Items />} />
          <Route path="/about" element={<About />} />
          <Route path="/specials" element={<Specials />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/orderDetails" element={<Account />} />
          <Route path="/orderDetails/:id" element={<PrintOrder />} />
          <Route path="/changepassword" element={<ChangePass />} />
          <Route path="/updateProfile" element={<UpdateProfile />} />
          <Route path="/updateAddress" element={<Address />} />
          <Route path="/updateCardDetails" element={<CardDetails />} />
          <Route path="/Residential" element={<Building />} />
          <Route path="/Commercial" element={<Commercial />} />
          <Route path="/Hotel" element={<Hotel />} />
        </Routes>
        </AuthContextProvider>
        </motion.div> 
     
    </div>
  );
}


export default App;
