import * as bcrypt from '@node-rs/bcrypt';

export const hashingPassword = async (password: string): Promise<string> => {
  const salt = 10;

  return bcrypt.hash(password, salt);
};

export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(plainPassword, hashedPassword);
};
