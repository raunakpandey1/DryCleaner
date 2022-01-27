import react from 'react';
import './Commercial.css';
import Footer from "../Footer/Footer.jsx";
import Navbar from "../Navbar1/Navbar";
import Search1 from "../Search1/Search1";
import commImg from './comercial.jpg'
import ContactUs from '../ContactUs/ContactUs';
const Commercial = () => {
    return(
       <div>
       <Navbar  style={{marginBottom: "300vw"}}/>
        <section className="development-cards">
     <div class="section-containerrr">
         <div class="columnsss contenttt ">
            <div class="content-containerrr">
               <h5>Commercial Dry Cleaning Services</h5>
               
               <p><h6>You expect the best and deserve none the less</h6>
               Commercial dry cleaning operations encompass neighborhood cleaners. Typically small franchise shops catering to household needs. These businesses utilize machines with about a 60 pound capacity. They can utilize transfer cleaning machinery or an all in one dry-to-dry machine. In the dry-to-dry machines washing, and drying are done within the same unit. After the cleansing cycle they are then removed for pressing and bagged for pick up by the customer.
               </p>
               {/* <a href="">View Project</a> */}
            </div>
         </div>
         <div class="colsss imggg">
             {/* start */}
             <div class="contaienr">
	<div class="tilt-box-wrap">
		<span class="t_over"></span>
		<span class="t_over"></span>
		<span class="t_over"></span>
		<span class="t_over"></span>
		<span class="t_over"></span>
		<span class="t_over"></span>
		<span class="t_over"></span>
		<span class="t_over"></span>
		<span class="t_over"></span>
		<div class="tilt-box">
			<strong><img src={ commImg } style={{width:"80%"}} /></strong>
		</div>
	</div>
</div>
             {/* end */}
             {/* <img src="/residential.jpg"style={{width:"90%"}} /> */}
            &nbsp;
         </div>
      </div>

     
      <div >
          
</div>

     </section>
     <ContactUs />
     <Search1 />
      
      <Footer />
     </div>
    );
}
export default Commercial;