import "./globals.css";
import { Archivo, Lora, JetBrains_Mono } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ChromeGate from "../components/ChromeGate";

export const metadata = {
  title: "DPRIME | A community connecting communities",
  description:
    "Discover technology communities, events and opportunities across Africa.",
};

const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", display: "swap" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${lora.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen bg-paper text-ink antialiased">
        <ChromeGate>
          <Navbar />
        </ChromeGate>
        <main className="min-h-screen">{children}</main>
        <ChromeGate>
          <Footer />
        </ChromeGate>
      </body>
    </html>
  );
}
