import react from 'react';
import MaterialTable from 'material-table';
import { FaSquareFull } from 'react-icons/fa';
export const Table = () => {
    const data=[
        {order:'1',zip:12, coupon:'ty6', couponvalue:5, total: 2, discount: '20%', finaltotal: 349, orderdatetime: '2/04/2021-9:30', status: 'pending', action: 'ok'},
        {order:'2',zip:12, coupon:'ty6', couponvalue:5, total: 2, discount: '20%', finaltotal: 349, orderdatetime: '2/04/2021-9:30', status: 'pending', action: 'ok'},
        {order:'3',zip:12, coupon:'ty6', couponvalue:5, total: 2, discount: '20%', finaltotal: 349, orderdatetime: '2/04/2021-9:30', status: 'pending', action: 'ok'},
        {order:'4',zip:12, coupon:'ty6', couponvalue:5, total: 2, discount: '20%', finaltotal: 349, orderdatetime: '2/04/2021-9:30', status: 'pending', action: 'ok'}

    ]
    const columns=[
        {
            title:'Order No.',field:'order'
        },
        {
            title:'Delivery Zipcode',field:'zip'
        },
        {
            title:'Coupan',field:'coupon'
        },
        {
            title:'Coupan Value',field:'couponvalue'
        },
        {
            title:'Total',field:'total'
        },
        {
            title:'Discount',field:'discount'
        },
        {
            title:'Final Total',field:'finaltotal'
        },
        {
            title:'Order Date & Time',field:'orderdatetime'
        },
        {
            title:'Status',field:'status'
        },
        {
            title:'Action',field:'action'
        },
        
    ]
    return(<div>
        <MaterialTable  title="Order Details"
        data={data}
        columns={columns}/>
        
    </div>)
}




