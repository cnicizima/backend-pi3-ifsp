import express from 'express';
import listProductController from '../controllers/products/listProductController.js';
import createProductController from '../controllers/products/createProductController.js';   

const router = express.Router();


router.get('/', listProductController);
router.post('/', createProductController);


export default router;