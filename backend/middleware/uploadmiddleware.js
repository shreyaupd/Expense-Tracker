import multer from 'multer';

const storage=multer.diskStorage({
    destination: (req, file, cb)=>{ //req is the request object, file is the file object, cb is the callback function
    cb(null, 'uploads/')
    },
    filename:(req,file,cb)=>{
        cb(null, `${Date.now()}-${file.originalname}`); 
    }
})
  const fileFilter=(req,file,cb)=>{

const allowedname=['image/jpeg', 'image/png', 'image/jpg'];
    if(allowedname.includes(file.mimetype)){ //mimetype is the type of file being uploaded
        cb(null, true); // Accept the file
    }
    else{
        cb(new Error('Invalid file type. Only JPEG and PNG are allowed.'), false); // Reject the file
    }
  }
  const upload=multer({
    storage:storage,
    limits:{fileSize: 1024 * 1024 * 5}, // Limit file size to 5MB
    fileFilter:fileFilter
  })
export default upload; 
  