// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <title>QR 제품 정보</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style={{ fontFamily: 'sans-serif', padding: '1rem' }}>
        {children}
      </body>
    </html>
  );
}
