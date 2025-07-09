import express from 'express';
import dbconnect from './config/db.js';
import authRoutes from './routes/authroutes.js'; 
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use("/api/v1/auth", authRoutes); // ✅ FIXED

const PORT = process.env.PORT || 9000;

dbconnect()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
    });
})
.catch((error) => {
    console.error('MONGODB connection failed', error);
});
