"use client";

import localFont from "next/font/local";
import "./globals.css";
import { store } from "./store";
import { Provider } from "react-redux";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// export const metadata = {
//   title: "rempro application UI",
//   icon: "/favicon.ico",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body suppressHydrationWarning>
        <Provider store={store}>
          <main
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
