import cors from 'cors';
import userRegister from './routes/auth.mjs'
import userLogin from './routes/auth.mjs'
import userUpdate from './routes/user.mjs'
import userDelete from './routes/user.mjs'
import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import helmet from 'helmet'
import dotenv from 'dotenv'

const app=express()
app.use(express.json())
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

 dotenv.config();
 mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server after successful connection
    app.listen(8087, () => {
      console.log('Server running on port 8087');
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

//middleware

app.use(helmet())
app.use(morgan("common"))
app.use('/api/register',userRegister)
app.use('/api/login',userLogin)
app.use('/api/users',userUpdate)
app.use('/api/user',userDelete)

app.get('/',(req,res)=>{
  res.send("Welcome to Home Page")
})


  