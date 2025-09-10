import "./globals.css";
import ThemeLayout from "./ThemeLayout";

export const metadata = {
  title: "Test mode",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans bg-light text-dark">
        <ThemeLayout>{children}</ThemeLayout>
      </body>
    </html>
  );
}
