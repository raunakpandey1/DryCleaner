import React from 'react';
import './Modal.css';

export const Modal = ({ show, close }) => {
  return (
    
    <div className="modal-wrapper"
      style={{
        transform: show ? 'translateY(0vh)' : 'translateY(-100vh)',
        opacity: show ? '1' : '0'
      }}
    >
      {/* <div className="modal-header">
        <p>Welcome To Our Site</p>
        <span onClick={close} className="close-modal-btn">x</span>
      </div> */}
      <div className="modal-content">
      <div className="modal-header">
        <p>Welcome To Our Site</p>
        <span onClick={close} className="close-modal-btn">x</span>
      </div>
        <div className="modal-body">

        <form class="w3-container">
        
        <p>
        <label>Name</label><br/>
        <input class="w3-input" type="text" style={{width: "100%"}}/></p>
        <p>
        <label>Review</label>
        <input class="w3-input" type="text" style={{width: "100%"}}/></p>
        </form>
          {/* <h4>Modal</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus, placeat aliquam? Nostrum vero fugiat rem, itaque molestias ipsa quae facilis.</p> */}
        </div>
        <div className="modal-footer">
          <button className="btn-cancel">Submit</button>
        </div>
        {/* <div className="modal-footer">
          <button onClick={close} className="btn-cancel">Close</button>
        </div> */}
      </div>
    </div>
  )
};