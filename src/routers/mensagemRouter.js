import express from 'express';
import createMensagemController from '../controllers/mensagem/createMensagemController.js';
import listMensagemController from '../controllers/mensagem/listMensagemController.js';
import getMensagemController from '../controllers/mensagem/getMensagemController.js';
import updateMensagemController from '../controllers/mensagem/updateMensagemController.js';
import deleteMensagemController from '../controllers/mensagem/deleteMensagemController.js';

const router = express.Router();

router.get('/', listMensagemController);
router.get('/:idMensagem', getMensagemController);
router.post('/', createMensagemController);
router.put('/:idMensagem', updateMensagemController);
router.delete('/:idMensagem', deleteMensagemController);

export default router;
