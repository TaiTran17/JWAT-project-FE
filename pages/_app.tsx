import Layout from "@/pages/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = (Component as any).getLayout || false;

  return getLayout ? (
    <Layout>
      <Toaster position="top-right" />
      <Component {...pageProps} />
    </Layout>
  ) : (
    <>
      <Toaster position="top-right" />
      <Component {...pageProps} />
    </>
  );
}
