'use server';

import { createAdminClient } from '@/config/appwrite';
import { cookies } from 'next/headers';

export default async function createSession(previousState, formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  if (!email || !password) {
    return {
      error: 'Please Fill Out all Fields',
    };
  }

  try {
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set('appwrite-session', session.secret, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: new Date(session.expire),
      path: '/',
    });
    return {
      success: true,
    };
  } catch (error) {
    console.log('Auth Error', error);
    return {
      error: 'Invalid Email or Password',
    };
  }
}
