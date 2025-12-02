/**
 * Favorite Service - Handles all favorite-related API calls
 */

import { apiClient } from '../utils/apiClient';

export interface FavoriteRequest {
  userId: number;
  vendorId: number;
}

export interface FavoriteResponse {
  id: number;
  userId: number;
  vendorId: number;
  createdAt: string;
}

export class FavoriteService {
  /**
   * Add a vendor to favorites
   */
  static async addFavorite(request: FavoriteRequest): Promise<FavoriteResponse> {
    return apiClient.post<FavoriteResponse>('/favorites', request);
  }

  /**
   * Get all favorites for a specific user
   */
  static async getUserFavorites(userId: number): Promise<FavoriteResponse[]> {
    return apiClient.get<FavoriteResponse[]>(`/favorites/user/${userId}`);
  }

  /**
   * Remove a favorite
   */
  static async removeFavorite(id: number): Promise<void> {
    return apiClient.delete<void>(`/favorites/${id}`);
  }
}
