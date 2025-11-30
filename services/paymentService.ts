/**
 * Payment Service - Handles all payment-related API calls
 */

const BASE_URL = 'http://localhost:8080/api/payments';

export interface PaymentRequest {
  appointmentId: number;
  amount: number;
  paymentMethod: 'CASH' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'UPI' | 'NET_BANKING';
  transactionId?: string;
}

export interface PaymentResponse {
  id: number;
  appointmentId: number;
  amount: number;
  paymentMethod: 'CASH' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'UPI' | 'NET_BANKING';
  paymentStatus: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
  transactionId?: string;
  paymentDate?: string;
  createdAt: string;
  updatedAt: string;
}

export class PaymentService {
  /**
   * Create a new payment
   */
  static async createPayment(request: PaymentRequest): Promise<PaymentResponse> {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Failed to create payment: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get payment by ID
   */
  static async getPaymentById(id: number): Promise<PaymentResponse> {
    const response = await fetch(`${BASE_URL}/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch payment: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get payment by appointment ID
   */
  static async getPaymentByAppointmentId(appointmentId: number): Promise<PaymentResponse> {
    const response = await fetch(`${BASE_URL}/appointment/${appointmentId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch payment for appointment: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Update payment status
   */
  static async updateStatus(
    id: number,
    status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED'
  ): Promise<PaymentResponse> {
    const response = await fetch(`${BASE_URL}/${id}/status?status=${status}`, {
      method: 'PATCH',
    });

    if (!response.ok) {
      throw new Error(`Failed to update payment status: ${response.statusText}`);
    }

    return response.json();
  }
}
