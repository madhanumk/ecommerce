import { CartContext } from 'pages/_app';
import { useContext } from 'react';
import { SingleProduct } from './SingleProduct/SingleProduct';
import { useState } from 'react';
import axios from "axios"
import { id } from 'date-fns/locale';

export const Products = ({ products }) => {
  const { cart, setCart } = useContext(CartContext);


  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    console.log("storinga", token);
  }


  const handleAddToCart = async (id) => {
    try {
      const requestData = {
        id: id.toString(),
        quantity: "1",
      };

      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (!token) {
          // Handle the case where localStorage is not available or 'token' is not set
          return;
        }
      }

      // const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3NyZWV2aWRoeWEuY28uaW4vZmlsZSIsImlhdCI6MTY5Mzg4NzYwNywibmJmIjoxNjkzODg3NjA3LCJleHAiOjE2OTQ0OTI0MDcsImRhdGEiOnsidXNlciI6eyJpZCI6IjIifX19.dQkOMmbJv0EjetfbJNqvNiHE9DLbn410uufpsU5e-44';

      const response = await  axios
      .post(
        'https://sreevidhya.co.in/file/wp-json/cocart/v2/cart/add-item',
        JSON.stringify(requestData),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Response:', response.data);
      setCart([...cart, response.data]);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };
  return (
    <>
      {products.map((product) => (
        <SingleProduct
        addedInCart={Boolean(cart?.innerObject?.find((pd) => pd.id === product.id))}
          key={product.id}
          product={product}
          onAddToWish={(id) => console.log(id)}
          onAddToCart={handleAddToCart} 
        />
      ))}
    </>
  );
};
