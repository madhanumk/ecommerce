import { ProductsCarousel } from 'components/Product/Products/ProductsCarousel';
import { SectionTitle } from 'components/shared/SectionTitle/SectionTitle';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Trending = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // const apiKey = 'ck_d72694c3d2fececf68fc8445c5f1e08f1e0e6595';
  // const apiSecret = 'cs_bb077412971bcedc81c0e63c3cee50f3bea9a6b8';
  // const baseUrl = 'https://suvado.in/rdbs/wp-json/wc/v3';

  useEffect(() => {
    axios
      .get(`https://sreevidhya.co.in/file//wp-json/cocart/v1/products/categories/?per_page=100`
      // , {
      //   auth: {
      //     username: apiKey,
      //     password: apiSecret,
      //   },
      // }
      ).then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`https://sreevidhya.co.in/file/wp-json/cocart/v1/products/?per_page=100`
      // , {
      //   auth: {
      //     username: apiKey,
      //     password: apiSecret,
      //   },
      // }
      ).then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    
  }; 

  const product = selectedCategory
  ? products.filter(product => product.categories.some(cat => cat.id === selectedCategory))
  : products;


    console.log("product",product)
  return (
    <>
      <section className="trending">
        <div className="trending-content">
        <SectionTitle
            subTitle='Cosmetics'
            title='Trending products'
            body='Nourish your skin with toxin-free cosmetic products. With the offers that you can’t refuse.'
          />
          <div className="tab-wrap trending-tabs">
            <ul className="nav-tab-list tabs">
              {categories.map((item) => (
                <li
                  key={item.id}
                  onClick={() => handleCategoryClick(item.id)}
                  className={item.id === selectedCategory ? 'active' : ''}
                  style={{ marginBottom: '20px', cursor: 'pointer' }}
                >
                  {item.name}
                </li>
              ))}
            </ul>
            <div className="products-items">
              <ProductsCarousel products={product} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
