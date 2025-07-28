import axios from 'axios';

const API_BASE_URL = '/api/bookings';

export const updateBooking = async (booking) => {
  try {
    const response = await axios.put(API_BASE_URL, booking);
    return response.data;
  } catch (error) {
    console.error('Failed to update booking:', error);
    throw error;
  }
};
