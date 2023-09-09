import Link from 'next/link';

export const Card = ({ wish }) => {
  const { name, images, id, isStocked, productNumber, price } = wish;
  return (
    <>
      {/* <!-- BEGIN WISHLIST CARD --> */}
      <div className='cart-table__row'>
        <div className='cart-table__col'>
          <Link href={`/product/${id}`}>
            <a className='cart-table__img'>
              {/* <img src={image} className='js-img' alt='' /> */}
              {images && images.length > 0 && (
                <img src={images[0].src} alt="Product" className="js-img" />
              )}
            </a>
          </Link>
          <div className='cart-table__info'>
            <Link href={`/product/${id}`}>
              <a className='title5'>{name}</a>
            </Link>
            <span className='cart-table__info-num'>SKU: {productNumber}</span>
          </div>
        </div>
        <div className='cart-table__col'>
          <span className='cart-table__price'>${price}</span>
        </div>
        <div className='cart-table__col'>
          {isStocked ? (
            <span className='wishlist-stock'>in stock</span>
          ) : (
            <span className='wishlist-available'>not available</span>
          )}
        </div>
        <div className='cart-table__col'>
          <span className='cart-table__total'>
            <Link href={`/product/${id}`}>
              <a className='blog-item__link'>
                buy now <i className='icon-arrow-md'></i>
              </a>
            </Link>
          </span>
        </div>
      </div>
      {/* <!-- WISHLIST CARD EOF--> */}
    </>
  );
};
