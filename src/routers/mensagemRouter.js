import express from 'express';
import createMensagemController from '../controllers/mensagem/createMensagemController.js';
import listMensagemController from '../controllers/mensagem/listMensagemController.js';
import getMensagemController from '../controllers/mensagem/getMensagemController.js';
import updateMensagemController from '../controllers/mensagem/updateMensagemController.js';
import deleteMensagemController from '../controllers/mensagem/deleteMensagemController.js';

const router = express.Router();

router.get('/', listMensagemController);
router.get('/:id', getMensagemController);
router.post('/', createMensagemController);
router.put('/:id', updateMensagemController);
router.delete('/:id', deleteMensagemController);

export default router;
