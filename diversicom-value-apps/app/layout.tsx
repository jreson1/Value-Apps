export const metadata = { title: "Diversicom Value Apps", description: "Executive-friendly tools that translate tech into dollars, risk, and time saved." };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen text-gray-900">
        {children}
      </body>
    </html>
  );
}
