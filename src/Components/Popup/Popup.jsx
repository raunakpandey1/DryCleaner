import React from 'react';
import './popup.scss'
const Popup = (props) => {
  return (props.trigger) ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn close" aria-label="Close" onClick={() => props.setTrigger(false)}>  <span aria-hidden="true">&times;</span></button>
        {props.children}
      </div>
    </div>
  ) : "";
}

export default Popup
