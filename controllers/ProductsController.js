import productmodel from "../models/ProductModel.js";
import OrderModel from '../models/OrderModel.js';

const GetAllProducts = async (req, res) => {
   try{
        const products=await productmodel.find();
        res.json({"err":0,"prodata":products});
   }
   catch(err){
    res.json({"err":1,"msg":"Something went wrong"})
}
}
const getAllCategory=async (req,res)=>{
    try{
       const categories=await productmodel.find().select("category").distinct("category");
       res.json({"err":0,"categories":categories});
    }
    catch(err){
        res.json({"err":1,"msg":"Something went wrong"})
    }
}
const getProductById=async (req,res)=>{
    try{
        let pid=req.params.id;
        let product=await productmodel.findById(pid);
        res.json({"err":0,"productdata":product})
    }
    catch(err){
        res.json({"err":1,"msg":"Something went wrong"})
    }
}
const AddProduct = async (req, res) => {
    try {
        if (req.file !== undefined) {
            const requestedBody = req.body;
            // Construct the URL for the uploaded image
            const url = req.protocol + '://' + req.get('host') + '/uploads/' + req.file.filename;
            // Combine the requested body with the image URL
            const formData = { ...requestedBody, 'imagePath': url };
            // Create a new product instance with the combined data
            const product = new productmodel(formData);
            // Save the product to the database
            await product.save();
            // Respond with a success message and the image URL
            res.json({ "err": 0, "msg": "Product Added", "imagePath": url });
        } else {
            // Respond with an error message if no file was uploaded
            res.json({ "err": 1, "msg": "No file uploaded" });
        }
    } catch (err) {
        // Respond with an error message if something goes wrong
        console.error(err);
        res.status(500).json({ "err": 1, "msg": "Something went wrong" });
    }
}

const UpdateProduct = async (req, res) => {
    const id = req.params.id;
    const requestedBody = req.body;

    try {
        // Use findByIdAndUpdate with { new: true } to return the updated document
        const updatedProduct = await productmodel.findByIdAndUpdate(id, requestedBody, { new: true, runValidators: true });

        if (!updatedProduct) {
            return res.status(404).json({ "err": 1, "msg": "Product not found" });
        }

        res.json({ "err": 0, "msg": "Product Updated", "product": updatedProduct });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ "err": 1, "msg": "Something went wrong" });
    }
};

export const placeOrder = async (req, res) => {
    const { email, fullname, role, cartItems, totalPrice,orderStatus } = req.body;

    try {
        // Create a new order instance
        const newOrder = new OrderModel({
            email,
            fullname,
            role,
            cartItems,
            totalPrice,
            orderStatus,
        });

        // Save the order to the database
        const savedOrder = await newOrder.save();

        // Respond with success message and the saved order
        res.status(201).json({ err: 0, status:'Success', msg: 'Order placed successfully', order: savedOrder });
    } catch (error) {
        // Handle error if order placement fails
        console.error(error);
        res.status(500).json({ err: 1, msg: 'Failed to place order' });
    }
};

export const getOrdersByUser = async (req, res) => {
    const { email, role } = req.body;

    try {
        const orders = await OrderModel.find({ email, role}); // Users see only their orders
        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }

};

export const getAllOrders = async (req, res) => {
    const { email, role } = req.body;
    try {
        if(role === 'admin'){
        const orders = await OrderModel.find(); // admin can see all orders
        res.status(200).json({ orders });
        }else{
            res.json({ "err": 1, "msg": "Admin Rights Only"});
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch all orders' });
    }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
    const { orderId, status } = req.body;

    try {
        const order = await OrderModel.findByIdAndUpdate(orderId, { orderStatus:status }, { new: true });
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json({ message: 'Order status updated', order });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update order status' });
    }
};

const DeleteProduct = async (req, res) => {
    try{
         let id=req.params.id;
         const product=await productmodel.findByIdAndDelete(id);
         if(!product){
            res.json({"err":1,"msg":"Product Not found"});
         }
         else{
            res.json({"err":0,"msg":"Product Deleted"});
         }
    }
    catch(err){
        res.json({"err":1,"msg":"Something went wrong"})
    }

}
export { GetAllProducts, AddProduct, UpdateProduct, DeleteProduct,getProductById,getAllCategory };