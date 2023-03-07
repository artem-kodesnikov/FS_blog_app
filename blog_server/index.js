const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const authRouter = require('./routers/authRouter');
const userRoute = require('./routers/userRouter');
const postsRoute = require('./routers/postRouter');
const session = require('express-session');

const BASE_URL = 'https://artem-kodesnikov.github.io/FS_blog_app/'

const PORT = process.env.PORT || 5000
const corsOptions ={
  origin: BASE_URL, 
  credentials:true,
  optionSuccessStatus:200
}

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(session({
  secret: "thisismysecretkey",
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000,
  },
  resave: true,
  saveUninitialized: false
}))
app.use('/auth', authRouter);
app.use('/user', userRoute);
app.use('/posts', postsRoute);

const start = async () => {
  try {
    await mongoose.connect(`mongodb+srv://art:testpass123@cluster0.9elaojn.mongodb.net/?retryWrites=true&w=majority`)
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()