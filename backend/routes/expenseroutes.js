import  { addexpense, getexpense, deleteexpense, downloadexpense } from '../controllers/expensecontroller.js';
import { protect } from '../middleware/authmiddleware.js';
import express from 'express';
const route=express.Router();
route.post('/add',protect, addexpense);
route.get('/get', protect, getexpense);
route.delete('/delete/:id', protect, deleteexpense); 
route.get('/download', protect, downloadexpense);
export default route;