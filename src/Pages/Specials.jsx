import React from "react";
import Navbar1 from "../Components/Navbar1/Navbar";
import Footer from "../Components/Footer/Footer";
import Search from "../Components/Search1/Search1.js";
import SpecialDes from "../Components/SpecialDes/SpecialDes";
import SpecialCheck from "../Components/SpecialCheck/SpecialCheck";
import SpecialFeatures from "../Components/SpecialFeatures/SpecialFeatures";


const Specials = () => {


    return (

        <div style={{ overflowX: "hidden" , overflowY:"hidden" }}>



            <Navbar1 style={{ marginBottom: "30vw" }} />
            <SpecialDes />
            <SpecialFeatures />
            <SpecialCheck />
            <Search />
            <Footer />

        </div>
    );
};
export default Specials;