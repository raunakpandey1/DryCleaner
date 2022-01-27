import React from 'react';
import './popup1.scss'
const Popup1 = (props) => {
  return (props.trigger)?(
    <div className="popup1">
      <div className="popup-inner1">
        <button className="close-btn close" aria-label="Close" onClick={() => props.setTrigger(false)}>  <span aria-hidden="true">&times;</span></button>
        <button className="okayBtn" aria-label="Close" onClick={() => props.setTrigger(false)}>  <span aria-hidden="true">Okay</span></button>
        {props.children}
      </div>
    </div>
  ):"";
}

export default Popup1
