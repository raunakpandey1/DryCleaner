import React, {useState} from 'react'
import "./checkout.scss"
import Popup from '../Popup/Popup'
import Order from '../Order/Order'
const Checkout = () => {
    const [buttonPopup, setButtonPopup] = useState (false);
    return (
        
        <div className="major1">
            <h2>Checkout</h2>
            <form className='ex1'>

                <label className="label1" >Select time slot</label><br />
            </form>
            <div className="frt">

                <input type="radio" id="html" name="fav_language" value="HTML" />
                <label for="html">9:00 am - 5:00 pm</label><br />
                <input type="radio" id="css" name="fav_language" value="CSS" />
                <label for="css">5:00 pm - 10:00 pm</label><br />
               
            </div>

            <form className='ex1'>

                <label className="label2" >Add preferences</label><br />
            </form>

            <form className='ex1'>

                <label className="label1" >Starch you want</label><br />
            </form>

            <div className="frt">

<input type="radio" id="html" name="fav_language" value="HTML" />
<label for="html">Light</label><br />
<input type="radio" id="css" name="fav_language" value="CSS" />
<label for="css">Medium</label><br />
<input type="radio" id="css" name="fav_language" value="CSS" />
<label for="css">Heavy</label><br />

</div>

<form className='ex1'>

                <label className="label1" >How you want</label><br />

            </form>

            <div className="frt">

<input type="radio" id="html" name="fav_language" value="HTML" />
<label for="html">Folded</label><br />
<input type="radio" id="css" name="fav_language" value="CSS" />
<label for="css">5:00 pm - 10:00 pm</label><br />

<label className='ex27'> Additional Instruction </label><br />
<input className='ex9' type="text" id="fname" name="fname"/><br />
</div>
<div className='ex'>
<div className="garuda btn btn-success" onClick={() => setButtonPopup(true)}>Order Now</div>
</div>
<Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <Order />
      </Popup>


        </div>
    )
}

export default Checkout
