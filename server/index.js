import 'dotenv/config';
import express, { urlencoded } from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import { connectDB } from './config/dbConfig.js';
const PORT=4000;
import ErrorHandler from "./utils/ErrorHandler.js"
const app = express();
import authRouter from './routes/authRoutes.js';
import projectRouter from './routes/projectRoutes.js'
// import categoriesRouter from "./routes/categoriesRoute.js"
// import productRouter from "./routes/productRoute.js"
// import adminRouter from "./routes/adminRoute.js"
// import paymentRouter from "./routes/paymentRoute.js"
// import userRouter from "./routes/projectRoute.js"





connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

app.use("/api/v1/auth",authRouter);
app.use("/api/v1",projectRouter);
// app.use("/api/v1/categories",categoriesRouter);
// app.use("/api/v1/product",productRouter);
// app.use("/api/v1/admin",adminRouter);
// app.use("/api/v1/payment",paymentRouter);
// app.use("/api/v1/user",userRouter);

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    res.status(err.statusCode).json({
        status: "failure",
        code: err.statusCode,
        message: err.message,
        data: []
    });
});

app.use((data, req, res, next) => {
    data.message = data.message || 'Fetch Successfully';
    data.data = data.data||[] ;

    res.status(data.statusCode).json({
        code: data.statusCode,
        message: data.message,
        data:data.data
    });
});



// create a route at /
app.get("/", (req, res) => {
    res.send(`<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ECommerce App</title>
      </head>
      <body style="font-family: 'Arial', sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; display: flex; align-items: center; justify-content: center; height: 100vh;">
        <div style="text-align: center; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <h1 style="color: #333333;">Welcome to the ECommerce API</h1>
          <p style="color: #666666;">This is the first Landing Page to E-Commerce!</p>
        </div>
      </body>
      </html>`);
  });
  
  
app.get("/api", (req, res) => {
    
    const isConnected = mongoose.connection.readyState === 1;
    console.log("API is working? " + (isConnected ? 'Connected to MongoDB' : 'Not connected to MongoDB'));
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>API Status</title>
    </head>
    <body style="font-family: 'Arial', sans-serif; text-align: center; background-color: #f4f4f4; margin: 0; padding: 0; display: flex; align-items: center; justify-content: center; height: 100vh;">
      <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h1 style="color: #333333;">Page 2 : API is working!!</h1>
        <h2>${isConnected ? 'Connected to MongoDB' : 'Not connected to MongoDB'}</h2>
      </div>
    </body>
    </html>
  `);
});





app.listen(PORT,()=>{
  connectDB();
    console.log(`Server is running on port ${PORT}`);
})
// https://www.youtube.com/watch?v=A_-fn_ij59cd