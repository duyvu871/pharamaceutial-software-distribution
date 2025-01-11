<<<<<<< HEAD
import { DropzoneButton } from "@component/ImportCsv_Excel/DropzoneButton";
import Image from "next/image";
=======
"use client"
>>>>>>> 3cd4b395c4d91c0ab77564848256c4b782e730a0

import Home from '@container/landing/page.tsx';
import RefreshCookieAuthProvider from '@provider/refresh-cookie-provider';
import AppLayout from '@layout/app-layout.tsx';

export default function Page(): JSX.Element {
  return (
<<<<<<< HEAD
    <DropzoneButton></DropzoneButton>
  )
=======
    <RefreshCookieAuthProvider>
      <AppLayout>
        <Home />
      </AppLayout>
    </RefreshCookieAuthProvider>
  );
>>>>>>> 3cd4b395c4d91c0ab77564848256c4b782e730a0
}
