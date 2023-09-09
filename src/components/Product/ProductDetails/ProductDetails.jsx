// import productData from 'data/product/product';
import { useContext, useEffect, useState } from 'react';
import Slider from 'react-slick';
import socialData from 'data/social';
import { Reviews } from '../Reviews/Reviews';
import { ReviewFrom } from '../ReviewForm/ReviewFrom';
import { useRouter } from 'next/router';
import { CartContext } from 'pages/_app';
import axios from 'axios';

export const ProductDetails = () => {
  const router = useRouter();
  const { cart, setCart } = useContext(CartContext);

  const socialLinks = [...socialData];
  // const products = [...productData];
  const [product, setProduct] = useState(null);
  const [addedInCart, setAddedInCart] = useState(false);

  // const apiKey = "ck_d72694c3d2fececf68fc8445c5f1e08f1e0e6595"
  // const apiSecret = "cs_bb077412971bcedc81c0e63c3cee50f3bea9a6b8"

  useEffect(() => {
    axios.get(`https://sreevidhya.co.in/file/wp-json/cocart/v1/products?per_page=100`).then((res) => {
      const productId = parseInt(router.query.id); // Convert to integer
      const data = res.data.find((pd) => pd.id === productId);
      setProduct(data);
    })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [router.query.id]);



  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState(2);
  const [activeColor, setActiveColor] = useState(2);
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const [responseMessage, setResponseMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   // Initialize cart data from local storage when the component mounts
  //   const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
  //   setCart(storedCart);
  // }, []);

    // Check if we are in the browser environment before accessing localStorage
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      console.log("storinga", token);
    }

  const handleAddToCart = (id) => {
    const requestData = {
      id: id.toString(),
      quantity: "1", // Assuming quantity is a number, not a string
    };

    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (!token) {
        // Handle the case where localStorage is not available or 'token' is not set
        return;
      }
    }

    // const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3NyZWV2aWRoeWEuY28uaW4vZmlsZSIsImlhdCI6MTY5Mzg4NzYwNywibmJmIjoxNjkzODg3NjA3LCJleHAiOjE2OTQ0OTI0MDcsImRhdGEiOnsidXNlciI6eyJpZCI6IjIifX19.dQkOMmbJv0EjetfbJNqvNiHE9DLbn410uufpsU5e-44';

    setIsLoading(true);

    axios
  .post(
    'https://sreevidhya.co.in/file/wp-json/cocart/v2/cart/add-item',
    JSON.stringify(requestData),
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  )
      .then((response) => {
        console.log('Response:', response.data);
        setCart([...cart, response.data]);
        setResponseMessage('Item added to cart successfully.');

      })
      .catch((error) => {
        console.error('Error adding item to cart:', error);

        if (error.response && error.response.data) {
          console.error('Error response:', error.response.data);
        }

        setResponseMessage('Error adding item to cart.');
       
      });
  };



  if (!product) return <></>;
  return (
    <>
      {/* <!-- BEGIN PRODUCT --> */}
      <div className='product'>
        <div className='wrapper'>
          <div className='product-content'>
            {/* <!-- Product Main Slider --> */}
            <div className='product-slider'>
              <div className='product-slider__main'>
                <Slider
                  fade={true}
                  asNavFor={nav2}
                  arrows={false}
                  lazyLoad={true}
                  ref={(slider1) => setNav1(slider1)}

                >
                  {product.images.map((img, index) => (
                    <div key={index} className='product-slider__main-item'>
                      <div className='products-item__type'>
                        {product.isSale && (
                          <span className='products-item__sale'>sale</span>
                        )}
                        {product.isNew && (
                          <span className='products-item__new'>new</span>
                        )}
                      </div>
                      <img src={img?.src?.woocommerce_single} alt='product' />
                    </div>
                  ))}
                </Slider>
              </div>

              {/* <!-- Product Slide Nav --> */}
              <div className='product-slider__nav'>
                <Slider
                  arrows={false}
                  asNavFor={nav1}
                  ref={(slider2) => setNav2(slider2)}
                  slidesToShow={4}
                  swipeToSlide={true}
                  focusOnSelect={true}
                >
                  {product.images.map((img, index) => (
                    <div key={index} className='product-slider__nav-item'>
                      <img src={img?.src?.woocommerce_single} alt='product' />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
            <div className='product-info'>
              <h3>{product.name}</h3>
              {product.stock_status === "instock" ? (
                <span className='product-stock'>{product.stock_status}</span>
              ) : (
                <span className='product-stock' style={{ color: "red " }}>{product.stock_status}</span>
              )}

              <span className='product-num'>SKU: {product.sku}</span>
              {product.oldPrice ? (
                <span className='product-price'>
                  <span>${product.oldPrice}</span>${product.price}
                </span>
              ) : (
                <span className='product-price'>{product.price}</span>
              )}
              <p dangerouslySetInnerHTML={{ __html: product.description }}></p>

              {/* <!-- Social Share Link --> */}
              <div className='contacts-info__social'>
                <span>Find us here:</span>
                <ul>
                  {socialLinks.map((social, index) => (
                    <li key={index}>
                      <a href={social.path}>
                        <i className={social.icon ? social.icon : ''}></i>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* <!-- Product Color info--> */}
              <div className='product-options'>
                <div className='product-info__color'>
                  {/* <span>Color:</span>
                  <ul>
                    {product?.colors.map((color, index) => (
                      <li
                        onClick={() => setActiveColor(index)}
                        className={activeColor === index ? 'active' : ''}
                        key={index}
                        style={{ backgroundColor: color }}
                      ></li>
                    ))}
                  </ul> */}
                </div>

                {/* <!-- Order Item counter --> */}
                <div className='product-info__quantity'>
                  <span className='product-info__quantity-title'>
                    Quantity:
                  </span>
                  <div className='counter-box'>
                    <span
                      onClick={() => {
                        if (quantity > 1) {
                          setQuantity(quantity - 1);
                        } else {
                          setQuantity(quantity);
                        }
                      }}
                      className='counter-link counter-link__prev'
                    >
                      <i className='icon-arrow'></i>
                    </span>
                    <input
                      type='text'
                      className='counter-input'
                      disabled
                      value={quantity}
                    />
                    <span
                      onClick={() => {
                        if (cart.max_purchase >= quantity) {
                          setQuantity(quantity + 1);
                        } else {
                          // Optionally, you can display a message or take other actions to indicate that the increment is not allowed.
                          alert('Product is out of stock');
                        }
                      }}
                      className='counter-link counter-link__next'
                    >
                      <i className='icon-arrow'></i>
                    </span>
                  </div>
                </div>
              </div>
              <div className='product-buttons'>
                <button
                  // disabled={addedInCart}
                  onClick={() => handleAddToCart(product.id)}
                  className='btn btn-icon'
                >
                  <i className='icon-cart'></i> cart
                </button>
                <button className='btn btn-grey btn-icon'>
                  <i className='icon-heart'></i> wish
                </button>
              </div>
            </div>
          </div>

          {/* <!-- Product Details Tab --> */}
          <div className='product-detail'>
            <div className='tab-wrap product-detail-tabs'>
              <ul className='nav-tab-list tabs pd-tab'>
                <li
                  className={tab === 1 ? 'active' : ''}
                  onClick={() => setTab(1)}
                >
                  Description
                </li>
                <li
                  className={tab === 2 ? 'active' : ''}
                  onClick={() => setTab(2)}
                >
                  Reviews
                </li>
              </ul>

            </div>
          </div>
        </div>
        <img
          className='promo-video__decor js-img'
          src='/assets/img/promo-video__decor.jpg'
          alt=''
        />
      </div>
      {/* <!-- PRODUCT EOF   --> */}
    </>
  );
};
