import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Catalogue Ingestion Workspace",
  description: "Catalogue ingestion and approval dashboard"
  title: "Catalogue Approval",
  description: "ASOS-style catalogue item approval dashboard"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
