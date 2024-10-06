import { NextFunction, Request, Response } from 'express';
import UserModel from '../models/UserModel.js';
import { body, check, param, validationResult } from 'express-validator';
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '../errors/customErrors.js';
import mongoose from 'mongoose';
import InvoiceModel from '../models/InvoiceModel.js';

const withValidationErrors = (validateValues: any) => {
  return [
    validateValues,
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith('no job')) {
          throw new NotFoundError(errorMessages[0]);
        }
        if (errorMessages[0].startsWith('not authorized')) {
          throw new UnauthorizedError(errorMessages[0]);
        }
        throw new BadRequestError(errorMessages.join(', '));
      }
      next();
    },
  ];
};

export const validateRegisterInput = withValidationErrors([
  body('name').notEmpty().withMessage('Name is required'),
  body('email')
    .isEmail()
    .withMessage('Invalid email')
    .custom(async (email) => {
      // check if email already exists
      const user = await UserModel.findOne({ email });
      if (user) throw new BadRequestError('Email already exists');
    }),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
]);

export const validLoginInput = withValidationErrors([
  body('email')
    .isEmail()
    .withMessage('Invalid email')
    .notEmpty()
    .withMessage("Email can't be empty"),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must contain at least 8 characters'),
]);

export const validateIdParam = withValidationErrors([
  param('id').custom(async (value) => {
    // check if id in params is valid mongoDb id
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new BadRequestError('Invalid MongoDB ID');

    // check if invoice with such id exists
    const invoice = await InvoiceModel.findById(value);
    if (!invoice) throw new NotFoundError('No invoice with such ID');
  }),
]);
