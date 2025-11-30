/**
 * Favorite Service - Handles all favorite-related API calls
 */

const BASE_URL = 'http://localhost:8080/api/favorites';

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
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Failed to add favorite: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get all favorites for a specific user
   */
  static async getUserFavorites(userId: number): Promise<FavoriteResponse[]> {
    const response = await fetch(`${BASE_URL}/user/${userId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch user favorites: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Remove a favorite
   */
  static async removeFavorite(id: number): Promise<void> {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to remove favorite: ${response.statusText}`);
    }
  }
}
