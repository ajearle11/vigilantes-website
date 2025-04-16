'use client';

import { useEffect } from 'react';
import { signIn, getSession } from 'next-auth/react';

export default function AnonymousSignin() {
  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (!session) {
        await signIn('credentials', { redirect: false });
      }
    };

    checkSession(); // ✅ check immediately on mount

    const interval = setInterval(checkSession, 5 * 62_000); // ✅ check every 1 minute

    return () => clearInterval(interval);
  }, []);

  return null;
}
