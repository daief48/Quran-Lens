import { Inter } from "next/font/google";
import "./globals.css";
import { SettingsProvider } from "@/context/SettingsContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Quran Lens - Explore the Quran",
  description: "A modern Quran web application with Arabic text and English translations.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SettingsProvider>
          {children}
        </SettingsProvider>
      </body>
    </html>
  );
}
