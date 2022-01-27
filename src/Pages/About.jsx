import React ,{useState, useEffect} from 'react';
import Navbar1 from '../Components/Navbar1/Navbar';
import Footer from '../Components/Footer/Footer';
import Search1 from '../Components/Search1/Search1.js';
import Why from '../Components/Why/Why';
import AboutIndustry from '../Components/AboutIndustry/AboutIndustry';
import AfterWhy from '../Components/AfterWhy/AfterWhy';
import Choose from '../Components/Choose/Choose';
import AboutDes from '../Components/AboutDes/AboutDes';
import Count from '../Components/Count/Count';
import Indust from '../Components/Indust/Indust';





const About = () => {
 
 
  return (
    <div style={{overflowX:"hidden", overflowY:"hidden"}}>
      <Navbar1 />
      <AboutDes />
      <Why />
      <AfterWhy />
      <Indust />
      {/* <AboutIndustry /> */}
      <Choose />

     

      <Count />
      {/* <Search /> */}
      <Search1 />
      <Footer />
    </div>
  );
};
export default About;
