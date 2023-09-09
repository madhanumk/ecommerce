import Link from 'next/link';

export const Card = ({ order }) => {
  const { featured_image, name, price, meta, id, quantity, } = order;


  console.log("checkout_order",order)
  return (
    <>
      {/* <!-- BEING ORDER ITEM CARD --> */}
      <div className='checkout-order__item'>
        <Link href={`/product/${id}`}>
          <a className='checkout-order__item-img'>
            {/* {
              images.map((value,index) => {

                return(
                  <img src={value.src} alt={index} />
                )
              })
            } */}
             {featured_image && featured_image?.length > 0 && (
                <img src={featured_image} alt="Product" className="js-img" />
              )}
            {/* <img src={image} className='js-img' alt='' /> */}
          </a>
        </Link>
        <div className='checkout-order__item-info'>
          <Link href={`/product/${id}`}>
            <a className='title6'>
              {name} <span>x{quantity?.value}</span>
            </a>
          </Link>
          <span className='checkout-order__item-price'>
            ${(price?.slice(0,-2) * quantity?.value).toFixed(2)}
          </span>
          <span className='checkout-order__item-num'>SKU: {meta?.sku}</span>
        </div>
      </div>
      {/* <!-- ORDER ITEM CARD EOF --> */}
    </>
  );
};
