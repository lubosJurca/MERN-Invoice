import { Router } from 'express';
import { getCurrentUser } from '../controllers/userController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { check } from 'express-validator';
import { registerUser } from '../controllers/authController.js';

const router = Router();

// ----------REGISTER USER -----------------
router.post(
  '/register',
  [
    check('name').notEmpty(),
    check('email').isEmail(),
    check('password').isLength({ min: 8 }),
  ],
  registerUser
);

//   -------- GET CURRENT USER -----------
router.get('/me', verifyToken, getCurrentUser);

export default router;
