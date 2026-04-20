import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SettingsProvider } from "@/context/SettingsContext";

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: '--font-jakarta',
});

export const metadata = {
  title: "Quran Lens - Explore the Quran",
  description: "A modern Quran web application with Arabic text and English translations.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={jakarta.className}>
        <SettingsProvider>
          {children}
        </SettingsProvider>
      </body>
    </html>
  );
}
