/**
 * Appointment Service - Handles all appointment-related API calls
 */

const BASE_URL = 'http://localhost:8080/api/appointments';

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
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Failed to create appointment: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get appointment by ID
   */
  static async getAppointmentById(id: number): Promise<AppointmentResponse> {
    const response = await fetch(`${BASE_URL}/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch appointment: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get all appointments for a specific user
   */
  static async getAppointmentsByUser(userId: number): Promise<AppointmentResponse[]> {
    const response = await fetch(`${BASE_URL}/user/${userId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch user appointments: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get all appointments for a specific vendor
   */
  static async getAppointmentsByVendor(vendorId: number): Promise<AppointmentResponse[]> {
    const response = await fetch(`${BASE_URL}/vendor/${vendorId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch vendor appointments: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Update appointment status
   */
  static async updateStatus(
    id: number,
    status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'
  ): Promise<AppointmentResponse> {
    const response = await fetch(`${BASE_URL}/${id}/status?status=${status}`, {
      method: 'PATCH',
    });

    if (!response.ok) {
      throw new Error(`Failed to update appointment status: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Cancel an appointment
   */
  static async cancelAppointment(id: number): Promise<void> {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to cancel appointment: ${response.statusText}`);
    }
  }
}
