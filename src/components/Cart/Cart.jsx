import { Card } from './Card/Card';
import socialData from 'data/social';
import { CartContext } from 'pages/_app';
import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import axios from "axios"

export const Cart = () => {
  const { cart, setCart } = useContext(CartContext);
  const [count, setCount] = useState(0);
  const socialLinks = [...socialData];
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

  console.log("testingcart", carts);
  console.log("context", cart);

  const handleProductQuantity = (id, change) => {
    const updatedCarts = { ...carts };
    const item = updatedCarts[id];

    if (change === "increment") {
      item += 1;
    } else if (change === "decrement" && item > 1) {
      item -= 1;
    }

    setCarts(updatedCarts);
  };

  console.log("carts", carts)

  return (
    <>
      {/* <!-- BEGIN CART --> */}
      <div className='cart'>
        <div className='wrapper'>
          <div className='cart-table'>
            <div className='cart-table__box'>
              <div className='cart-table__row cart-table__row-head'>
                <div className='cart-table__col'>Product</div>
                <div className='cart-table__col'>Price</div>
                <div className='cart-table__col'>Quantity</div>
                <div className='cart-table__col'>Total</div>
              </div>

              {
                typeof carts === 'object' && carts !== null && Object.keys(carts).map((value, index) => {
                  const cart = carts[value];
                  console.log("cartcartcart", cart)
                  return (
                    <Card
                      onChangeQuantity={(id, change) =>
                        handleProductQuantity(cart.id, change)
                      }
                      key={cart.id}
                      cart={cart}
                    />
                  );
                })
              }
            </div>
          </div>
          <div className='cart-bottom'>
            <div className='cart-bottom__promo'>
              <form className='cart-bottom__promo-form'>
                <div className='box-field__row'>
                  <div className='box-field'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Enter promo code'
                    />
                  </div>
                  <button type='submit' className='btn btn-grey'>
                    apply code
                  </button>
                </div>
              </form>
              <h6>How to get a promo code?</h6>
              <p>
                Follow our news on the website, as well as subscribe to our
                social networks. So you will not only be able to receive
                up-to-date codes, but also learn about new products and
                promotional items.
              </p>
              <div className='contacts-info__social'>
                <span>Find us here:</span>
                <ul>
                  {socialLinks.map((social, index) => (
                    <li key={index}>
                      <a href={social.path} target='_blank'>
                        <i className={social.icon}></i>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className='cart-bottom__total'>
              <div className='cart-bottom__total-goods'>
                Goods on
                <span>${total}</span>
              </div>
              <div className='cart-bottom__total-promo'>
                Discount on promo code
                <span>No</span>
              </div>
              <div className='cart-bottom__total-num'>
                total:
                <span>${total}</span>
              </div>
              <Link href='/checkout'>
                <a className='btn'>Checkout</a>
              </Link>
            </div>
          </div>
        </div>
        <img
          className='promo-video__decor js-img'
          src='assets/img/promo-video__decor.jpg'
          alt=''
        />
      </div>
      {/* <!-- CART EOF   --> */}
    </>
  );
};
