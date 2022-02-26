import { User } from 'src/models/UserSchema';

const sanitizeUser = (user: User) => {
  const sanitized = user.toObject();
  delete sanitized['password'];
  return sanitized;
};

export default sanitizeUser;
