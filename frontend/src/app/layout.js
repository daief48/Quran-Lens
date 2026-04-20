import { Plus_Jakarta_Sans, Amiri, Scheherazade_New } from "next/font/google";
import "./globals.css";
import { SettingsProvider } from "@/context/SettingsContext";

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: '--font-jakarta',
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: '--font-amiri',
});

const scheherazade = Scheherazade_New({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: '--font-scheherazade',
});

export const metadata = {
  title: "Quran Lens - Explore the Quran",
  description: "A modern Quran web application with Arabic text and English translations.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} ${amiri.variable} ${scheherazade.variable} antialiased`}>
        <SettingsProvider>
          {children}
        </SettingsProvider>
      </body>
    </html>
  );
}
