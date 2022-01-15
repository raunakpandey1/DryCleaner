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
import Dry from "../Components/Dry/Dry";
import Button from '../Components/Button/Button';
import Book from '../Components/Book/Book';
import Work from '../Components/Work/Work';
import Popup from '../Components/Popup/Popup';
import { useNavigate ,Navigate} from "react-router-dom";



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
        <h3>Use code "FIRST10"</h3>
        <p>
          Download our mobile app - Chicago Dry Cleaner and avail flat 10% discount on your next order.
        </p>
      </Popup> */}

      {/* <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <Checkout />
      </Popup> */}
      <Work/>
      <Industry/>
      <Eco/>
      <Featured />
      
      <Book/>
      {/* <Affordable /> */}
      <Button />
      
      <Search />
      <Dry/>
      <Footer />
      
    </div>
  );
};
export default Home;