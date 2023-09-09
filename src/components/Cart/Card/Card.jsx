import Link from 'next/link';

export const Card = ({ cart, onChangeQuantity, }) => {

  const {
    name,
    featured_image,
    id,
    stock_quantity,
    meta,
    oldPrice,
    price,
    quantity,

  } = cart;


  console.log("cartQuantity",quantity)
  console.log("cartcart",cart)

  return (
    <>
      <div className='cart-table__row'>
        <div className='cart-table__col'>
          <Link href={`/product/${id}`}>
            <a className='cart-table__img'>
              {/* <img src={image} className='js-img' alt='' /> */}
              {featured_image && featured_image.length > 0 && (
                <img src={featured_image} alt="Product" className="js-img" />
              )}
            </a>
          </Link>
          <div className='cart-table__info'>
            <Link href={`/product/${id}`}>
              <a className='title5'>{name}</a>
            </Link>

            {quantity?.value ? (
              <span className='product-stock'>In Stock</span>
            ) : (
              <span className='product-stock' style={{ color: "red " }}>Out Of Stock</span>
            )}

            <span className='cart-table__info-num'>SKU: {meta?.sku}</span>
          </div>
        </div>
        <div className='cart-table__col'>
          {oldPrice ? (
            <span className='cart-table__price'>
              <span>${oldPrice}</span>${parseFloat(price?.slice(0,-2)).toFixed(2)}
            </span>
          ) : (
            <span className='cart-table__price'>${parseFloat(price?.slice(0,-2)).toFixed(2)}</span>
          )}
        </div>
        <div className='cart-table__col'>
          <div className='cart-table__quantity'>
            <div className='counter-box'>
              <span
                onClick={() => onChangeQuantity(id, "decrement")}
                className='counter-link counter-link__prev'
              >
                <i className='icon-arrow'></i>
              </span>
              <input
                type='text'
                className='counter-input'
                disabled
                value={quantity?.value}
              />
              <span
                onClick={() => onChangeQuantity(id, "increment")}
                className='counter-link counter-link__next'
              >
                <i className='icon-arrow'></i>
              </span>
            </div>
          </div>
        </div>
        <div className='cart-table__col'>
          <span className='cart-table__total'>
           ${price?.slice(0,-2)*quantity?.value}
          </span>
        </div>
      </div>
    </>
  );
};
