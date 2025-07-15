import { register, login, getuser } from '../controllers/authcontroller.js';
import { protect } from '../middleware/authmiddleware.js'; 
import express from 'express';
import upload from '../middleware/uploadmiddleware.js'; 
const router = express.Router();
// Register route
router.post('/register',register);
// Login route
router.post('/login',login)
// Get user route
router.get( '/getuser',protect, getuser);

router.post("/upload-image", upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.status(200).json({
    message: "Image uploaded successfully",
    imageUrl: imageUrl,
  });
});


// Export the router
export default router;