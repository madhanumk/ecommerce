// import orderData from 'data/orders/orders';
import { useState,useEffect } from 'react';
import { Card } from './Card/Card';
import axios from"axios";

export const ProfileOrders = () => {
  const [active, setActive] = useState(-1);
  // const orders = [...orderData];



  const [orders, setOrders] = useState([]);

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('user_id');
    console.log("storinga", token);
  }

  useEffect(() => {

    // const consumerKey = "ck_d72694c3d2fececf68fc8445c5f1e08f1e0e6595";
    // const consumerSecret = "cs_bb077412971bcedc81c0e63c3cee50f3bea9a6b8";

    // const id = 1;

    
      const id = localStorage.getItem('user_id');


    axios
    .get(
      `https://sreevidhya.co.in/file/wp-json/wc/v3/orders?customer=${id}&consumer_key=ck_fa6b1f1532dce191024eb5aff1497f6fb4626d77&consumer_secret=cs_e49693a9c9a685724184e80a3243120badf38ad3`
    )
      .then((res) => {
        setOrders(res.data);
      })
      .catch((error) => {
        console.log("error", error)
      });
  }, []);

  console.log("orders", orders)




  const handleCollapse = (indx) => {
    if (active === indx) {
      setActive(-1);
    } else {
      setActive(indx);
    }
  };
  return (
    <>
      <div className='profile-orders'>
        <div className='profile-orders__row profile-orders__row-head'>
          <div className='profile-orders__col'>date</div>
          <div className='profile-orders__col'>Delivery address</div>
          <div className='profile-orders__col'>amount</div>
          <div className='profile-orders__col'>Status</div>
        </div>
        {orders.map((order, index) => (
          <Card
            key={index}
            index={index}
            onCollapse={handleCollapse}
            order={order}
            active={active}
          />
        ))}
      </div>
    </>
  );
};
