// Centralized backend communication layer for .NET Clean Architecture API
// Forwards requests to the .NET Web API if available, or seamlessly provides in-memory persistence in preview mode.

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  bio?: string;
  avatarUrl?: string;
  role: string;
  isActive: boolean;
  createdAtUtc: string;
  updatedAtUtc?: string;
  lastLoginAtUtc?: string;
}

export interface AuthResponse {
  token: string;
  tokenType: string;
  expiresInMinutes: number;
  user: UserProfile;
}

function getDotnetApiUrl(): string {
  let url = (process.env.DOTNET_API_URL || 'http://localhost:5000').trim();
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = `https://${url}`;
  }
  return url.replace(/\/+$/, '');
}

// In-memory fallback database for the AI Studio preview environment
interface StoredUser extends UserProfile {
  passwordHash: string;
}

// Global variable across hot-reloads
const globalForAuth = globalThis as unknown as {
  _inMemoryUsers?: StoredUser[];
};

if (!globalForAuth._inMemoryUsers) {
  globalForAuth._inMemoryUsers = [
    {
      id: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
      fullName: 'Aris Prasetyo',
      email: 'aris.traveler@wanderlush.com',
      passwordHash: 'Bromo2026!',
      phoneNumber: '+62 812-3456-7890',
      bio: 'Bromo caldera explorer, mountain photographer, and highland trekker.',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      role: 'Traveler',
      isActive: true,
      createdAtUtc: new Date('2024-01-15T08:00:00Z').toISOString(),
      lastLoginAtUtc: new Date().toISOString()
    }
  ];
}

const inMemoryUsers = globalForAuth._inMemoryUsers;

function createMockJwt(userId: string): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({ sub: userId, exp: Math.floor(Date.now() / 1000) + 28800 })).toString('base64url');
  const signature = Buffer.from(`mock_sig_${userId}_${Date.now()}`).toString('base64url');
  return `${header}.${payload}.${signature}`;
}

function parseUserIdFromToken(token: string): string | null {
  try {
    const parts = token.replace('Bearer ', '').trim().split('.');
    if (parts.length >= 2) {
      const payloadJson = Buffer.from(parts[1], 'base64url').toString('utf-8');
      const payload = JSON.parse(payloadJson);
      return payload.sub || null;
    }
    return null;
  } catch {
    return null;
  }
}

// 1. Register User (Signup)
export async function apiRegister(data: { fullName: string; email: string; password: string; phoneNumber?: string }): Promise<AuthResponse> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);
    const res = await fetch(`${getDotnetApiUrl()}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (res.ok) {
      return await res.json();
    }
    if (res.status === 400 || res.status === 409) {
      const err = await res.json().catch(() => ({ message: 'Registration failed' }));
      throw new Error(err.message || 'Registration failed');
    }
  } catch (err: unknown) {
    if (err instanceof Error && err.name !== 'AbortError' && !err.message.includes('fetch failed') && !err.message.includes('ECONNREFUSED')) {
      throw err;
    }
  }

  // Fallback to in-memory store
  const normalizedEmail = data.email.trim().toLowerCase();
  const existing = inMemoryUsers.find(u => u.email.toLowerCase() === normalizedEmail);
  if (existing) {
    throw new Error('An account with this email address already exists.');
  }

  const newUser: StoredUser = {
    id: crypto.randomUUID(),
    fullName: data.fullName.trim(),
    email: normalizedEmail,
    passwordHash: data.password,
    phoneNumber: data.phoneNumber?.trim() || '+62 812-3456-7890',
    bio: 'Caldera traveler and Bromo enthusiast.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    role: 'Traveler',
    isActive: true,
    createdAtUtc: new Date().toISOString(),
    lastLoginAtUtc: new Date().toISOString()
  };

  inMemoryUsers.push(newUser);
  const token = createMockJwt(newUser.id);

  const { passwordHash: _, ...userDto } = newUser;
  return {
    token,
    tokenType: 'Bearer',
    expiresInMinutes: 480,
    user: userDto
  };
}

// 2. Login User
export async function apiLogin(data: { email: string; password: string }): Promise<AuthResponse> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);
    const res = await fetch(`${getDotnetApiUrl()}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (res.ok) {
      return await res.json();
    }
    if (res.status === 401 || res.status === 400) {
      const err = await res.json().catch(() => ({ message: 'Invalid email or password' }));
      throw new Error(err.message || 'Invalid email or password');
    }
  } catch (err: unknown) {
    if (err instanceof Error && err.name !== 'AbortError' && !err.message.includes('fetch failed') && !err.message.includes('ECONNREFUSED')) {
      throw err;
    }
  }

  // Fallback to in-memory store
  const normalizedEmail = data.email.trim().toLowerCase();
  const user = inMemoryUsers.find(u => u.email.toLowerCase() === normalizedEmail && u.isActive);
  if (!user || user.passwordHash !== data.password) {
    throw new Error('Invalid email or password.');
  }

  user.lastLoginAtUtc = new Date().toISOString();
  const token = createMockJwt(user.id);

  const { passwordHash: _, ...userDto } = user;
  return {
    token,
    tokenType: 'Bearer',
    expiresInMinutes: 480,
    user: userDto
  };
}

// 3. Get Current User Profile (Read/View)
export async function apiGetProfile(token: string): Promise<UserProfile> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);
    const res = await fetch(`${getDotnetApiUrl()}/api/users/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`
      },
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (res.ok) {
      return await res.json();
    }
  } catch (err: unknown) {
    // Continue to fallback
  }

  // Fallback
  const userId = parseUserIdFromToken(token);
  const user = inMemoryUsers.find(u => (userId ? u.id === userId : true) && u.isActive) || inMemoryUsers[0];
  if (!user || !user.isActive) {
    throw new Error('User not found or session expired.');
  }

  const { passwordHash: _, ...userDto } = user;
  return userDto;
}

// 4. Update Profile
export async function apiUpdateProfile(
  token: string,
  data: { fullName: string; phoneNumber?: string; bio?: string; avatarUrl?: string }
): Promise<UserProfile> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);
    const res = await fetch(`${getDotnetApiUrl()}/api/users/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`
      },
      body: JSON.stringify(data),
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (res.ok) {
      return await res.json();
    }
    const err = await res.json().catch(() => ({ message: 'Failed to update profile' }));
    throw new Error(err.message || 'Failed to update profile');
  } catch (err: unknown) {
    if (err instanceof Error && !err.message.includes('fetch failed') && !err.message.includes('ECONNREFUSED')) {
      throw err;
    }
  }

  // Fallback
  const userId = parseUserIdFromToken(token);
  const user = inMemoryUsers.find(u => (userId ? u.id === userId : true) && u.isActive) || inMemoryUsers[0];
  if (!user) {
    throw new Error('User not found.');
  }

  user.fullName = data.fullName.trim();
  if (data.phoneNumber !== undefined) user.phoneNumber = data.phoneNumber.trim();
  if (data.bio !== undefined) user.bio = data.bio.trim();
  if (data.avatarUrl !== undefined) user.avatarUrl = data.avatarUrl.trim();
  user.updatedAtUtc = new Date().toISOString();

  const { passwordHash: _, ...userDto } = user;
  return userDto;
}

// 5. Change Password
export async function apiChangePassword(
  token: string,
  data: { currentPassword: string; newPassword: string }
): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);
    const res = await fetch(`${getDotnetApiUrl()}/api/users/change-password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`
      },
      body: JSON.stringify(data),
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (res.ok) {
      return true;
    }
    const err = await res.json().catch(() => ({}));
    const errorMsg = (err as any).message 
      || ((err as any).errors ? Object.values((err as any).errors).flat()[0] as string : null)
      || (err as any).title 
      || 'Current password is incorrect';
    throw new Error(errorMsg);
  } catch (err: unknown) {
    if (err instanceof Error && !err.message.includes('fetch failed') && !err.message.includes('ECONNREFUSED')) {
      throw err;
    }
  }

  // Fallback
  const userId = parseUserIdFromToken(token);
  const user = inMemoryUsers.find(u => (userId ? u.id === userId : true) && u.isActive) || inMemoryUsers[0];
  if (!user || user.passwordHash !== data.currentPassword) {
    throw new Error('Current password is incorrect.');
  }

  user.passwordHash = data.newPassword;
  user.updatedAtUtc = new Date().toISOString();
  return true;
}

// 6. Delete Account
export async function apiDeleteAccount(token: string): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);
    const res = await fetch(`${getDotnetApiUrl()}/api/users/account`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`
      },
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (res.ok) {
      return true;
    }
  } catch (err: unknown) {
    // Continue to fallback
  }

  // Fallback
  const userId = parseUserIdFromToken(token);
  const index = inMemoryUsers.findIndex(u => (userId ? u.id === userId : false));
  if (index !== -1) {
    inMemoryUsers.splice(index, 1);
  }
  return true;
}
