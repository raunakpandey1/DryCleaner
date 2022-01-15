import React, { useState } from "react";
import { ReactComponent as CloseMenu } from "../../assets/hammenu.svg";
import { ReactComponent as MenuIcon } from "../../assets/hammenu.svg";
import "./navbar.scss";
import Popup from '../Popup/Popup'
import { AccountBox } from "../accountBox";
import Info from "../Info/Info";




const Header = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const [buttonPopup1, setButtonPopup1] = useState(false);
  const [buttonPopup, setButtonPopup] = useState(false);


  return (
    <div className="header">
      <div className="logo-nav">
        <div className="logo-container">
          <a href="/">
            <a href="/">
              <img src="/logo.jpg" alt="logo" width={300} height={50} />
            </a>
          </a>
        </div>
        <div className="optionsof">
          <div className={click ? "nav-options active" : "nav-options"}>
            <div className="option" onClick={closeMobileMenu}>
              <a
                href="/"
                className="md:px-4 md:pt-20
                md:pb-10
              text-black
               hover:bg-blue-500
              "
              >
                HOME
              </a>
            </div>

            <div className="option" onClick={closeMobileMenu}>
              <a
                href="/about"
                className="md:px-4 md:pt-20
                md:pb-10
              text-black
               hover:bg-blue-500"
              >
                ABOUT US
              </a>
            </div>

            <div className="option" onClick={closeMobileMenu}>
              <a
                href="/"
                className="md:px-4 md:pt-20
                md:pb-10
              text-black
               hover:bg-blue-500"
              >
                PRICING
              </a>
            </div>

            <div className="option" onClick={closeMobileMenu}>
              <a
                href="#about"
                className="md:px-4 md:pt-20
                md:pb-10
              text-black
               hover:bg-blue-500"
              >
                SPECIALS
              </a>
            </div>

            <div className="option" onClick={closeMobileMenu}>
              <a
                href="/"
                className="md:px-4 md:pt-20
                md:pb-10
              text-black
               hover:bg-blue-500"
              >
                GALLERY
              </a>
            </div>

            <div className="option" onClick={closeMobileMenu}>
              <a
                href="/"
                className="md:px-4 md:pt-20
                md:pb-10
              text-black
               hover:bg-blue-500"
              >
                CONTACTS
              </a>
            </div>


          </div>
        </div>
      </div>
      <div className="mobile-menu" onClick={handleClick}>
        {click ? (
          <CloseMenu className="menu-icon" />
        ) : (
          <MenuIcon className="menu-icon" />
        )}
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

      <div className="dragon">
        {/* btn1 */}
        <div className="cho9 btn-danger" style={{ borderRadius: "1em" }}>
          <span className="ripple27">773 472-2391 </span>
        </div>
        {/* btn2 */}
        <div className="cho btn-danger " style={{ borderRadius: "1em" }}>
          <span className="ripple27" onClick={() => setButtonPopup1(true)}> Submit order</span>

        </div>
        {/* btn3 */}


        <div className="cho btn-success " style={{ borderRadius: "1em" }}>
          <span className="ripple27" onClick={() => setButtonPopup(true)}>Login</span>
        </div>
        {/* btn4 */}
        <div className="cho btn-success " style={{ borderRadius: "1em" }}>
          <span className="ripple27" onClick={() => setButtonPopup(true)}> SignUp</span>

        </div>


      </div>


    </div>
  );
};

export default Header;
