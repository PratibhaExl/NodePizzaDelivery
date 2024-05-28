
import express from 'express';
import { updateProfile
} from '../controllers/ProfileController.js';
import verifyToken from '../middlewares/authJWT.js';
import uploadFile from '../profileupload.js';


// import verifyToken from '../middlewares/authJWT.js';
const router=express.Router();

// router.post("/updateprofile",uploadFile.single('attach'),updateProfile);


export default router;