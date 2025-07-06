import React from 'react'
import AuthLayouts from '../Components/Layouts/AuthLayouts'
import Input from '../input/Input'
import { Link } from 'react-router' // Fixed import
import PhotoSelector from '../input/PhotoSelector'

const SignUp = () => {
  const [profilepic, setProfilePic] = React.useState(null);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [nameError, setNameError] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Reset errors
    setNameError('');
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
    // Name validation
    if (!name) {
      setNameError('Username is required');
    } else if (name.length < 3) {
      setNameError('Username should have at least 3 characters');
    }
  }

  return (
    <AuthLayouts>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-2xl font-semibold mt-14'>Create an Account</h3>
        <p className='text-[15px] text-gray-700 -mb-12'>Join us today by entering your details</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-6 flex justify-center">
            <PhotoSelector image={profilepic} setImage={setProfilePic}/>
          </div>

          <div className='mb-20'>
            
            <div >
              <Input
                type="text"
                placeholder='john123'
                className='input' 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                label="Username"
              />
              {nameError && <p className='text-red-500 text-xs mt-1'>{nameError}</p>}
            </div>

            <div>
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
              Sign Up
            </button>
          </div>

          <p className='mt-4 text-center text-sm text-gray-600'>
            Already have an account?{' '}
            <Link to="/login" className='text-blue-600 hover:underline'>Login</Link>
          </p></div>
        </form>
      </div>
    </AuthLayouts>
  )
}

export default SignUp