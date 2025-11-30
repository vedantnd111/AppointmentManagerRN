/**
 * Notification Service - Handles all notification-related API calls
 */

const BASE_URL = 'http://localhost:8080/api/notifications';

export interface NotificationResponse {
  id: number;
  userId: number;
  type: 'APPOINTMENT_REMINDER' | 'APPOINTMENT_CONFIRMATION' | 'APPOINTMENT_CANCELLATION' | 'PAYMENT_CONFIRMATION' | 'SYSTEM_NOTIFICATION';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export class NotificationService {
  /**
   * Get all notifications for a specific user
   * @param userId - User ID
   * @param unreadOnly - If true, returns only unread notifications
   */
  static async getUserNotifications(
    userId: number,
    unreadOnly: boolean = false
  ): Promise<NotificationResponse[]> {
    const url = unreadOnly
      ? `${BASE_URL}/user/${userId}?unreadOnly=true`
      : `${BASE_URL}/user/${userId}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch notifications: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Mark a notification as read
   */
  static async markAsRead(id: number): Promise<void> {
    const response = await fetch(`${BASE_URL}/${id}/read`, {
      method: 'PATCH',
    });

    if (!response.ok) {
      throw new Error(`Failed to mark notification as read: ${response.statusText}`);
    }
  }

  /**
   * Delete a notification
   */
  static async deleteNotification(id: number): Promise<void> {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to delete notification: ${response.statusText}`);
    }
  }
}
