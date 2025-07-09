import { register, login, geuser } from '../controllers/authcontroller.js';
import express from 'express';
const router = express.Router();
// Register route
router.post('/register',register);
// Login route
router.post('login',login)
// Get user route
// router.get('/getuser',geuser);
// Export the router
export default router;