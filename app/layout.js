import "./globals.css";

export const metadata = {
  title: "Dial Edge",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans bg-light text-dark">{children}</body>
    </html>
  );
}
