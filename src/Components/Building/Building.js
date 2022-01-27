import react from "react";
import ContactUs from "../ContactUs/ContactUs.jsx";
import Footer from "../Footer/Footer.jsx";
import Navbar from "../Navbar1/Navbar";
import Search1 from "../Search1/Search1";
import "./Building.css";
import residential from "./resdential.jpg";
const Building = () => {
  return (
    <div>

   <Navbar  style={{marginBottom: "300vw"}}/>
      <section className="development-cards">
        <div class="section-containerrr">
          <div class="columnsss contenttt ">
            <div class="content-containerrr">
              <h5>Residential Dry Cleaning Services</h5>

              <p>
                <h6>You expect the best and deserve none the less</h6>
                We collect and clean your garments to the garment care labels.
                Delivered back on hangers ready to wear or put away. We
                typically deliver back within 48 hours.
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
                  <strong>
                    <img src={residential} style={{ width: "80%" }} />
                  </strong>
                </div>
              </div>
            </div>
            {/* end */}
            {/* <img src="/residential.jpg"style={{width:"90%"}} /> */}
            &nbsp;
          </div>
        </div>

        <div></div>
      </section>
      <ContactUs />
      <Search1 />
      
      <Footer />
    </div>
  );
};
export default Building;
