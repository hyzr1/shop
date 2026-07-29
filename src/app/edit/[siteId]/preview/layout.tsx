import './preview.css'

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Manrope:wght@400;500;600;700&display=swap"
        />
      </head>
      <body className="m-0 bg-white text-[#0b0b12] antialiased">{children}</body>
    </html>
  )
}
