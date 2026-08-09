export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <title>KOS Regtech - Khepra Experts</title>
        <meta name="description" content="Regtech intelligence platform" />
      </head>
      <body style={{margin:0,fontFamily:'system-ui',background:'#0a0a0a',color:'#fff'}}>
        {children}
      </body>
    </html>
  );
}
