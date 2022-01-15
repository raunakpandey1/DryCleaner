import { collection, collectionGroup, getDocs, query, where } from "firebase/firestore";
import React, { useState, useEffect } from "react";
// import Card from '../../Components/Cardfirst/Card'
import Navbar from "../../Components/Navbar1/Navbar";
import { db } from "../../fbconfig";
import GridContainer from "../../Components/Grid/GridContainer.js";
import GridItem from "../../Components/Grid/GridItem.js";
import { Col, Row } from "react-bootstrap";
import { Card, CardMedia, makeStyles } from "@material-ui/core";
import "./vendor.css";
import { NavLink, useParams } from 'react-router-dom';
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(0),
      minWidth: 120,
    },
    media: {
      // height: 240,
      minHeight:200,
      
    },
  }));
   
export const Vendors = () => {
  // const { id } = useParams();
  const classes = useStyles();
  const [vendors, setVendors] = useState([]);
  // const categoriesCollectionRef = collection(db, "Venders");
  // const getVendors = async () => {
  //   const data = await getDocs(categoriesCollectionRef);
  //   //console.log(data);
  //   setVendors(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  // };
  const getVendor = async () => {
    // let vender =[];
    const vend = collection(db, 'Venders');
    const querySnapshot = await getDocs(vend);
      
  //    querySnapshot.forEach((doc) => {
  //      console.log(doc.data())
  //     vender.push(doc.data())
  // });
  setVendors(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  // return vender
  };
  
  const [isSubscribed, setSubscribed] = useState(true);
  useEffect(() => {
    getVendor()
    return () => {
      setSubscribed(false);
    };
  }, []);
  // console.log(vendors);
  return (
    <div>
      <Navbar />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="servicebody">
      <Row >
           <Col className="m-4">
                <GridContainer>
                {
                  vendors.length ?
                    vendors.map(vendor => {
                        return <GridItem
                        xs={12} sm={12} md={4} lg={4}
                        >
                        <Card><CardMedia
                        className={classes.media}
                        image={
                        vendor.img
                        }
                        
                        title={"Image"}
                    />
                    <br></br>
                    <div className='venBody'>
                        <div className='catTitle'><h4><b>{vendor.name}</b></h4>
                        
                        </div>
                         
                    <div className='venTitle'>
                    <button
                            type="button"
                            className="btn btn-danger  m-4 "
                            ><NavLink style={{color: 'white', textDecoration: 'none'}} to={`/vendors/${vendor.id}/Items`}>All Items</NavLink>
                            {/* {category.name} */}
                        </button>
                    </div>
                    </div>
                    </Card>
                     
                        </GridItem> 
                    })  :   <h1></h1>
                    }
            </GridContainer>
      </Col>
      </Row>
      </div>
    </div>
  );
};
