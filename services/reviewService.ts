/**
 * Review Service - Handles all review-related API calls
 */

const BASE_URL = 'http://localhost:8080/api/reviews';

export interface ReviewRequest {
  userId: number;
  vendorId: number;
  appointmentId: number;
  rating: number;
  comment?: string;
}

export interface ReviewResponse {
  id: number;
  userId: number;
  vendorId: number;
  appointmentId: number;
  rating: number;
  comment?: string;
  createdAt: string;
  updatedAt: string;
}

export class ReviewService {
  /**
   * Create a new review
   */
  static async createReview(request: ReviewRequest): Promise<ReviewResponse> {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Failed to create review: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get review by ID
   */
  static async getReviewById(id: number): Promise<ReviewResponse> {
    const response = await fetch(`${BASE_URL}/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch review: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get all reviews for a specific vendor
   */
  static async getReviewsByVendor(vendorId: number): Promise<ReviewResponse[]> {
    const response = await fetch(`${BASE_URL}/vendor/${vendorId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch vendor reviews: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get all reviews by a specific user
   */
  static async getReviewsByUser(userId: number): Promise<ReviewResponse[]> {
    const response = await fetch(`${BASE_URL}/user/${userId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch user reviews: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Update a review
   */
  static async updateReview(id: number, request: ReviewRequest): Promise<ReviewResponse> {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Failed to update review: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Delete a review
   */
  static async deleteReview(id: number): Promise<void> {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to delete review: ${response.statusText}`);
    }
  }
}
