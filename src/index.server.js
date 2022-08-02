const express = require('express');
var cors = require('cors')

const env = require('dotenv');
const app = express();
const mongoose = require('mongoose');
//routes
// here userRoute as a functions

const path = require('path')
const authRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin/auth')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const carttRoutes = require('./routes/cart')
const initialDataRoutes = require('./routes/admin/initialData');
const pageRoutes = require('./routes/admin/page');
const addressRoutes = require("./routes/address");

//environment variable or ypu can say constants
env.config()
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.wf8pt.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex:true

    }).then(() => {
        console.log('Database connected');
    });
//mongodb connection
//mongodb+srv://mohini:<password>@cluster0.wf8pt.mongodb.net/?retryWrites=true&w=majority

// add middleware otherwise get empty object {}.Sending Json data.So we parse Json to data
// app.use(express.json())
app.use(cors())
app.use(express.json());

app.use('/public', express.static(path.join(__dirname, 'uploads')))
app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', carttRoutes);
app.use('/api', initialDataRoutes);
app.use('/api', pageRoutes);
app.use("/api", addressRoutes);

app.get('/', (req, res, nex) => {
    res.status(200).json({
        message: "Hello from Server"
    })
})

app.post('/data', (req, res, nex) => {
    res.status(200).json({
        message: req.body
    })
})
app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`)
})