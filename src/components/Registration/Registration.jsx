import { SocialLogin } from 'components/shared/SocialLogin/SocialLogin';
import router from 'next/router';
import { useState } from 'react';
import axios from "axios"
import { Modal } from 'antd';

export const Registration = () => {
  const [formData, setFormData] = useState(
    {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  )

  const inputChange = ((e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  })

  const handleSubmit = ((e) => {
    e.preventDefault();

    axios.post("https://sreevidhya.co.in/file/wp-json/wp/v2/users", formData).then((res) => {
      console.log(res.data)

      if (formData.password === formData.confirmPassword) {
        console.log("formData", formData)
        router.push('/login')
        // alert("Your Registration Has Successfully Complited Go To LogIn")
        Modal.success({
          title: 'Your Registration Has Successfully Complited... ',
          content: 'Goto Login Page'
        });
      } else {
        console.log("check our password")
      }
    }).catch((error) => {
      console.log(error)
    })

    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    });

  })

  return (
    <>
      {/* <!-- BEGIN REGISTRATION --> */}
      <div className='login registration'>
        <div className='wrapper'>
          <div
            className='login-form js-img'
            style={{
              backgroundImage: `url('/assets/img/registration-form__bg.png')`,
            }}
          >
            <form onSubmit={handleSubmit}>
              <h3>register now</h3>
              <SocialLogin />

              <div className='box-field__row'>
                <div className='box-field'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Enter your name'
                    name="username"
                    value={formData.username}
                    onChange={inputChange}
                    required
                  />
                </div>
                <div className='box-field'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Enter your email ID'
                    name="email"
                    value={formData.email}
                    onChange={inputChange}
                    required
                  />
                </div>
              </div>
              {/* <div className='box-field__row'>
                <div className='box-field'>
                  <input
                    type='tel'
                    className='form-control'
                    placeholder='Enter your phone'
                  />
                </div>
                <div className='box-field'>
                  <input
                    type='email'
                    className='form-control'
                    placeholder='Enter your email'
                  />
                </div>
              </div> */}
              <div className='box-field__row'>
                <span>password</span>
                <div className='box-field'>
                  <input
                    type='password'
                    className='form-control'
                    placeholder='Enter your password'
                    name="password"
                    value={formData.password}
                    onChange={inputChange}
                    required
                  />
                </div>
                <div className='box-field'>
                  <input
                    type='password'
                    className='form-control'
                    placeholder='Confirm password'
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={inputChange}
                    required
                  />
                </div>
              </div>
              <label className='checkbox-box checkbox-box__sm'>
                <input type='checkbox' />
                <span className='checkmark'></span>
                Remember me
              </label>
              <button className='btn' type='submit'>
                registration
              </button>
              <div className='login-form__bottom'>
                <span>
                  Already have an account?{' '}
                  <a onClick={() => router.push('/login')}>Log in</a>
                </span>
              </div>
            </form>
          </div>
        </div>
        <img
          className='promo-video__decor js-img'
          src='/assets/img/promo-video__decor.jpg'
          alt=''
        />
      </div>
      {/* <!-- REGISTRATION EOF   -->  */}
    </>
  );
};
