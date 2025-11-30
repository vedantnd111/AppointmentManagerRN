/**
 * Service Service - Handles all service-related API calls
 */

const BASE_URL = 'http://localhost:8080/api/services';

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
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Failed to create service: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get service by ID
   */
  static async getServiceById(id: number): Promise<ServiceResponse> {
    const response = await fetch(`${BASE_URL}/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch service: ${response.statusText}`);
    }

    return response.json();
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
    let url = BASE_URL;
    const params = new URLSearchParams();

    if (vendorId) {
      params.append('vendorId', vendorId.toString());
    }
    if (categoryId) {
      params.append('categoryId', categoryId.toString());
    }

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch services: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Update a service
   */
  static async updateService(id: number, request: ServiceRequest): Promise<ServiceResponse> {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Failed to update service: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Delete a service
   */
  static async deleteService(id: number): Promise<void> {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to delete service: ${response.statusText}`);
    }
  }
}
