'use client';

import { AuthProvider } from '@/context/authContext';

function AuthWrapper({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}

export default AuthWrapper;
