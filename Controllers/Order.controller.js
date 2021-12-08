const Order = require('../Models/Order.model')
const OrderDetail = require('../Models/OrderDetail.model')
const Product = require('../Models/Product.model')
const createError = require('http-errors');

module.exports = {
    addOrder: async (req, res, next) => {
        try{
            const {id_user, item} = req.body;
            //Begin ==== Check unitsinstock >= quantity
            let array
            let total_price = 0
            if(item!=null)
            {
                array = JSON.parse(JSON.stringify(item))
                console.log("array 1 :::::::::",array[0])
                //Begin==Kiểm tra số lượng sản phẩm//
               
                for(let i = 0; i < array.length; i++)
                {
                    test_unit = await Product.findOne({id:array[i].id, unitsinstock: {$lt:array[i].quantity}})
                    if (test_unit)
                    {
                        return res.json({code:0,msg:"Không đủ số lượng sản phẩm"})
                    }
                    else
                    {
                        total_price += parseFloat(array[i].price) * parseFloat(array[i].quantity)
                    }
                }
            }
            //End ==== Check unitsinstock >= quantity

            //Create Order
            //Declare order ID //
            let lastest_order = await Order.find().sort({id:-1});
            let count
            let id
            if(lastest_order.length >0){
                count = lastest_order[0].id.split('OD')
                id = "OD000" + (parseInt(count[1]) + 1).toString()
            }
            else {
                id = "OD0001"
            }

            let orderSave = new Order({
                id: id,
                price: total_price,
                create_date: new Date(),
                status: "processing",
                id_user: id_user
            })

            const saveOrder = await orderSave.save();

            //End create Order

            //Create Order detail//
           
            array.map((value) => {
                OrderDetail.create({
                    order_id: id,
                    product_id: value.id,
                    price: value.price,
                    quantity: value.quantity
                })
            })
            //End create Order detail//
            return res.json({status:"200",msg:"Tạo hóa đơn thành công"})
        }
        catch(err){ next(err); }
    }

}