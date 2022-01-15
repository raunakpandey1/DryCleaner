import react from 'react';
import "./Account.css";
const Account = () => {
    return(
        <>
        <div className="account">
            {/* <div className="account-content"> */}
                <div className="left">
                    <h3>Account</h3>
                    <a>Order Details</a>
                    <a>Change Password</a>
                    <a>Update Profile</a>
                    <a>Order Details</a>
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
        </>
    );
}
export default Account;