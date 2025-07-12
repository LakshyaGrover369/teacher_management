import { ReactNode } from "react";
import Navbar from "./Navbar";
import Head from "next/head";

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
}

export default function MainLayout({
  children,
  title = "Teacher Management",
}: MainLayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Modern teacher management interface"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </>
  );
}
