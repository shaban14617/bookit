import Heading from '@/components/Heading';
import getMyBookings from '../actions/getMyBookings';
import BookedRoomCard from '@/components/BookedRoomCard';

function formatDate(dateString) {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function calculateTotalPrice(checkIn, checkOut, pricePerHour) {
  const checkInTime = new Date(checkIn).getTime();
  const checkOutTime = new Date(checkOut).getTime();
  const hours = Math.abs(checkOutTime - checkInTime) / 36e5;
  return hours * pricePerHour;
}

async function BookingPage() {
  const bookings = await getMyBookings();
  return (
    <div>
      <Heading title="My Bookings" />
      {bookings.length === 0 ? (
        <p className="text-gray-600 mt-4">
          You have no bookings yet. Please check back later.
        </p>
      ) : (
        bookings.map((booking) => (
          <BookedRoomCard key={booking.$id} booking={booking} />
        ))
      )}
    </div>
  );
}

export default BookingPage;
