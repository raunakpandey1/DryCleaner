import React, { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import Popup from '../Popup/Popup'
import { AccountBox } from "../accountBox";
import Info from "../Info/Info";
import './Navbar.css'
import { motion } from 'framer-motion/dist/framer-motion'
import { navbarAnimation } from "../../utils/Animations";
import { NavLink, useNavigate } from 'react-router-dom';
import avatar from '../../img/avatar.jpg'
import { signOut } from 'firebase/auth';
import { auth } from '../../fbconfig';
 
const Navbar = () => {
  const navigate = useNavigate()
  const [click, setClick] = useState(false)
  const handleClick = () => setClick(!click)

  const closeMenu = () => setClick(false)
  const [buttonPopup1, setButtonPopup1] = useState(false);
  const [buttonPopup, setButtonPopup] = useState(false);
  const hasToken = (token) => {
    if (token) {
      return true
    }
  }

  // const { from } = { from: { pathname: '/signin' }};
  //           if (!hasToken(JSON.parse(localStorage.getItem('authenticated')))) {
  //             return (
  //               <Navigate to={from} />
  //             )
  //           }
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
          {/* <li className='nav-item'>
            <a href='/' onClick={closeMenu}>GALLERY</a>
          </li> */}
          <li className='nav-item'>
            <a href='/services' onClick={closeMenu}>SERVICES</a>
          </li>
          <li className='nav-item navprof'>
          <div className="cpUpperLeft">
                                    <img src={ avatar} alt="" />
                                     
                                     <div>
                                     <p className='profTitle'>Sham</p>
                                     </div>
                                </div>
          </li>
          <li className='nav-item'>
          <div>
              <div className="cho btn-success " onClick={() => signOut(auth).then(() => {
                  // Sign-out successful.
                  console.log('Sign-out successful')
                  localStorage.removeItem('authenticated');
                  navigate('/signin')
                }).catch((error) => {
                  // An error happened.
                  const errorCode = error.code;
                  console.log(errorCode)
                })} style={{ borderRadius: "1em" }}>
                <span className="ripple27" >Logout</span>
              </div>
            </div>
          </li>

          <div className="dragon">
            {/* btn1 */}
            <div className='ch1'>  <div className="cho9 btn-danger" style={{ borderRadius: "1em" }}>
              <span className="ripple27">773 472-2391 </span>
            </div></div>

            {/* btn2 */}
            {/* <div className='ch1'>
              <div className="cho btn-danger " onClick={() => setButtonPopup1(true)} style={{ borderRadius: "1em" }}>
                <span className="ripple27" > Submit </span>

              </div>
            </div> */}
            {/* btn3 */}

            {/* <div>
              <div className="cho btn-success " onClick={() => setButtonPopup(true)} style={{ borderRadius: "1em" }}>
                <span className="ripple27" >Login</span>
              </div>
            </div> */}
            {/* <div>
              <div className="cho btn-success " onClick={() => signOut(auth).then(() => {
                  // Sign-out successful.
                  console.log('Sign-out successful')
                  localStorage.removeItem('authenticated');
                  navigate('/signin')
                }).catch((error) => {
                  // An error happened.
                  const errorCode = error.code;
                  console.log(errorCode)
                })} style={{ borderRadius: "1em" }}>
                <span className="ripple27" >Logout</span>
              </div>
            </div> */}
            
          
            {/* btn4 */}
            {/* <div>
              <div className="cho btn-success " onClick={() => setButtonPopup(true)} style={{ borderRadius: "1em" }}>
                <span className="ripple27" > SignUp</span>

              </div>
             
            </div> */}
            {/* <div>
            <div className="cpUpperLeft">
                                    <img src={ avatar} alt="" /> */}
                                    {/* <div className="menu-content">
                                        <div className="menuList">
                                            <NavLink exact className="links" to='/profile'>Profile</NavLink>
                                        </div>
                                         
                                    </div> */}
                                     {/* <div>
                                     <p className='profTitle'>Raunak</p>
                                     </div>
                                </div>
            </div>
             */}
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