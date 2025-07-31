const API_BASE_URL = '/api/bookings';

export async function fetchBookings() {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch bookings');
  }
  return response.json();
}

export async function updateBooking(bookingId, updatedData) {
  const response = await fetch(`${API_BASE_URL}/${bookingId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  });
  if (!response.ok) {
    throw new Error('Failed to update booking');
  }
  return response.json();
}

export async function deleteBooking(bookingId) {
  const response = await fetch(`${API_BASE_URL}/${bookingId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete booking');
  }
  return response.json();
}
