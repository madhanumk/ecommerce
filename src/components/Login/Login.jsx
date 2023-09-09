import { SocialLogin } from 'components/shared/SocialLogin/SocialLogin';
import { useEffect, useState } from 'react';
import axios from "axios"
import { useRouter } from 'next/router';
import { Modal } from 'antd';


export const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [username, setUsername] = useState(""); // Add username state
 const [userId,setUserId] = useState("")

  const router = useRouter();

  const handleInputChange = (e) => {
    // Update the formData state when input values change
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
    // Check if the user is already logged in based on the token in localStorage
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    const storedUserId = localStorage.getItem("user_id")
    if (storedToken) {
      // Set the token and mark the user as logged in
      console.log("userstoredname",storedUser)
      setUsername(storedUser)
      setUserId(storedUserId)
      setIsLoggedIn(true);
      // You can also fetch the user's username or other data here if needed
    }
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      alert("Please fill in all the required fields.");
      return;
    }

    // Make the API request with the form data
    axios
      .post("https://sreevidhya.co.in/file/wp-json/jwt-auth/v1/token", formData)
      .then((res) => {
        // Handle the response, such as storing the token or redirecting the user
        console.log(res.data);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', res.data.user_display_name);
        localStorage.setItem('user_id', res.data.customer_id);
        setIsLoggedIn(true);
        setUsername(formData.username); // Set the username state upon successful login
        // router.push('/'); // Redirect to the desired page
      })
      .catch((error) => {
        // Handle errors here
        console.error(error);
        // alert("Email ID or Password doesn't match. Please go to Registration.");
        Modal.error({
          title: 'Pleace Enter Your Correct EMailID ',
          content: "Email ID or Password doesn't match. Please go to Registration..."
        });
      });

    // Reset the form fields
    setFormData({
      username: "",
      password: ""
    });
  };

  const handleLogout = () => {
    // Implement your logout logic here (e.g., clear user session)
    // For this example, we'll simply toggle the isLoggedIn state
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <>
      {/* <!-- BEGIN LOGIN --> */}
      <div className='login'>
        <div className='wrapper'>
          <div
            className='login-form js-img'
            style={{ backgroundImage: `url('/assets/img/login-form__bg.png')` }}
          >
            {isLoggedIn ? (
              <div>
                <SocialLogin />
                <h3 className='welcome'>Welcome, {username}!</h3>
                <div className='logout_outer'>
                  <button onClick={handleLogout} className='logout'>Logout</button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3>log in with</h3>
                <SocialLogin />

                <div className='box-field'>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className='form-control'
                    placeholder='Enter your email or nickname'
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className='box-field'>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className='form-control'
                    placeholder='Enter your password'
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <label className='checkbox-box checkbox-box__sm'>
                  <input type='checkbox' />
                  <span className='checkmark'></span>
                  Remember me
                </label>
                <button className='btn' type='submit'>
                  log in
                </button>
                <div className='login-form__bottom'>
                  <span>
                    No account?{' '}
                    <a onClick={() => router.push('/registration')}>
                      Register now
                    </a>
                  </span>
                  <a href='#'>Lost your password?</a>
                </div>
              </form>
            )}
          </div>
        </div>
        <img
          className='promo-video__decor js-img'
          src='/assets/img/promo-video__decor.jpg'
          alt=''
        />
      </div>
      {/* <!-- LOGIN EOF   --> */}
    </>
  );
};
