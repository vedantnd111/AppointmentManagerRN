/**
 * Service Service - Handles all service-related API calls
 */

import { apiClient } from '../utils/apiClient';

export interface ServiceRequest {
  name: string;
  description?: string;
  price: number;
  duration: number;
  vendorId: number;
  categoryId: number;
  isActive: boolean;
}

export interface ServiceResponse {
  id: number;
  name: string;
  description?: string;
  price: number;
  duration: number;
  vendorId: number;
  categoryId: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export class ServiceService {
  /**
   * Create a new service
   */
  static async createService(request: ServiceRequest): Promise<ServiceResponse> {
    return apiClient.post<ServiceResponse>('/services', request);
  }

  /**
   * Get service by ID
   */
  static async getServiceById(id: number): Promise<ServiceResponse> {
    return apiClient.get<ServiceResponse>(`/services/${id}`);
  }

  /**
   * Get all services
   * @param vendorId - Optional filter by vendor ID
   * @param categoryId - Optional filter by category ID
   */
  static async getAllServices(
    vendorId?: number,
    categoryId?: number
  ): Promise<ServiceResponse[]> {
    const params = new URLSearchParams();

    if (vendorId) {
      params.append('vendorId', vendorId.toString());
    }
    if (categoryId) {
      params.append('categoryId', categoryId.toString());
    }

    const endpoint = params.toString()
      ? `/services?${params.toString()}`
      : '/services';

    return apiClient.get<ServiceResponse[]>(endpoint);
  }

  /**
   * Update a service
   */
  static async updateService(id: number, request: ServiceRequest): Promise<ServiceResponse> {
    return apiClient.put<ServiceResponse>(`/services/${id}`, request);
  }

  /**
   * Delete a service
   */
  static async deleteService(id: number): Promise<void> {
    return apiClient.delete<void>(`/services/${id}`);
  }
}
