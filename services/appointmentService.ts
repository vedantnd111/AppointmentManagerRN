/**
 * Appointment Service - Handles all appointment-related API calls
 */

import { apiClient } from '../utils/apiClient';

export interface AppointmentRequest {
  userId: number;
  serviceId: number;
  appointmentDate: string;
  appointmentTime: string;
  notes?: string;
}

export interface AppointmentResponse {
  id: number;
  userId: number;
  serviceId: number;
  appointmentDate: string;
  appointmentTime: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export class AppointmentService {
  /**
   * Create a new appointment
   */
  static async createAppointment(request: AppointmentRequest): Promise<AppointmentResponse> {
    return apiClient.post<AppointmentResponse>('/appointments', request);
  }

  /**
   * Get appointment by ID
   */
  static async getAppointmentById(id: number): Promise<AppointmentResponse> {
    return apiClient.get<AppointmentResponse>(`/appointments/${id}`);
  }

  /**
   * Get all appointments for a specific user
   */
  static async getAppointmentsByUser(userId: number): Promise<AppointmentResponse[]> {
    return apiClient.get<AppointmentResponse[]>(`/appointments/user/${userId}`);
  }

  /**
   * Get all appointments for a specific vendor
   */
  static async getAppointmentsByVendor(vendorId: number): Promise<AppointmentResponse[]> {
    return apiClient.get<AppointmentResponse[]>(`/appointments/vendor/${vendorId}`);
  }

  /**
   * Update appointment status
   */
  static async updateStatus(
    id: number,
    status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'
  ): Promise<AppointmentResponse> {
    return apiClient.patch<AppointmentResponse>(`/appointments/${id}/status?status=${status}`);
  }

  /**
   * Cancel an appointment
   */
  static async cancelAppointment(id: number): Promise<void> {
    return apiClient.delete<void>(`/appointments/${id}`);
  }
}
