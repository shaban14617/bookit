'use server';
import { createSessionClient } from '@/config/appwrite';
import { cookies } from 'next/headers';
import { ID } from 'node-appwrite';
import { redirect } from 'next/navigation';
import checkAuth from './checkAuth';
import { revalidatePath } from 'next/cache';

export default async function bookRoom(perviousState, formData) {
  const sessionCookie = cookies().get('appwrite-session');

  if (!sessionCookie) {
    redirect('/login');
  }

  // Fetch User's rooms

  try {
    const { databases } = await createSessionClient(sessionCookie.value);

    const { user } = await checkAuth();

    if (!user) {
      return {
        error: 'You must be logged in to book a room.',
      };
    }

    // Extract date and time from the formData
    const checkInDate = formData.get('check_in_date');
    const checkOutDate = formData.get('check_out_date');
    const checkInTime = formData.get('check_in_time');
    const checkOutTime = formData.get('check_out_time');

    // Combine date and time to ISO 8601 format
    const checkInDateTime = `${checkInDate}T${checkInTime}`;
    const checkOutDateTime = `${checkOutDate}T${checkOutTime}`;
    console.log(checkInDateTime, checkOutDate);
    const bookingData = {
      check_in: checkInDateTime,
      check_out: checkOutDateTime,
      user_id: user.id,
      room_id: formData.get('room_id'),
    };

    // Create Bookings
    const newBooking = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
      ID.unique(),
      bookingData
    );

    revalidatePath('/bookings', 'layout');

    return {
      success: true,
    };
  } catch (error) {
    console.log('failed to book room', error);
    return {
      error: 'Failed to book room. Please try again later.',
    };
  }
}
