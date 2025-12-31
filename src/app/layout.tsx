import "./globals.css";
import { BackgroundLayout } from "@/components/BackgroundLayout";
import { ThemeProvider } from "./ThemeContext/ThemeContext";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
      <ThemeProvider>
        <BackgroundLayout>
          {children}
        </BackgroundLayout>
      </ThemeProvider>
      </body>
    </html>
  );
}
