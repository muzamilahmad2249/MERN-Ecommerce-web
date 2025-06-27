// controllers/orderController.js
const orderModel  = require('../models/orderModel');
const userModel = require('../index');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const frontend_url = "http://localhost:5173"

const  placeOrder = async(req,res)=>{ 
    try {
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        await newOrder.save()
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});
        const line_item = req.body.items.map((item)=({
            price_data:{
                currency:"pkr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100*278,
            },
            quantity:item.quantity,
        }));
        line_item.push({
            price_data:{
                currency:"pkr",
                product_data:{
                    name:"Delivary Charges",
                },
                unit_amount:2*100*278,
            },
            quantity:1,
        })
        const session= await stripe.checkout.session.create({
            line_item:line_item,
            mode:"payment",
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })
        res.json({success:true,session_url:session.url})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
        
    }
    
    

}


export  {placeOrder}



// const addOrderItems = asyncHandler(async (req, res) => {
//   // Fetch cartData from the user's profile
//   const user = await User.findById(req.user.id);
//   const cartData = user.cartData;

//   const orderItems = [];
//   let itemsPrice = 0;

//   for (const itemId in cartData) {
//     if (cartData[itemId] > 0) {
//       const product = await Product.findById(itemId);
//       if (product) {
//         orderItems.push({
//           name: product.name,
//           qty: cartData[itemId],
//           image: product.image,
//           price: product.new_price,
//           product: product._id,
//         });

//         itemsPrice += product.new_price * cartData[itemId];
//       }
//     }
//   }

//   const shippingPrice = itemsPrice > 100 ? 0 : 10; // Example shipping price
//   const taxPrice = itemsPrice * 0.1; // Example tax rate (10%)
//   const totalPrice = itemsPrice + shippingPrice + taxPrice;

//   const { shippingAddress, paymentMethod } = req.body;

//   if (orderItems.length === 0) {
//     return res.status(400).json({ error: "No items in the cart" });
//   }

//   const order = new Order({
//     user: req.user.id,
//     orderItems,
//     shippingAddress,
//     paymentMethod,
//     itemsPrice,
//     taxPrice,
//     shippingPrice,
//     totalPrice,
//   });

//   const createdOrder = await order.save();
//   res.status(201).json(createdOrder);
// });






// @desc    Create new order
// @route   POST /api/orders
// @access  Private
// const addOrderItems = asyncHandler(async (req, res) => {
//   const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

//   if (orderItems && orderItems.length === 0) {
//     res.status(400);
//     throw new Error("No order items");
//   } else {
//     const order = new Order({
//       user: req.user.id,
//       orderItems,
//       shippingAddress,
//       paymentMethod,
//       itemsPrice,
//       taxPrice,
//       shippingPrice,
//       totalPrice,
//     });

//     const createdOrder = await order.save();
//     res.status(201).json(createdOrder);
//   }
// });

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
// const getOrderById = asyncHandler(async (req, res) => {
//   const order = await Order.findById(req.params.id).populate("user", "name email");

//   if (order) {
//     res.json(order);
//   } else {
//     res.status(404);
//     throw new Error("Order not found");
//   }
// });

// module.exports = {
//   addOrderItems,
//   getOrderById,
// };
// controllers/orderController.js (updated)

