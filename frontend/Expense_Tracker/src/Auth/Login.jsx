import React from 'react'
import Input from '../input/Input'
import AuthLayouts from '../Components/Layouts/AuthLayouts'
import { Link, useNavigate } from 'react-router' // added useNavigate for redirection
import axiosinstance from '../../Utils/axiosinstance'
import { API_PATHS } from '../../Utils/apiPath'

const Login = () => {
  // State for form fields
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  // State for error messages
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');

  // Navigation hook
  const navigate = useNavigate();

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors before validation
    setEmailError('');
    setPasswordError('');

    let isValid = true;

    // Email validation
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!email.includes('@') || !email.includes('.')) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }

    // Password validation
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password should have at least 6 characters');
      isValid = false;
    }

    // Stop if validation failed
    if (!isValid) return;

    // API call
    try {
      const response = await axiosinstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password
      });

      const { token, user } = response.data;

      // Save token in localStorage for future requests
      localStorage.setItem('token', token);

      // Navigate to dashboard after successful login
      navigate('/dashboard');
    } catch (error) {
      if (error.response && error.response.data.message) {
        setEmailError(error.response.data.message);
      } else {
        setEmailError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <AuthLayouts>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-2xl font-semibold'>Welcome Back</h3>
        <p className='text-[15px] text-gray-700 mt-4'>Enter your credentials</p>

        <form onSubmit={handleSubmit}>
          {/* Email input */}
          <div className="mb-4">
            <Input
              type="email"
              placeholder='johndoe@example.com'
              className='input' 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              label="Email Address"
            />
            {emailError && <p className='text-red-500 text-xs mt-1'>{emailError}</p>}
          </div>

          {/* Password input */}
          <div className="mb-4">
            <Input
              type="password"
              placeholder='Enter your password (at least 6 characters)'
              className='input' 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
            />
            {passwordError && <p className='text-red-500 text-xs mt-1'>{passwordError}</p>}
          </div>

          {/* Submit button */}
          <div>
            <button 
              type="submit"
              className='bg-blue-600 cursor-pointer text-white font-extrabold text-xl px-4 py-2 rounded-md w-full mt-4 hover:bg-cyan-600 transition-colors duration-300'
            >
              Login
            </button>
          </div>

          {/* Sign up link */}
          <p className='mt-4 text-center text-sm text-gray-600'>
            Don't have an account?
            <Link to="/SignUp" className='text-blue-600 px-2 hover:underline'>
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayouts>
  )
}

export default Login
