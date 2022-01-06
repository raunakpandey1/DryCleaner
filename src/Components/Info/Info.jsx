import React,{useState} from 'react'
import "./info.scss"
import Popup from '../Popup/Popup'
import Checkout from '../Checkout/Checkout'

const Info = () => {
    const [buttonPopup, setButtonPopup] = useState (false);
    return (
        <div className="dj">


            <div className="major">
                <h2>Personal Information</h2>

                <form className='ex'>

                    <label >Phone Number</label><br />
                    <input type="text" id="fname" name="fname" /><br />
                    <label>Alternate  Number </label><br />
                    <input type="text" id="fname" name="fname" /><br />
                    <label > Card Holder Name</label><br />
                    <input type="text" id="fname" name="fname" /><br />
                    <label > Card Number </label><br />
                    <input type="text" id="fname" name="fname" /><br />
                    <label > Expiry </label><br />
                    <input type="text" id="fname" name="fname" /><br />
                    <label > CVV </label><br />
                    <input type="text" id="fname" name="fname" /><br />
                    <div className='btn btn-success' onClick={() => setButtonPopup(true)}>Submit</div>
                </form>




            </div>
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <Checkout />
      </Popup>
        </div>

    )
}

export default Info
