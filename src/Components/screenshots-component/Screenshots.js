import React, { useContext, useState } from "react";
import { Col,  Row } from "react-bootstrap";
import PlayStoreIcon from './play-store.png';
import AppStoreIcon from './booknow_appstore.png';
import "./screenshots.css";
 
const Screenshots = ({ referComponent }) => {
   

  return (
    <div className="ss-parent">
      <Row>
        <Col md={6}>
        <div className="ss-heading">
            {referComponent
              ? "Refer and get free services"
              : "Professionals just a click away!"}
          </div>
          <div className="ss-sub-heading">
            {!referComponent && "Step towards comfort with us."}
          </div>
          <div className="ss-sub-text">
            {referComponent
              ? "Invite your friends to Chicago Green Cleaners. They get Rs. 100 off. You win upto Rs. 5000"
              : "Sign in through our app and avail all special offers with a 30 day quality assurance."}
          </div>

         
        </Col>
         <Col md={3}>
         <div
            className="store-icons"
            style={{ margin: "20px auto" }}
            onClick={() =>
              window.open(
                "https://www.google.com/",
                "_blank"
              )
            }
          >
            <img
              width="180em"
              src={PlayStoreIcon}
              alt="play_store_icon"
              style={{ marginRight: "10px", cursor: "pointer" }}
            />
          </div>
          
        

         </Col>
         <Col md={3}>  <div
            className="store-icons"
            style={{ margin: "20px auto" }}
            onClick={() =>
              window.open(
                "https://www.google.com/",
                "_blank"
              )
            }
          >
            <img
              width="190em"
              height="60em"
              className="appImg"
              src={AppStoreIcon}
              alt="play_store_icon"
              style={{ marginRight: "10px", cursor: "pointer" }}
            />
          </div></Col>
      </Row>
    </div>
  );
};

export default Screenshots;
