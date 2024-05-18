import express from 'express';
import { AddProduct, DeleteProduct, GetAllProducts, UpdateProduct, getAllCategory, getProductById, placeOrder, getOrdersByUser,
    updateOrderStatus,
    getAllOrders
} from '../controllers/ProductsController.js';
import verifyToken from '../middlewares/authJWT.js';
import uploadFile from '../fileupload.js';
const router=express.Router();
router.get("/getallproducts",GetAllProducts);
router.get("/getproductbyid/:id",getProductById);
router.get("/getcategories",getAllCategory);
router.post("/addproduct",uploadFile.single('attach'),AddProduct);
router.put("/updateproduct/:id",UpdateProduct);
router.delete("/deleteproduct/:id",DeleteProduct);
router.post("/getallorders",getAllOrders);
router.post("/placeorder",placeOrder);
router.post("/myorders",getOrdersByUser);
router.post('/updateOrderStatus', updateOrderStatus);

export default router;