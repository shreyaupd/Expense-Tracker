import React,{ useRef, useState } from 'react'
import {LuUser, LuUpload,LuTrash} from 'react-icons/lu'
const PhotoSelector = ({image,setImage}) => {
     const [previewUrl, setPreviewUrl] = useState(null);
     const inputRef= useRef(null);

    const handelPhotoChange=(e)=>{
        const file=e.target.files[0];
        if(file){
           setImage(file)
           const preview=URL.createObjectURL(file);
           setPreviewUrl(preview)
        } 
    }

    const handleremovePhoto=()=>{
        setImage(null);
        setPreviewUrl(null);
    }

    const onchoosePhoto=()=>{
        inputRef.current.click()
    }
  return (
    <div className='flex  ml-90 -mb-6 '>
     <input type="file" className='hidden' ref={inputRef} onChange={handelPhotoChange} />

     {!image?(
           <div className='relative flex flex-col items-center justify-center w-20 h-20 rounded-full bg-red-200'>
  <LuUser className='text-4xl' />
  <button 
    type="button" 
    onClick={onchoosePhoto}
    className='absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4'
  >
    <div className='cursor-pointer bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300 p-1 m-3'>
      <LuUpload className='text-xl' />
    </div>
  </button>
</div>
     ):(
            <div className='relative w-20 h-20'>
    <img 
      src={previewUrl} 
      alt="Profile" 
      className='w-full h-full rounded-full object-cover' 
    />
    <button 
      type="button" 
      className='absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-300'
      onClick={handleremovePhoto}
    >
      <LuTrash className='text-xl' />
    </button>
  </div>
     )}
    </div>
  )
}

export default PhotoSelector