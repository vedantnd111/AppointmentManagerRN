/**
 * Category Service - Handles all category-related API calls
 */

import { apiClient } from '../utils/apiClient';

export interface CategoryRequest {
  name: string;
  description?: string;
  icon?: string;
  isActive: boolean;
}

export interface CategoryResponse {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export class CategoryService {
  /**
   * Create a new category
   */
  static async createCategory(request: CategoryRequest): Promise<CategoryResponse> {
    return apiClient.post<CategoryResponse>('/categories', request);
  }

  /**
   * Get category by ID
   */
  static async getCategoryById(id: number): Promise<CategoryResponse> {
    return apiClient.get<CategoryResponse>(`/categories/${id}`);
  }

  /**
   * Get all categories
   * @param activeOnly - If true, returns only active categories
   */
  static async getAllCategories(activeOnly: boolean = false): Promise<CategoryResponse[]> {
    const endpoint = activeOnly ? '/categories?activeOnly=true' : '/categories';
    return apiClient.get<CategoryResponse[]>(endpoint);
  }

  /**
   * Update a category
   */
  static async updateCategory(id: number, request: CategoryRequest): Promise<CategoryResponse> {
    return apiClient.put<CategoryResponse>(`/categories/${id}`, request);
  }

  /**
   * Delete a category
   */
  static async deleteCategory(id: number): Promise<void> {
    return apiClient.delete<void>(`/categories/${id}`);
  }
}
