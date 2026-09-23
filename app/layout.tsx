import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shanit Paul — After Hours",
  description: "One building. Five little worlds. Explore Shanit Paul's interactive, after-hours portfolio neighborhood.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#10161b" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}