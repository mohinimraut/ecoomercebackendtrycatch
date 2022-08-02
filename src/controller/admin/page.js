const Page = require('../../models/page');
exports.createPage = (req, res) => {
    const { banners, products } = req.files;
    if (banners && banners.length > 0) {
        req.body.banners = banners.map((banner, index) => ({
            img: `${process.env.API}/public/${banner.filename}`,
            navigateTo: `/bannerClicked?categoryId=${req.body.category}$type=${req.body.type}`
        }));
    }
    if (products && products.length > 0) {
        req.body.products = products.map((product, index) => ({
            img: `${process.env.API}/public/${product.filename}`,
            navigateTo: `/productClicked?categoryId=${req.body.category}$type=${req.body.type}`
        }));
    }
    req.body.createdBy = req.user._id;
    //down based on id
    Page.findOne({ category: req.body.category })
        .exec((error, page) => {
            if (error) return res.status(400).json({ error });
            if (page) {
                //find category and second req.body that we want update
                Page.findOneAndUpdate({ category: req.body.category }, req.body)
                    .exec((error, updatedPage) => {
                        if (error) return res.status(400).json({ error });
                        if (updatedPage) {
                            return res.status(201).json({ page: updatedPage });
                        }
                    })
            } else {
                //we here put the req.body into the Page Object
                const page = new Page(req.body)
                page.save((error, page) => {
                    if (error) return res.status(400).json({ error });
                    if (page) {
                        return res.status(201).json({ page })
                    }
                });
            }
        })



}

exports.getPage = (req, res) => {
    //Into the params we send categoryid and type
    const { category, type } = req.params;
    if (type === "page") {
        //Then we find the page in the page collection and then 
        Page.findOne({ category: category })
            //then return here
            .exec((error, page) => {
                if (error) return res.status(400).json({ error });
                if (page) return res.status(200).json({ page })
            })
    }
}





