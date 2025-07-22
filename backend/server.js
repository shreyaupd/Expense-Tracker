import express from 'express';
import dbconnect from './config/db.js';
import authRoutes from './routes/authroutes.js'; 
import expenseRoutes from './routes/expenseroutes.js';
import incomeRoutes from './routes/incomeroutes.js';
import dashboardRoutes from './routes/dashboardroutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import dotenv from 'dotenv';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: './.env' });

const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
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
