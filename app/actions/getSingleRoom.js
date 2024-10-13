'use server';

import { createAdminClient } from '@/config/appwrite';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export default async function getSingleRoom(id) {
  try {
    const { databases } = await createAdminClient();
    const room = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
      id
    );
    revalidatePath('/', ' layout');
    return room;
  } catch (error) {
    console.error(error);
    redirect('/error');
  }
}
