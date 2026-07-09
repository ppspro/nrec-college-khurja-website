import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "NREC College Khurja | Excellence in Education Since 1901",
    template: "%s | NREC College Khurja",
  },
  description:
    "NREC College, Khurja - A premier institution of higher education in Uttar Pradesh, India. Established in 1901.",
  keywords:
    "NREC College, Khurja College, UP PG College, higher education Khurja, Bulandshahr",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "NREC College Khurja",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
