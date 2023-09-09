import { parseISO, format } from "date-fns";


export const Card = ({ order, index, onCollapse, active }) => {
  const { date_created, billing, total, status, line_items ,payment_method} = order;

  return (
    <>
      <div className={`profile-orders__item ${active === index && 'active'}`}>
        <div className='profile-orders__row'>
          <div className='profile-orders__col'>
            <span className='profile-orders__col-mob'>date</span>
            <span className='profile-orders__item-date'> {format(parseISO(date_created), "MMM dd, yyyy")}</span>
          </div>
          <div className='profile-orders__col'>
            <span className='profile-orders__col-mob'>Delivery address</span>
            <span className='profile-orders__item-addr'>{billing.address_1} {billing.city}</span>
          </div>
          <div className='profile-orders__col'>
            <span className='profile-orders__col-mob'>amount</span>
            <span className='profile-orders__item-price'>${total}</span>
          </div>
          <div className='profile-orders__col'>
            <span className='profile-orders__col-mob'>Status</span>
            <span
              className={`profile-orders__col-${
                status==="completed" ? 'delivered' : 'onway'
              }`}
            >
              {status}
            </span>
            <span
              onClick={() => onCollapse(index)}
              className='profile-orders__col-btn'
            ></span>
          </div>
        </div>
        <div className='profile-orders__content'>
          <ul>
            {line_items.map((item, index) => (
              <li key={index}>
                {item.name}
                <span>${item.price}</span>
              </li>
            ))}
            <li>
              Payment Methods:{payment_method}
              <span>{payment_method}</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
