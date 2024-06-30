import express from 'express';
import { LoginUser, SignUpUser } from '../controllers/user.controller.js'; 
import { upload } from '../middlewares/multer.js';

const router = express.Router();

router.route('/signin').post(LoginUser)
router.route('/signup').post(upload.single('profilePicture'), SignUpUser)

export default router;