/**
 * User Service - Handles all user-related API calls
 */

import { apiClient } from '../utils/apiClient';

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
        return apiClient.post<UserProfileResponse>('/users/create', request);
    }

    /**
     * Get user by ID
     */
    static async getUserById(id: number): Promise<UserProfileResponse> {
        return apiClient.get<UserProfileResponse>(`/users/${id}`);
    }

    /**
     * Get all users
     */
    static async getAllUsers(): Promise<UserProfileResponse[]> {
        return apiClient.get<UserProfileResponse[]>('/users');
    }

    /**
     * Update user (full update)
     */
    static async updateUser(id: number, request: UserProfileRequest): Promise<UserProfileResponse> {
        return apiClient.put<UserProfileResponse>(`/users/update/${id}`, request);
    }

    /**
     * Partial update user
     */
    static async partialUpdateUser(id: number, request: Partial<UserProfileRequest>): Promise<UserProfileResponse> {
        return apiClient.patch<UserProfileResponse>(`/users/update/${id}`, request);
    }

    /**
     * Delete user
     */
    static async deleteUser(id: number): Promise<void> {
        return apiClient.delete<void>(`/users/${id}`);
    }
}
