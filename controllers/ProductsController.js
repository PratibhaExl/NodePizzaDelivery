import productmodel from "../models/ProductModel.js"
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

// const AddProduct = async (req, res) => {
    
//     try{
//         if(req.file!==undefined){
//         const requestedBody=req.body;
//        const url=req.protocol+'://'+req.get('host')+'/images/'+req.file.filename;
//        const formData={...requestedBody,'imagePath':url}
//         const product=new productmodel(formData);
//          await product.save();
//          res.json({"err":0,"msg":"Product Added"})
//         }
//         else{
//             res.json({"err":1,"msg":"Something went wrong or already exists"});
//         }
//     }
//     catch(err){
//       res.json({"err":1,"msg":"Something went wrong or already exists"});
//     }
// }
const UpdateProduct = async (req, res) => {
    const id=req.params.id;
    const requestedBody=req.body;
    try{
      const updateproduct=await productmodel.findByIdAndUpdate(id,requestedBody);
      res.json({"err":0,"msg":"Product Updated"});
    }
    catch(err){
        res.json({"err":1,"msg":"Something went wrong"})
    }
}
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