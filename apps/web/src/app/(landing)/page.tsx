"use client"

import Home from '@container/landing/page.tsx';
import RefreshCookieAuthProvider from '@provider/refresh-cookie-provider';
import AppLayout from '@layout/app-layout.tsx';

export default function Page(): JSX.Element {
  return (
    // <RefreshCookieAuthProvider>
      <AppLayout>
        <Home />
      </AppLayout>
    // </RefreshCookieAuthProvider>
  );
}
