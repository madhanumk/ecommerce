import Dropdown from 'react-dropdown';
import { useState, useEffect } from 'react';
import axios from 'axios';

const countries = [
  { label: 'India', value: 'India' },
  { label: 'America', value: 'America' },
];
export const CheckoutStep1 = ({ onNext }) => {

  const [formData, setFormData] = useState({
    customer_id: "",
    billing: {
      first_name: '',
      last_name: '',
      phone: '',
      email: '',
      country: '',
      city: '',
      address_1: '',
      deliveryDay: '',
      deliveryTime: '',
      orderNote: '',
      createAccount: false,
    },

    shipping: {
      sameAsBilling: true,
      first_name: '',
      last_name: '',
      phone: '',
      email: '',
      country: '',
      city: '',
      address_1: '',
      deliveryDay: '',
      deliveryTime: '',
      orderNote: '',
      createAccount: false,
    },
    line_items: [
      {
        product_id: "",
        quantity: ""
      }
    ]
  });

  // const productId = localStorage.getItem('productIds');
  // const productQuantity = localStorage.getItem('productQuantity');

  // // Create a new line item object with the retrieved values
  // const newLineItem = {
  //   product_id: productId,
  //   quantity: productQuantity,
  // };



  const handleInputChange = (e) => {

    const { name, value, type, checked } = e.target;
    const [section, field] = name.split(".");
    const newValue = type === 'checkbox' ? checked : value;

    const productIdsString = localStorage.getItem('productIds') || '';
    const quantitiesString = localStorage.getItem('productQuantity') || '';

    const productIds = productIdsString.split(',');
    const quantities = quantitiesString.split(',');

    const line_items = [];

    for (let i = 0; i < productIds.length; i++) {
      const productId = productIds[i];
      const quantity = quantities[i];

      if (productId && quantity) {
        line_items.push({ product_id: productId, quantity: quantity });
      }
    }

    // Update formData using setFormData
    setFormData((prevData) => ({
      ...prevData,
      customer_id: localStorage.getItem('user_id') || '', // Provide a default value if 'user_id' is missing
      line_items: line_items,
    }));



    if (section === "shipping" && field === "sameAsBilling") {
      setFormData((prevData) => ({
        ...prevData,
        shipping: {
          ...prevData.shipping,
          sameAsBilling: checked,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [section]: {
          ...prevData[section],
          [field]: type === "checkbox" ? checked : value,
        },
      }));
    }
  };

  // const consumerKey = 'ck_fa6b1f1532dce191024eb5aff1497f6fb4626d77';
  // const consumerSecret = 'cs_e49693a9c9a685724184e80a3243120badf38ad3';

  const handleSubmit = (e) => {
    e.preventDefault();

    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      console.log("storinga", token);
    }
  

    axios.post('https://sreevidhya.co.in/file/wp-json/wc/v3/orders?consumer_key=ck_fa6b1f1532dce191024eb5aff1497f6fb4626d77&consumer_secret=cs_e49693a9c9a685724184e80a3243120badf38ad3', formData).then((response) => {
      console.log(response.data)
      console.log("formData", formData)
      clearCart(token,line_items)
    }).catch((error) => {
      console.error('Error:', error);
    });
  };


  useEffect(() => {
    // Check if we are in the browser environment before accessing localStorage
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      console.log("storinga", token);
    }
  }, []);


  const clearCart = (token) => {
    axios.post("https://sreevidhya.co.in/file/wp-json/cocart/v2/cart/clear", {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      console.log(res.data.quantity)
    }).catch((error) => {
      console.log(error)
    })
  };


  return (
    <>
      {/* <!-- BEING CHECKOUT STEP ONE -->  */}
      <div className='checkout-form'>

        <form onSubmit={handleSubmit}>
          <div className='checkout-form__item'>
            <h4>Info about you</h4>
            <div className='box-field'>
              <input
                type='text'
                className='form-control'
                placeholder='Enter your name'
                name='billing.first_name'
                value={formData.billing.first_name}
                onChange={handleInputChange}
              />
            </div>
            <div className='box-field'>
              <input
                type='text'
                className='form-control'
                placeholder='Enter your last name'
                name='billing.last_name'
                value={formData.billing.last_name}
                onChange={handleInputChange}
              />
            </div>
            <div className='box-field__row'>
              <div className='box-field'>
                <input
                  type='tel'
                  className='form-control'
                  placeholder='Enter your phone'
                  name='billing.phone'
                  value={formData.billing.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className='box-field'>
                <input
                  type='email'
                  className='form-control'
                  placeholder='Enter your mail'
                  name='billing.email'
                  value={formData.billing.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className='checkout-form__item'>
            <h4>Delivery Info</h4>
            {/* Dropdown or Select */}

            {/* <Dropdown
              options={countries}
              className='react-dropdown'
              name='country'
              value={formData.country}
              onChange={handleInputChange}
              placeholder='Select a country'
            /> */}

            <select
              name="billing.country"
              value={formData.billing.country}
              className='form-control select_option'
              onChange={handleInputChange} // Just pass the function reference, not the event
            >
              <option value="" className='select_option'>Select a Country</option>
              <option value="INDIA" className='select_option'>India</option>
              <option value="US" className='select_option'>United States</option>
              <option value="CA" className='select_option'>Canada</option>
              {/* Add more country options */}
            </select>


            <div className='box-field__row'>
              <div className='box-field'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Enter the city'
                  name='billing.city'
                  value={formData.billing.city}
                  onChange={handleInputChange}
                />
              </div>
              <div className='box-field'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Enter the address'
                  name='billing.address_1'
                  value={formData.billing.address_1}
                  onChange={handleInputChange}
                />
              </div>
            </div>






            {/* <div className='box-field__row'>
              <div className='box-field'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Delivery day'
                  name='deliveryDay'
                  value={formData.billing.deliveryDay}
                  onChange={handleInputChange}
                />
              </div>
              <div className='box-field'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Delivery time'
                  name='deliveryTime'
                  value={formData.deliveryTime}
                  onChange={handleInputChange}
                />
              </div>
            </div> */}
          </div>

          <label>
            <input
              type="checkbox"
              name="shipping.sameAsBilling"
              checked={formData.shipping.sameAsBilling}
              onChange={handleInputChange}
            />
            Same as Billing
          </label>

          {!formData.shipping.sameAsBilling && (
            <>
              <div className='checkout-form__item'>
                <h4>Info about you</h4>
                <div className='box-field'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Enter your name'
                    name='shipping.first_name'
                    value={formData.shipping.first_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className='box-field'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Enter your last name'
                    name='shipping.last_name'
                    value={formData.shipping.last_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className='box-field__row'>
                  <div className='box-field'>
                    <input
                      type='tel'
                      className='form-control'
                      placeholder='Enter your phone'
                      name='shipping.phone'
                      value={formData.shipping.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className='box-field'>
                    <input
                      type='email'
                      className='form-control'
                      placeholder='Enter your mail'
                      name='shipping.email'
                      value={formData.shipping.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className='checkout-form__item'>
                <h4>Delivery Info</h4>
                {/* Dropdown or Select */}

                {/* <Dropdown
              options={countries}
              className='react-dropdown'
              name='country'
              value={formData.country}
              onChange={handleInputChange}
              placeholder='Select a country'
            /> */}

                <select
                  name="shipping.country"
                  value={formData.shipping.country}
                  className='form-control  select_option'
                  onChange={handleInputChange} // Just pass the function reference, not the event
                >
                  <option value="" className='select_option'>Select a Country</option>
                  <option value="INDIA" className='select_option'>India</option>
                  <option value="US" className='select_option'>United States</option>
                  <option value="CA" className='select_option'>Canada</option>
                  {/* Add more country options */}
                </select>


                <div className='box-field__row'>
                  <div className='box-field'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Enter the city'
                      name='shipping.city'
                      value={formData.shipping.city}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className='box-field'>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Enter the address'
                      name='shipping.address_1'
                      value={formData.shipping.address_1}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>






                {/* <div className='box-field__row'>
              <div className='box-field'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Delivery day'
                  name='deliveryDay'
                  value={formData.billing.deliveryDay}
                  onChange={handleInputChange}
                />
              </div>
              <div className='box-field'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Delivery time'
                  name='deliveryTime'
                  value={formData.deliveryTime}
                  onChange={handleInputChange}
                />
              </div>
            </div> */}
              </div>

            </>
          )}

          <div className='checkout-form__item'>
            {/* <h4>Note</h4>
            <div className='box-field box-field__textarea'>
              <textarea
                className='form-control'
                placeholder='Order note'
                name='orderNote'
                value={formData.orderNote}
                onChange={handleInputChange}
              ></textarea>
            </div> */}
            <label className='checkbox-box checkbox-box__sm'>
              <input
                type='checkbox'
                name='createAccount'
                checked={formData.createAccount}
                onChange={handleInputChange}
              />
              <span className='checkmark'></span>
              Create an account
            </label>
          </div>


          <div className='checkout-buttons'>
            <button type='submit' className='btn btn-icon btn-next'>
              next <i className='icon-arrow'></i>
            </button>
          </div>
        </form>

      </div>
      {/* <!-- CHECKOUT STEP ONE EOF -->  */}
    </>
  );
};
