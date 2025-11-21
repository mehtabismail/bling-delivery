export interface UserRoleCompany {
  id: string;
  title: string;
  status: string;
  isActive?: boolean;
  logo?: string;
  storeLink?: string;
}

export interface UserRole {
  id: string;
  name: string;
  company: UserRoleCompany | null;
}

export interface OwnedCompany {
  id: string;
  title: string;
  status: string;
  logo?: string;
  storeLink?: string;
  language?: string;
  phone?: string;
  address?: string;
  storeEmail?: string;
  policiesEnabled?: boolean;
  createdAt?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  userName: string;
  profileImageUrl?: string | null;
  profileImage?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  phoneNo?: string | null;
  createdAt?: string;
  updatedAt?: string;
  roles?: UserRole[];
  ownedCompany?: OwnedCompany | null;
  currentRole?: string;
  currentCompanyId?: string | null;
}

export interface UpdateProfilePayload {
  firstName?: string;
  lastName?: string;
  phoneNo?: string;
  userName?: string;
  profileImage?: string;
}

export interface UpdatePasswordPayload {
  password: string;
  confirmPassword: string;
}
