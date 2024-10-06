import { Request, Response, Router } from 'express';
import { loginUser, logoutUser } from '../controllers/authController.js';
import { check } from 'express-validator';
import { verifyToken } from '../middleware/authMiddleware.js';
const router = Router();

//  -----------LOGIN USER -----------------
router.post(
  '/login',
  [check('email').isEmail(), check('password').isLength({ min: 8 })],
  loginUser
);

// ----------VALIDATE TOKEN -----------------
router.get('/validate-token', verifyToken, (req: Request, res: Response) => {
  res.status(200).send({ userId: req.userId });
});

// ----------LOGOUT USER -----------------
router.post('/logout', logoutUser);

export default router;
