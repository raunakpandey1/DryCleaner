import React, { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import Popup from '../Popup/Popup'
import { AccountBox } from "../accountBox";
import Info from "../Info/Info";
import './Navbar.css'
import { motion } from 'framer-motion/dist/framer-motion'
import { navbarAnimation } from "../../utils/Animations";
const Navbar = () => {

  const [click, setClick] = useState(false)
  const handleClick = () => setClick(!click)

  const closeMenu = () => setClick(false)
  const [buttonPopup1, setButtonPopup1] = useState(false);
  const [buttonPopup, setButtonPopup] = useState(false);

  return (
    <div>
      <motion.div

        variants={navbarAnimation}
        transition={{ delay: 0.1 }}

        className='header'>
      <nav className='navbar'>
        <a href='/' className='logo'>
          <img src="/logo.jpg" alt="logo" width={300} height={50} />
        </a>
        <div className='hamburger' onClick={handleClick}>
          {click ? (<FaTimes size={30} style={{ color: '#ffffff' }} />)
            : (<FaBars size={30} style={{ color: '#ffffff' }} />)}

        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className='nav-item'>
            <a href='/' onClick={closeMenu}>HOME</a>
          </li>
          <li className='nav-item'>
            <a href='/about' onClick={closeMenu}>ABOUT</a>
          </li>
          <li className='nav-item'>
            <a href='/specials' onClick={closeMenu}>SPECIALS</a>
          </li>
          <li className='nav-item'>
            <a href='/pricing' onClick={closeMenu}>PRICING</a>
          </li>
          <li className='nav-item'>
            <a href='/' onClick={closeMenu}>GALLERY</a>
          </li>
          <li className='nav-item'>
            <a href='/' onClick={closeMenu}>CONTACTS</a>
          </li>
          <div className="dragon">
            {/* btn1 */}
            <div className='ch1'>  <div className="cho9 btn-danger" style={{ borderRadius: "1em" }}>
              <span className="ripple27">773 472-2391 </span>
            </div></div>

            {/* btn2 */}
            <div className='ch1'>
              <div className="cho btn-danger " onClick={() => setButtonPopup1(true)} style={{ borderRadius: "1em" }}>
                <span className="ripple27" > Submit </span>

              </div>
            </div>
            {/* btn3 */}

            <div>
              <div className="cho btn-success " onClick={() => setButtonPopup(true)} style={{ borderRadius: "1em" }}>
                <span className="ripple27" >Login</span>
              </div>
            </div>
            {/* btn4 */}
            <div>
              <div className="cho btn-success " onClick={() => setButtonPopup(true)} style={{ borderRadius: "1em" }}>
                <span className="ripple27" > SignUp</span>

              </div>
            </div>

            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
              <AccountBox />
            </Popup>

            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
              <AccountBox />
            </Popup>

            <Popup trigger={buttonPopup1} setTrigger={setButtonPopup1}>
              <Info />
            </Popup>


          </div>
        </ul>

      </nav>
      </motion.div>


    </div>
  )
}

export default Navbar