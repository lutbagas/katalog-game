import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-tr from-blue-100 to-violet-200 min-h-screen">{children}</body>
    </html>
  );
}
