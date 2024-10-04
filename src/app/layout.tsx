import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-commerce Template",
  description: "Users can modify the designs what they in website this feature is available in our e-commerce website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-N662GF4B3Z"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-N662GF4B3Z');
            `,
          }}
        />

        {/* SEO Meta Tags */}
        <meta name="title" content="E-commerce Template" />
        <meta
          name="description"
          content="Users can modify the designs what they in website this feature is available in our e-commerce website."
        />
        <meta
          name="keywords"
          content="E-commerce, purchase, women dresses, men dresses"
        />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />

        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="Dynamic website" />
        <meta property="og:title" content="E-commerce Website" />
        <meta
          property="og:url"
          content="https://main.d1tngp6p7622tv.amplifyapp.com/"
        />
        <meta
          property="og:image"
          content="http://localhost:3000/images/landing.png"
        />
        <meta
          property="og:description"
          content="Users can modify the designs what they in website this feature is available in our e-commerce website."
        />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="E-commerce" />
        <meta name="twitter:title" content="E-commerce website" />
        <meta
          name="twitter:site"
          content="https://main.d1tngp6p7622tv.amplifyapp.com/"
        />
        <meta
          name="twitter:image"
          content="http://localhost:3000/images/landing.png"
        />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "http://www.schema.org",
              "@type": "WebSite",
              name: "E-commerce",
              alternateName: "Purchase",
              url: "https://main.d1tngp6p7622tv.amplifyapp.com/",
            }),
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
