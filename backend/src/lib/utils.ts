import * as bcrypt from 'bcryptjs';
export async function getHashedPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt();
  if (!/^\$2[abxy]?\$\d+\$/.test(password)) {
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
  return password;
}

export async function comparePassword(
  password: string,
  hashedPassword: string,
) {
  if (await bcrypt.compare(password, hashedPassword)) {
    return true;
  }
  return false;
}

export const thirtyDaysFromNow = () => Date.now() + 30 * 24 * 60 * 60 * 1000;

export const fifteenMinutesFromNow = () => Date.now() + 5;

export const threeHourFromNow = () => Date.now() + 60 * 60 * 1000 * 3;

export const fiveMinutesAgo = () => new Date(Date.now() - 5 * 60 * 1000);

export const oneHourFromNow = () => new Date(Date.now() + 60 * 60 * 1000);

export const ONE_DAY_MS = 24 * 60 * 60 * 1000;
