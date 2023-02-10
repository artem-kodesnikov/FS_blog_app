const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const authRouter = require('./authRouter');
const userRoute = require('./userRouter');
const session = require('express-session');

const PORT = process.env.PORT || 5000

const app = express();
app.use(express.json());
app.use(cors());
app.use(session({
  secret: "thisismysecretkey",
  cookie: {
    maxAge: 30000
  },
  saveUninitialized: false
}))
app.use('/auth', authRouter);
app.use('/user', userRoute);

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