/**
 * Vendor Service - Handles all vendor-related API calls
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

export interface VendorProfileRequest {
  businessName: string;
  ownerName: string;
  email: string;
  phoneNumber: string;
  bio?: string;
  profilePictureUrl?: string;
  address?: AddressDTO;
  categoryId: number;
  isActive: boolean;
}

export interface VendorProfileResponse {
  id: number;
  businessName: string;
  ownerName: string;
  email: string;
  phoneNumber: string;
  bio?: string;
  profilePictureUrl?: string;
  address?: AddressDTO;
  categoryId: number;
  isActive: boolean;
  averageRating?: number;
  totalReviews?: number;
  createdAt: string;
  updatedAt: string;
}

export interface VendorAvailabilityRequest {
  dayOfWeek: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface VendorAvailabilityResponse {
  id: number;
  vendorId: number;
  dayOfWeek: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export class VendorService {
  /**
   * Create a new vendor
   */
  static async createVendor(request: VendorProfileRequest): Promise<VendorProfileResponse> {
    return apiClient.post<VendorProfileResponse>('/vendors', request);
  }

  /**
   * Get vendor by ID
   */
  static async getVendorById(id: number): Promise<VendorProfileResponse> {
    return apiClient.get<VendorProfileResponse>(`/vendors/${id}`);
  }

  /**
   * Get all vendors
   * @param categoryId - Optional filter by category ID
   */
  static async getAllVendors(categoryId?: number): Promise<VendorProfileResponse[]> {
    const endpoint = categoryId
      ? `/vendors?categoryId=${categoryId}`
      : '/vendors';
    return apiClient.get<VendorProfileResponse[]>(endpoint);
  }

  /**
   * Update a vendor
   */
  static async updateVendor(id: number, request: VendorProfileRequest): Promise<VendorProfileResponse> {
    return apiClient.put<VendorProfileResponse>(`/vendors/${id}`, request);
  }

  /**
   * Delete a vendor
   */
  static async deleteVendor(id: number): Promise<void> {
    return apiClient.delete<void>(`/vendors/${id}`);
  }

  /**
   * Add availability for a vendor
   */
  static async addAvailability(
    vendorId: number,
    request: VendorAvailabilityRequest
  ): Promise<VendorAvailabilityResponse> {
    return apiClient.post<VendorAvailabilityResponse>(
      `/vendors/${vendorId}/availability`,
      request
    );
  }

  /**
   * Get vendor availability
   */
  static async getVendorAvailability(vendorId: number): Promise<VendorAvailabilityResponse[]> {
    return apiClient.get<VendorAvailabilityResponse[]>(`/vendors/${vendorId}/availability`);
  }

  /**
   * Update vendor availability
   */
  static async updateAvailability(
    vendorId: number,
    availabilityId: number,
    request: VendorAvailabilityRequest
  ): Promise<VendorAvailabilityResponse> {
    return apiClient.put<VendorAvailabilityResponse>(
      `/vendors/${vendorId}/availability/${availabilityId}`,
      request
    );
  }
}
