import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ElevenLabs Custom UI",
  description: "Custom UI components for ElevenLabs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
