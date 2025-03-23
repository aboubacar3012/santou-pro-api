import * as bcrypt from 'bcrypt';

export const roundsOfHashing = 10;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, roundsOfHashing);
}

export const commonPasswords = {
  admin: 'admin123',
  user: 'user123',
};
