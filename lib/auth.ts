import User from '../models/User';

export async function authenticate(username: string, password: string) {
  const user = await User.findOne({ where: { username } });
  if (!user) return null;

  const isValid = await user.checkPassword(password);
  return isValid ? user : null;
}
