import React, {useState, useEffect} from "react";
import Navbar from "../Components/Navbar/Navbar";
import Navbar1 from "../Components/Navbar1/Navbar";
import Navbar2 from "../Components/Navbar2/Navbar2";
import AfterNavbar from "../Components/AfterNavbar/AfterNavbar";
import Footer from "../Components/Footer/Footer";
import Card from "../Components/Cardfirst/Card";
import Featured from "../Components/Featured/Featured";
import Affordable from "../Components/Affordable/Affordable";
import Search from "../Components/Search/Search";
import Eco from "../Components/Eco/Eco";
import Industry from "../Components/Industry/Industry";
import Indust from "../Components/Indust/Indust";
import Dry from "../Components/Dry/Dry";
import Button from '../Components/Button/Button';
import Book from '../Components/Book/Book';
import Work from '../Components/Work/Work';
// import Popup from '../Components/Popup/Popup';
import { useNavigate ,Navigate} from "react-router-dom";
import Reviews from "../Components/Reviews/Reviews";
import Search1 from "../Components/Search1/Search1.js";
import Screenshots from "../Components/screenshots-component/Screenshots";
import Popup1 from '../Components/Popup1/Popup1';
import PopupImg from '../Components/Popup1/pop1.png';
const Home = () => {
  const [buttonPopup, setButtonPopup] = useState (false);
  const [timedPopup, setTimedPopup] = useState (false);

  const navigate = useNavigate();
  

  useEffect (() => {
    setTimeout (() => {
      setTimedPopup (true);
    }, 5000);
  }, []);


  const hasToken = (token) => {
    if (token) {
      return true
    }
  }
  // const { from } = { from: { pathname: '/signin' }};
  // if (!hasToken(JSON.parse(localStorage.getItem('authenticated')))) {
  //   return (
  //     <Navigate to={from} />
  //   )
  // }
   
  return (

    <div style={{overflowX:"hidden", overflowY:"hidden"}}>

      {/* <Navbar /> */}
   
      <Navbar1 style={{marginBottom: "300vw"}} />
     
      {/* <Navbar2 /> */}
      <AfterNavbar />
      <Card /> 
      {/* <Popup trigger={timedPopup} setTrigger={setTimedPopup}>
      <div className="popWrap"><div className="popItem pop1"><img src="https://source.unsplash.com/100x100/?nature,water" alt="popup_img" /></div>
        <div className="popItem"><h3>Use code "FIRST10"</h3>
        <p>
          Download our mobile app - Chicago Dry Cleaner and avail flat 10% discount on your next order.
        </p></div></div>
       
      </Popup> */}

    <Popup1 trigger={timedPopup} setTrigger={setTimedPopup}>
      <div className="popWrap1"><div className="popItem1 pop11"><img className="popImg222" src={PopupImg} alt="popup_img" /></div>
         </div>
    
      </Popup1>  
      {/* <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <Checkout />
      </Popup> */}
      <br></br><br></br>
      <Work/>
      <br></br>
      <br></br>
      {/* <Industry/> */}
      <Indust />
      <Eco/>
      <Featured />
      <Dry/>
      <Book/>
      <Affordable />
      <Screenshots referComponent/>
      {/* <Button /> */}
      <Reviews />
      {/* <Search /> */}
      <Search1 />
      <Footer />
      
    </div>
  );
};
export default Home;