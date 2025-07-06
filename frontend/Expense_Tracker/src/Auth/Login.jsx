import React from 'react'
import Input from '../input/Input'
import AuthLayouts from '../Components/Layouts/AuthLayouts'
import { Link } from 'react-router'
const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Reset errors
    setEmailError('');
    setPasswordError('');
    
    // Email validation
    if (!email) {
      setEmailError('Email is required');
    } else if (!email.includes('@') || !email.includes('.')) {
      setEmailError('Please enter a valid email address');
    }
    
    // Password validation
    if (!password) {
      setPasswordError('Password is required');
    } else if (password.length < 6) {
      setPasswordError('Password should have at least 6 characters');
    }
    
  }

  return (
    <AuthLayouts>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-2xl font-semibold'>Welcome Back</h3>
        <p className='text-[15px] text-gray-700 mt-4'>Enter your credentials</p>

        <form onSubmit={handleSubmit}>
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

          <div>
            <button 
              type="submit"
              className='bg-blue-600 cursor-pointer text-white font-extrabold text-xl px-4 py-2 rounded-md w-full mt-4 hover:bg-cyan-600 transition-colors duration-300'
            >
              Login
            </button>
          </div>

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