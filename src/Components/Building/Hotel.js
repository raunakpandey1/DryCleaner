import react from 'react';
import './Hotel.css';
import Footer from "../Footer/Footer.jsx";
import Navbar from "../Navbar1/Navbar";
import Search1 from "../Search1/Search1";
import hotImg from './hotel.jpg'
import ContactUs from '../ContactUs/ContactUs';
const Hotel = () => {
    return(
       <div>
       <Navbar  style={{marginBottom: "300vw"}}/>
        <section className="development-cards">
     <div class="section-containerrr">
         <div class="columnsss contenttt ">
            <div class="content-containerrr">
               <h5>Hotel Dry Cleaning Services</h5>
               
               <p><h6>You expect the best and deserve none the less</h6>
               When on a business or pleasure trip, many travelers realize they have either packed too many clothes or too few. When you've not packed enough apparel to last for the duration of your stay, you can always take advantage of the hotel laundry service. Even if you've never used a hotel laundry service before, after you've done it once, you'll be an old pro. You can head off to a meeting or a day of sightseeing and enjoy clean, fresh laundry when you return to your room.
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
			<strong><img src={hotImg } style={{width:"80%"}} /></strong>
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
export default Hotel;