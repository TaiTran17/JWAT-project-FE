import Layout from "@/pages/components/Layout";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const getLayout = (Component as any).getLayout || false;

  return getLayout ? (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Toaster position="top-right" />
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  ) : (
    <>
      <Toaster position="top-right" />
      <Component {...pageProps} />
    </>
  );
}
