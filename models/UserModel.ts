import mongoose from 'mongoose';

export type UserType = {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
};

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<UserType>('User', UserSchema);
