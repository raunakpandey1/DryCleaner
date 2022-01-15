import { collection, getDocs } from 'firebase/firestore';
import React, { useState ,useEffect } from 'react'
// import Card from '../../Components/Cardfirst/Card'
import Navbar from '../../Components/Navbar1/Navbar'
import { db } from '../../fbconfig';
import GridContainer from '../../Components/Grid/GridContainer.js'
import GridItem from '../../Components/Grid/GridItem.js'
import { Col, Row } from 'react-bootstrap';
import './services.css' 
import {
    Card,
    CardMedia,
    makeStyles,
  } from "@material-ui/core";
import { NavLink } from 'react-router-dom';
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

export const Services = () => {
    const classes = useStyles();
    const [categories, setCategories]=useState([]);
    const categoriesCollectionRef = collection(db,"categories")
    const getCategories= async()=>{
        const data = await getDocs(categoriesCollectionRef);
        //console.log(data);
        setCategories(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
      };

      const [isSubscribed, setSubscribed] = useState(true); 
        useEffect(() => {
            getCategories()
        
            // const unsubscribe = onSnapshot(collection(db, "coupons",match.params.id), (snapshot) => {
            //   // Respond to data
            //   // ...
            //   if(snapshot.docChanges().length > 0){
            //     getCoupons()
            //   }
            // });
            return () => { setSubscribed(false); }
        
        }, [])
        console.log(categories)
    return (
        <div>
            <Navbar />
            <br></br><br></br><br></br><br></br>
           <Row >
           <Col className="m-4">
                <GridContainer>
                {
                    categories.map(category => {
                        return <GridItem
                        xs={12} sm={12} md={4} lg={4}
                        >
                        <Card><CardMedia
                        className={classes.media}
                        image={
                        category.img
                        }
                        
                        title={"Image"}
                    />
                    <br></br>
                    <div className='catBody'>
                        <div className='catTitle'><h4><b>{category.name}</b></h4></div>
                    
                    <div className='catTitle'>
                    <button
                            type="button"
                            className="btn btn-success  m-4 "
                            ><NavLink style={{color: 'white', textDecoration: 'none'}} to={`/services/vendors`}>All Vendors</NavLink>
                            {/* {category.name} */}
                        </button>
                    </div>
                    </div>
                    </Card>
                     
                        </GridItem>
                    })
                    }
            </GridContainer>
      </Col>
      </Row>
        </div>
    )
}
