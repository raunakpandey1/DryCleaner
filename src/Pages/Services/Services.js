import { collection, getDocs } from 'firebase/firestore';
import React, { useState ,useEffect } from 'react'
import Card from '../../Components/Cardfirst/Card'
import Navbar from '../../Components/Navbar1/Navbar'
import { db } from '../../fbconfig';
import GridContainer from '../../Components/Grid/GridContainer.js'
import GridItem from '../../Components/Grid/GridItem.js'
import { Col, Row } from 'react-bootstrap';
export const Services = () => {

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
            {/* {
            categories && categories.length>0 ? categories.map((item, key) => {
                                        return <><Card value={item} key={key} /></>
                                    }) : "No Product Found"
           } */}
           <Row >
           <Col className="mb-4">
                <GridContainer>
                {
                    categories.map((item, key) => {
                    return <GridItem
                    xs={12} sm={12} md={6} lg={6}
                    >
                    <Card value={item} key={key} />
                    </GridItem>
                })
                }
            </GridContainer>
      </Col>
      </Row>
        </div>
    )
}
