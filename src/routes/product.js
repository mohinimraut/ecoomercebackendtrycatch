const express = require('express');

// const {} = require('../controller/category');
const { requireSignin, adminMiddleware } = require('../common-middleware');
const { createProduct, getProductsBySlug,getProductDetailsById } = require('../controller/product');
const multer = require('multer');
//uploads is a destination folder where upload the files
const router = express.Router();
const Product = require('../models/product')

const shortid = require('shortid');
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, shortid.generate() + '-' + file.originalname)
    }
})

const upload = multer({ storage });


router.post('/product/create', requireSignin, adminMiddleware, upload.array('productPicture'), createProduct)
// router.get('/category/getcategory', getCategories)
router.get('/products/:slug', getProductsBySlug)
router.get("/product/:productId", getProductDetailsById);

module.exports = router;

