import productData from 'data/product/product';
import { CartContext } from 'pages/_app';
import { useContext,useState,useEffect } from 'react';
import { Card } from './Card/Card';
import axios from 'axios';

export const CheckoutOrders = () => {
  const { cart, setCart } = useContext(CartContext);
    const [total, setTotal] = useState(0);

    // Check if we are in the browser environment before accessing localStorage
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      console.log("storinga", token);
    }
  
    const [carts, setCarts] = useState({});
  
    useEffect(() => {
      // Check if we are in the browser environment before accessing localStorage
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        console.log("storinga", token);

        if (token) {
          axios
            .get("https://sreevidhya.co.in/file/wp-json/cocart/v2/cart/items", {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            })
            .then((res) => {
              if (res.data && Object.keys(res.data).length > 0) {
                setCarts(res.data);
                setCart(res.data);
        
                // Extract product IDs from the response
                const productIds = Object.values(res.data).map(item => item.id);
                const productQuantity = Object.values(res.data).map(item => item.quantity?.value);
                // Store the product IDs in local storage
                localStorage.setItem('productIds', productIds);
                localStorage.setItem('productQuantity',productQuantity);
                let calculatedTotal = 0;
                for (const key in res.data) {
                  if (res.data.hasOwnProperty(key)) {
                    calculatedTotal += parseFloat(res.data[key]?.totals?.total || 0);
                  }
                }
                setTotal(calculatedTotal);
              } else {
                console.log("Product data is empty or null");
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          console.log("Token not found in localStorage.");
        }


      }
    }, [setCarts, setCart]);
  
 
  

  // // Calculate the total amount
  // const calculateTotal = () => {
  //   let calculatedTotal = 0;
  //   for (const key in cart) {
  //     if (cart.hasOwnProperty(key)) {
  //       calculatedTotal += parseFloat(cart[key].totals.total);
  //     }
  //   }
  //   return calculatedTotal;
  // };

  // // Update the total whenever the cart changes
  // useEffect(() => {
  //   const calculatedTotal = calculateTotal();
  //   setTotal(calculatedTotal);
  // }, [cart]);


  // const total = cart.reduce(
  //   (total, item) => total + Number(item.price) * Number(item.quantity),
  //   0
  // );
  console.log("parshing", cart)
  console.log("sharingTotals",total)
  return (
    <>
      <div className='checkout-order'>
        <h5>Your Order</h5>
        {/* {cart.map((order) => (
          <Card key={order.id} order={order} />
        ))} */}
        {typeof carts === 'object' && carts !== null && Object.keys(carts).map((value, index) => {

          const order = carts[value]

          console.log("pasingOrder",order)
                    
          return (
            <Card key={order.id} order={order} />
          )
        })}

      </div>
      <div className='cart-bottom__total'>
        <div className='cart-bottom__total-goods'>
          Goods on
          <span>${total.toFixed(2)}</span>
        </div>
        <div className='cart-bottom__total-promo'>
          Discount on promo code
          <span>No</span>
        </div>
        <div className='cart-bottom__total-delivery'>
          Delivery{' '}
          <span className='cart-bottom__total-delivery-date'>
            (Aug 28,2020 at 11:30)
          </span>
          <span>shipping amount here</span> 
        </div>
        <div className='cart-bottom__total-num'>
          total:
          <span>${(total ).toFixed(2)}</span>
        </div>
      </div>
    </>
  );
};
