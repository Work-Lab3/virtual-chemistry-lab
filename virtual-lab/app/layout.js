import localFont from "next/font/local";
import "./globals.css";
import { Appwrapper } from "@/context/contextProvider";

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

export const metadata = {
  title: "Virtual-Chemistry-Lab",
  description: "This is your virtual chemistry lab",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Appwrapper>
          {children}
        </Appwrapper>
      </body>
    </html>
  );
}
