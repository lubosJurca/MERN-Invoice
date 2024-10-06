import { Router } from 'express';
import {
  createInvoice,
  deleteInvoice,
  editInvoice,
  editStatus,
  getAllInvoices,
  getSingleInvoice,
} from '../controllers/invoiceController.js';
import { validateIdParam } from '../middleware/validationMiddleware.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { check, param } from 'express-validator';

const router = Router();

router.get('/', verifyToken, getAllInvoices);
router.get('/:id', validateIdParam, getSingleInvoice);
router.post('/createInvoice', verifyToken, createInvoice);

// -----------EDIT INVOICE----------------
router.put(
  '/:id',
  verifyToken,
  [
    param('id')
      .notEmpty()
      .withMessage('Id is required')
      .isMongoId()
      .withMessage('Id is invalid'),
  ],
  editInvoice
);

// -----------EDIT STATUS----------------
router.patch(
  '/:id',
  verifyToken,
  [
    param('id')
      .notEmpty()
      .withMessage('Id is required')
      .isMongoId()
      .withMessage('Id is invalid'),
  ],
  editStatus
);

// -----------DELETE INVOICE----------------
router.delete(
  '/:id',
  verifyToken,
  [param('id').notEmpty().withMessage('Id is required').isMongoId()],
  deleteInvoice
);

export default router;
