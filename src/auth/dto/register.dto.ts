import UserRole from 'src/common/enums/UserRole';

export class RegisterDto {
  phoneNumber: string;
  password: string;
  name: boolean;
  location: string;
  balance?: number;
  status?: boolean;
  role?: UserRole;
  email?: string;
  city: string;
  clients: string[];
  shopAddress?: string;
  shopName?: string;
  type?: string;
}
