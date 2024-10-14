'use server';

import { createSessionClient } from '@/config/appwrite';
import { cookies } from 'next/headers';

export default async function destroySession() {
  const sessionCookie = cookies().get('appwrite-session');
  if (!sessionCookie) {
    return {
      error: 'No session found',
    };
  }
  const { account } = await createSessionClient(sessionCookie.value);

  //Delete session

  await account.deleteSession('current');
  cookies().delete('appwrite-session');

  return {
    success: true,
  };

  try {
  } catch (error) {
    return {
      error: 'Error while deleting session',
    };
  }
}
