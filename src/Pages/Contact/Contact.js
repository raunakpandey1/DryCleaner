import react from 'react';
import './Contact.css';
const Contact = () => {
    return(
        <>
        <div className="blueline">
            <p>Our Dry Clean Locations in Chicago</p>
        </div>
        <div className="contact-page">
        
        <div className="conta-body">
        <div class="container">
        <div class="text">Contact Form</div>
        <div class="tea">Let' have a cup of tea</div>
        <form action="#">
           <div class="form-row">
              <div class="input-data">
                 <input type="text" required/>
                 <div class="underline"></div>
                 <label for="">First Name</label>
              </div>
              <div class="input-data">
                 <input type="text" required/>
                 <div class="underline"></div>
                 <label for="">Last Name</label>
              </div>
           </div>
           <div class="form-row">
              <div class="input-data">
                 <input type="text" required/>
                 <div class="underline"></div>
                 <label for="">Email Address</label>
              </div>
              <div class="input-data">
                 <input type="text" required/>
                 <div class="underline"></div>
                 <label for="">Website Name</label>
              </div>
           </div>
           <div class="form-row">
              <div class="input-data textarea">
                 <textarea rows="8" cols="80" required></textarea>
                 <br />
                 <div class="underline"></div>
                 <label for="">Write your message</label>
                 <br />
                 <div class="form-row submit-btn">
                    <div class="input-data">
                       <div class="inner"></div>
                       <input type="submit" value="submit"/>
                    </div>
                 </div>
              </div>
           </div>
        </form>
     </div>
     </div>
     <div className="right">
         <h2>Quick Content</h2>
         <h3>Phone Number</h3>
         <a href="tel:312-505-9138">312-505-9138 </a><a href="tel:773472-2391">/ 773 472-2391</a>
         <h3>E-Mail Address</h3>
         <a href="mailto:azim@chicagogreendrycleaners.com">azim@chicagogreendrycleaners.com</a>
         <h3>Our Address</h3>
         <a>3545 W Irving Park Rd, Chicago, IL 60618, United States</a>

     </div>
     </div>
    </>
    );
}
export default Contact;