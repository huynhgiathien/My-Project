const Brand = require('../Models/Brand.model')
const createError = require('http-errors');

module.exports = {
    addbrand: async (req, res, next) => {
        try{
            const {name, country, description} = req.body
            let lastest_brand = await Brand.find().sort({id:-1});
            let count
            let id
            if(lastest_brand.length >0){
                count = lastest_brand[0].id.split('BD')
                id = "BD000" + (parseInt(count[1]) + 1).toString()
            }
            else {
                id = "BD0001"
            }

            const brand = new Brand({
                "id": id,
                "name": name,
                "country": country,
                "description": description
            });

            let saveBrand = await brand.save()
            return res.json({ 
                status: '200',
                element: brand
            })
        }
        catch(err){
            next(err);
        }

    },

    getlistbrand: async (req, res, next) => {
        try{
            const listBrand = await Brand.find();
            return res.json({
                "status":200,
                listBrand: listBrand
            })
        }
        catch(err){
            next(err);
        }
        

    }
}