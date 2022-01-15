import React  from "react";
import Navbar1 from "../Components/Navbar1/Navbar";
import Footer from "../Components/Footer/Footer";
import Search from "../Components/Search/Search";
import Clothes from "../Components/Clothes/Clothes";
import PricingDes from "../Components/PricingDes/PricingDes";
import PricingAlter from "../Components/PricingAlterations/Alter";
import Payment from "../Components/PricingPayment/Payment";
import Table from "../Components/PricingTable/Table";


const Pricing = () => {


    return (

        <div style={{ overflowX: "hidden" , overflowY:"hidden" }}>



            <Navbar1 style={{ marginBottom: "30vw" }} />
            <PricingDes />
            <Table />
            <Clothes />
            <PricingAlter />
            <Payment />
            <Search />
            <Footer />

        </div>
    );
};
export default Pricing;