import { collection, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";
// import Card from '../../Components/Cardfirst/Card'
import Navbar from "../../Components/Navbar1/Navbar";
import { db } from "../../fbconfig";
import GridContainer from "../../Components/Grid/GridContainer.js";
import GridItem from "../../Components/Grid/GridItem.js";
import { Col, Row } from "react-bootstrap";
import { Card, CardMedia, makeStyles } from "@material-ui/core";
import "../Services/vendor.css";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: 120,
  },
  media: {
    maxWidth: 350,
    minHeight: 250,
  },
}));

export const Vendors = () => {
  const classes = useStyles();
  const [vendors, setVendors] = useState([]);
  const categoriesCollectionRef = collection(db, "Venders");
  const getVendors = async () => {
    const data = await getDocs(categoriesCollectionRef);
    //console.log(data);
    setVendors(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const [isSubscribed, setSubscribed] = useState(true);
  useEffect(() => {
    getVendors();
    return () => {
      setSubscribed(false);
    };
  }, []);
  console.log(vendors);
  return (
    <div>
      <Navbar />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      {/* <Row >
           <Col className="m-4">
                <GridContainer>
                {
          categories.map(category => {
            return <GridItem
              xs={12} sm={12} md={12} lg={12}
            >
              <Card><CardMedia
            className={classes.media} 
            image={
              category.img
            }
            
            title={"Image"}
          />
          <button
                type="button"
                className="btn btn-danger  m-4 "
                >
                {category.name}
              </button></Card>
          
          <br></br>
            </GridItem>
          })
        }
            </GridContainer>
      </Col>
      </Row> */}
      <div className="booking_product_main">
      
       
        <div className="row">
          <div className="col-12">
            {/* is sub-type loaded or not */}
            <h2>
              Vendor
            </h2>
            <div className="row">
              {(
                vendors.length ? (
                  vendors.map((mSubType) => (
                    <div key={mSubType.id} className="col-md-4">
                      
                      <div className="booking_product_inr">
                        <div className="row align-items-center">
                          <div className="col-sm-6">
                            <img
                              className="img-fluid"
                              style={{
                                maxHeight: "100px",
                              }}
                              src={
                                mSubType && mSubType.img
                                  ? mSubType.img
                                  : mSubType.img
                              }
                              alt=""
                            />
                          </div>
                          <div className="col-sm-6 product_content pl-0">
                            <h4>
                              {/* <span>
                                <i
                                  className="fa fa-star"
                                  aria-hidden="true"
                                ></i>{" "}
                                {mSubType && mSubType.rating
                                  ? mSubType.rating
                                  : "4.2"}
                              </span>{" "} */}
                              {mSubType && mSubType.number_of_ratings
                                ? `${mSubType.number_of_ratings} ratings`
                                : "23k ratings"}
                            </h4>
                            <div className="booking_price d-flex justify-content-between align-items-center">
                              
                              <button
                                type="button"
                                className="btn btn-primary"
                                // data-toggle="modal"
                                // data-target="#exampleModa2"
                                onClick={async () => {
                                  // await addItemToCart(mSubType);
                                  // handleOpenSubTypesModal();
                                }}
                              >
                                {/* {loadingCart ? (
                                  <div className="spinner-border"></div>
                                ) : (
                                  "ADD+"
                                )} */}
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 booking_split">
                            <button className="btn">
                              {mSubType && mSubType.name
                                ? mSubType.name
                                : "Name of SubType"}
                            </button>
                            <ul>
                              <li>
                                {mSubType && mSubType.description
                                  ? mSubType.description
                                  : "Description of SubType"}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <span className="p-5">
                    No Vendors found for this Service
                  </span>
                )
              ) }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
