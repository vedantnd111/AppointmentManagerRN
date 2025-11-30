/**
 * User Service - Handles all user-related API calls
 */

const BASE_URL = 'http://localhost:8080/api/users';

export interface AddressDTO {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  type: 'HOME' | 'WORK' | 'BUSINESS' | 'OTHER';
}

export interface UserProfileRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER' | 'PREFER_NOT_TO_SAY';
  profilePictureUrl?: string;
  addresses?: AddressDTO[];
}

export interface UserProfileResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER' | 'PREFER_NOT_TO_SAY';
  profilePictureUrl?: string;
  addresses?: AddressDTO[];
  createdAt: string;
  updatedAt: string;
}

export class UserService {
  /**
   * Create a new user
   */
  static async createUser(request: UserProfileRequest): Promise<UserProfileResponse> {
    const response = await fetch(`${BASE_URL}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Failed to create user: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get user by ID
   */
  static async getUserById(id: number): Promise<UserProfileResponse> {
    const response = await fetch(`${BASE_URL}/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get all users
   */
  static async getAllUsers(): Promise<UserProfileResponse[]> {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Update user (full update)
   */
  static async updateUser(id: number, request: UserProfileRequest): Promise<UserProfileResponse> {
    const response = await fetch(`${BASE_URL}/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Failed to update user: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Partial update user
   */
  static async partialUpdateUser(id: number, request: Partial<UserProfileRequest>): Promise<UserProfileResponse> {
    const response = await fetch(`${BASE_URL}/update/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Failed to partially update user: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Delete user
   */
  static async deleteUser(id: number): Promise<void> {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to delete user: ${response.statusText}`);
    }
  }
}
