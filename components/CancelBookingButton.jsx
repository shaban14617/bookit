'use client';
import cancelBooking from '@/app/actions/cancelBooking';
import { toast } from 'react-toastify';
function CancelBookingButton({ bookingId }) {
  async function handleCancelClick() {
    if (!confirm('Are you sure you want to cancel')) {
      return;
    }
    try {
      const result = await cancelBooking(bookingId);
      if (result.success) {
        toast.success('Booking cancelled successfully!');
      }
    } catch (error) {
      console.log(error, 'failed cancelled booking');
    }
    return {
      error: 'Failed To Cancel Booking',
    };
  }
  return (
    <button
      onClick={handleCancelClick}
      className="bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto text-center hover:bg-red-700"
    >
      Cancel Booking
    </button>
  );
}

export default CancelBookingButton;
