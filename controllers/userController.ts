import { Response, Request } from 'express';

import UserModel from '../models/UserModel';

export const getCurrentUser = async (req: Request, res: Response) => {
  const userId = req.userId;

  try {
    const user = await UserModel.findById(userId).select('-password');
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error on the server' });
  }
};
