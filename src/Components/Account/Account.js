import react from 'react';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar1/Navbar';
import Search from '../Search/Search';
import "./Account.css";
const Account = () => {
    return(
        <div>
        <Navbar style={{ marginBottom: "300vw" }} />
        <div className="account">
            {/* <div className="account-content"> */}
                <div className="left">
                    <h3>Account</h3>
                    {/* <a>Order Details</a> */}
                    <a>Change Password</a>
                    <a>Update Profile</a>
                    <a>Logout</a>
                </div>
                <div className="Right">
                    <br/><br/><h2>Order Details</h2><br/>
                    <table>
                        <tr>
                            <th>Order No.</th>
                            <th>Delivery Zipcode</th>
                            <th>Coupon</th>
                            <th>Coupon Value</th>
                            <th>Total</th>
                            <th>Discount</th>
                            <th>Final Total</th>
                            <th>Order Date & Time</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </table>
                </div>
            {/* </div> */}
        </div>
        <Search />
      
      <Footer />
        </div>
    );
}
export default Account;