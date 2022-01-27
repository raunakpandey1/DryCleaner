import react from 'react';
import './Gallery.css'
import img1 from "./1.jpg"
import img2 from "./2.jpg"
import img3 from "./3.jpg"
import img4 from "./4.jpg"
import img5 from "./5.jpg"
import img6 from "./6.jpg"
import img7 from "./7.jpg"
import img8 from "./8.jpg"
import img9 from "./9.jpg"
import img10 from "./10.jpg"
import img11 from "./11.jpg"
import img12 from "./12.jpg"
import img13 from "./13.jpg"
import img14 from "./14.jpg"
import img15 from "./15.jpg"
import img16 from "./16.jpg"
import img17 from "./17.jpg"
import img18 from "./18.jpg"
import Navbar from '../Navbar1/Navbar';
import Search1 from '../Search1/Search1';
import Footer from '../Footer/Footer';
const Gallery = () => {
    return(
      <div>
      <Navbar  style={{marginBottom: "300vw"}}/>
      <div className="gallery-back">
      <h1>Gallery</h1>
      <p>Our recent work</p>
        <div className="main1">
        <img src={img1} width="370" height="300"/>
        <img src={img2} width="370" height="300"/>
        <img src={img3} width="370" height="300"/>
        <img src={img4} width="370" height="300"/>
        <img src={img5} width="370" height="300"/>
        <img src={img6} width="370" height="300"/>
        <img src={img7} width="370" height="300"/>
        <img src={img8} width="370" height="300"/>
        <img src={img9} width="370" height="300"/>
        <img src={img10} width="370" height="300"/>
        <img src={img11} width="370" height="300"/>
        <img src={img12} width="370" height="300"/>
        <img src={img13} width="370" height="300"/>
        <img src={img14} width="370" height="300"/>
        <img src={img15} width="370" height="300"/>
        <img src={img16} width="370" height="300"/>
        <img src={img17} width="370" height="300"/>
        <img src={img18} width="370" height="300"/>
        
        </div>
      </div>
 
      <Search1 />
      
      <Footer />
      </div>
    );
}
export default Gallery;