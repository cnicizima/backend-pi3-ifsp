import express from 'express'
import getUserController from '../controllers/Users/getUserController.js';

const router = express.Router();

router.get('/', getUserController);

export default router;