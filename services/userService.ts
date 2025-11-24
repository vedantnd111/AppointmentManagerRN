/**
 * User Service - Handles all user-related API calls
 * Currently using mock data, ready to integrate with real backend API
 */

import { UserLocation, UserProfile, ApiResponse } from '../types/types';

/**
 * Mock data for user location
 */
const MOCK_USER_LOCATION: UserLocation = {
    id: '1',
    type: 'home',
    label: 'Home',
    address: '201, 2 Floor, Tower A3, Alpine Heights, Sector 22, Vashi',
    isDefault: true,
};

/**
 * Mock data for user profile
 */
const MOCK_USER_PROFILE: UserProfile = {
    id: 'user-123',
    name: 'Vedant Deshpande',
    email: 'vedant@example.com',
    phone: '+91 98765 43210',
    initial: 'V',
};

/**
 * Simulates network delay for realistic API behavior
 */
const simulateNetworkDelay = (ms: number = 500): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * UserService class - Contains all user-related API methods
 */
export class UserService {
    private static baseUrl = 'https://api.appointmentmanager.com/v1'; // Placeholder for real API

    /**
     * Fetches the user's default or selected location
     * @returns Promise with user location data
     */
    static async getUserLocation(): Promise<ApiResponse<UserLocation>> {
        try {
            // TODO: Replace with actual API call
            // const response = await fetch(`${this.baseUrl}/user/location`);
            // const data = await response.json();

            // Simulate network delay
            await simulateNetworkDelay(300);

            // Return mock data
            return {
                success: true,
                data: MOCK_USER_LOCATION,
                message: 'Location fetched successfully',
            };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to fetch location',
            };
        }
    }

    /**
     * Fetches the user's profile information
     * @returns Promise with user profile data
     */
    static async getUserProfile(): Promise<ApiResponse<UserProfile>> {
        try {
            // TODO: Replace with actual API call
            // const response = await fetch(`${this.baseUrl}/user/profile`);
            // const data = await response.json();

            // Simulate network delay
            await simulateNetworkDelay(400);

            // Return mock data
            return {
                success: true,
                data: MOCK_USER_PROFILE,
                message: 'Profile fetched successfully',
            };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to fetch profile',
            };
        }
    }

    /**
     * Updates the user's default location
     * @param locationId - ID of the location to set as default
     * @returns Promise with updated location data
     */
    static async updateDefaultLocation(locationId: string): Promise<ApiResponse<UserLocation>> {
        try {
            // TODO: Replace with actual API call
            await simulateNetworkDelay(500);

            return {
                success: true,
                data: MOCK_USER_LOCATION,
                message: 'Default location updated',
            };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Failed to update location',
            };
        }
    }
}
