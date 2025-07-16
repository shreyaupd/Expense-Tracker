import {addincome, getincome, deleteincome, downloadincome} from '../controllers/incomecontroller.js';
import express from 'express';
const route=express.Router();
route.post('/add',protect, addincome);
route.get('/get', protect, getincome);
route.delete('/delete/:id', protect, deleteincome); 
route.get('/download', protect, downloadincome);
export default route;