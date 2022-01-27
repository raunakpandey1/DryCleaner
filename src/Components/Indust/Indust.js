import react from 'react';
import './Indust.css';
import { Col, Row } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
const Indust = () => {
  const navigate = useNavigate()
    return(
      <div>
        <Col className='jod' >

        <h2 className='h11'> <b>Industries we serve</b></h2>
        <p className='h12'>We serve the entire Residential &amp; Commercial needs in Chicago. Our advanced B2B <br /> management team helps Businesses to grow Fast , Easy &amp; in an affordable manner.</p>

        </Col> 
        <div className="contai">
      
        <div className="box">
          <div className="contt">
            <h3>Residential</h3>
            <p>We use Lagoon advance care for dry-clean-only tags. Fast, easy and green Cleaning Solutions for professional textile care.
            <a onClick={()=>{
              navigate('/Residential')
            }}>Read More</a>
            </p>
            
          </div>
        </div>
        <div className="box1">
          <div className="contt">
            <h3>Commercial</h3>
            <p>From an owner-operated hair salon to a government hospital and everything in between, we are the most responsive and ...
            <a onClick={()=>{
              navigate('/Commercial')
            }}>Read More</a>
            </p>
            
          </div>
        </div>
        <div className="box2">
          <div className="contt">
            <h3>Hotel</h3>
            <p>We pickup your laundry, sort them, treal all the stains, wash, dry, iron and deliver back to you in one neat easy package.
            <a onClick={()=>{
              navigate('/Hotel')
            }}>Read More</a>
            </p>
            
          </div>
        </div>
      </div>
      </div>
      
    
    );
}
export default Indust;