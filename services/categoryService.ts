/**
 * Category Service - Handles all category-related API calls
 */

const BASE_URL = 'http://localhost:8080/api/categories';

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
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Failed to create category: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get category by ID
   */
  static async getCategoryById(id: number): Promise<CategoryResponse> {
    const response = await fetch(`${BASE_URL}/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch category: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get all categories
   * @param activeOnly - If true, returns only active categories
   */
  static async getAllCategories(activeOnly: boolean = false): Promise<CategoryResponse[]> {
    const url = activeOnly ? `${BASE_URL}?activeOnly=true` : BASE_URL;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Update a category
   */
  static async updateCategory(id: number, request: CategoryRequest): Promise<CategoryResponse> {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Failed to update category: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Delete a category
   */
  static async deleteCategory(id: number): Promise<void> {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to delete category: ${response.statusText}`);
    }
  }
}
