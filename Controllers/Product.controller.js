const Product = require('../Models/Product.model')
const createError = require('http-errors');

module.exports = {
    addProduct: async (req, res, next) => {
        try{
            const {name, price, brand_id, unitsinstock, sold, description} = req.body
            let lastest_product = await Product.find().sort({id:-1});
            let count
            let id
            if(lastest_product.length >0){
                count = lastest_product[0].id.split('PD')
                id = "PD000" + (parseInt(count[1]) + 1).toString()
            }
            else {
                id = "PD0001"
            }

            const product = new Product({
                "id": id,
                "name": name,
                "price": price,
                "brand_id": brand_id,
                "unitsinstock": unitsinstock,
                "sold": sold,
                "description": description
            });

            let saveProduct = await product.save()
            return res.json({ 
                status: '200',
                element: product
            })
        }
        catch(err){ next(err); }
    }
}