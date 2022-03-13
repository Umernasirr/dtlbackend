import UserRole from 'src/common/enums/UserRole';

export class RegisterDto {
  phoneNumber: string;
  password: string;
  balance?: number;
  status?: boolean;
  role?: UserRole;
  name: boolean;
}
