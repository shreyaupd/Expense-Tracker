import express from 'express';
import {protect} from '../middleware/authmiddleware.js';
import {dashboardData} from '../controllers/dashboardcontroller.js';
const router=express.Router();
router.get('/dashboarddata',protect, dashboardData);
export default router;
 