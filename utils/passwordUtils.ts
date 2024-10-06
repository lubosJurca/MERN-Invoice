import bcryptjs from 'bcryptjs';

export const hashPassword = async (password: string) => {
  const hashPassword = await bcryptjs.hash(password, 12);
  return hashPassword;
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  const isMatch = await bcryptjs.compare(password, hashedPassword);
  return isMatch;
};
