import React from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = ({ value, placeholder, onChange, type, label }) => {
    const [hiddenPassword, setHiddenPassword] = React.useState(true);
    const toggleShow = () => {
        setHiddenPassword(!hiddenPassword);
    };

    return (
        <div className='flex flex-col gap-2 mb-4 relative'>
            <label htmlFor="label" className='text-slate-800  mt-3 text-[15px]'>{label}</label>
            <div className='relative'>
                <input 
                    className='input border border-slate-400 rounded-md p-2 w-full focus:outline-none focus:border-blue-500 pr-10' // Added pr-10 for icon spacing
                    type={type === 'password' ? (hiddenPassword ? 'password' : 'text') : type}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange} 
                />
                {type === 'password' && (
                    <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
                        {hiddenPassword ? (
                            <FaEyeSlash
                                size={22} 
                                className="cursor-pointer"
                                onClick={toggleShow}
                            />
                        ) : (
                            <FaEye 
                                size={21} 
                                className="text-black cursor-pointer"
                                onClick={toggleShow}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Input;