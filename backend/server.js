require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const morgan = require('morgan');
const cors = require('cors');

const PORT = process.env.PORT || 5000

const app = express();
app.use(express.json())

// Connecting to database 
connectDB()

// bodyparser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

app.use(express.static('public'));

// Import all routes
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes')
const subRoutes = require('./routes/subRoutes')
const productRoutes = require('./routes/productRoutes')
const cloudinaryRoutes = require('./routes/cloudinaryRoutes')
const couponRoutes = require('./routes/couponRoutes')
const stripeRoutes = require('./routes/stripeRoutes')
// connecting routes 
app.use('/api',userRoutes)
app.use('/api',categoryRoutes)
app.use('/api',subRoutes)
app.use('/api',productRoutes)
app.use('/api',cloudinaryRoutes)
app.use('/api',couponRoutes)
app.use('/api',stripeRoutes)

// Routes
app.get('/',(req,res)=>{
    res.send('Homepage')
    

});
// middlewares
app.use(morgan("dev"))
app.use(cors())


app.listen(PORT,()=>console.log(`Server Started at Port ${PORT}
=> http://localhost:${PORT} in mode ${process.env.NODE_ENV}`))