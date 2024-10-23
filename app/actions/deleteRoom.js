'use server';
import { createSessionClient } from '@/config/appwrite';
import { cookies } from 'next/headers';
import { Query } from 'node-appwrite';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export default async function deleteRoom(roomId) {
  const sessionCookie = cookies().get('appwrite-session');

  if (!sessionCookie) {
    redirect('/login');
  }

  // Fetch User's rooms

  try {
    const { databases, account } = await createSessionClient(
      sessionCookie.value
    );

    const user = await account.get();
    const userId = user.$id;

    const { documents: rooms } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
      [Query.equal('user_id', userId)]
    );
    // FIND ROOM TO delete
    const roomToDelete = rooms.find((room) => room.$id === roomId);

    if (roomToDelete) {
      await databases.deleteDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
        roomToDelete.$id
      );
      revalidatePath('/', 'layout');
      revalidatePath('/rooms/my', 'layout');
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: 'Room not found',
      };
    }
  } catch (error) {
    console.log('failed to Delete room', error);
    return {
      success: false,
      message: 'Failed to delete room',
    };
  }
}
