import {
  SlickArrowPrev,
  SlickArrowNext,
} from 'components/utils/SlickArrows/SlickArrows';
import { CartContext } from 'pages/_app';
import { useContext } from 'react';
import Slider from 'react-slick';
import { SingleProduct } from './SingleProduct/SingleProduct';
import { useEffect, useState } from 'react';
import axios from "axios"

export const ProductsCarousel = ({ products }) => {
  const { cart, setCart } = useContext(CartContext);
  const [responseMessage, setResponseMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
        })
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

  console.log("testingCart", cart)
  const settings = {
    dots: false,
    infinite: false,
    arrows: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <SlickArrowPrev />,
    nextArrow: <SlickArrowNext />,
    lazyLoad: 'progressive',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  console.log("responseMessage", responseMessage)
  return (
    <>
      <Slider {...settings}>
        {products.map((product) => (
          <SingleProduct
            addedInCart={Boolean(cart?.innerObject?.find((pd) => pd.id === product.id))}
            key={product.id}
            product={product}
            onAddToWish={(id) => console.log(id)}
            onAddToCart={handleAddToCart}
          />
        ))}
      </Slider>
    </>
  );
};
