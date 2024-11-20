import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { theme } from '@/theme';
import { MantineProvider } from '@mantine/core';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <Component {...pageProps} />
    </MantineProvider>
  );
}
