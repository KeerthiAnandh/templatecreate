import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Welcome to Gen-com Template",
  description:
    "Sign in or create an account to shop the latest trends. Enjoy secure checkout, personalized services, and exclusive offers on our platform.",
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
          src="https://www.googletagmanager.com/gtag/js?id=-N662GF4B3Z"
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
        <meta name="viewport" content="width= -width, initial-scale=1.0" />
        <meta name="title" content="gencom Template" />
        <meta name="keywords" content="gencom template, gencom template free download, free gencom template, styles gencom template free, website gencom template, gencom template free, nextjs gencom template, best gencom template, figma gencom template, react gencom template, Gencom template github, Gencom templates, Gen com app template, an example of gencom, Gencom template buy, gencom banner templates, Gencom design template, Gencom front end template, gencom goods example, Gencom home page template, react js Gencom template, Gen com responsive template, figma Gencom template mobile, template of Gencom website, dynamic page Gencom template, Gen com responsive template, gencom Project Examples" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="msvalidate.01" content="B9928E316AA5A95CE869F0867A74919E" />

        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="Dynamic website" />
        <meta property="og:title" content="gencom Website" />
        <meta property="og:url" content="https://main.d1tngp6p7622tv.amplifyapp.com/" />
        <meta property="og:image" content="images/websitepic.jpg" />
        <meta
          property="og:description"
          content="Sign in or create an account to shop the latest trends. Enjoy secure checkout, personalized services, and exclusive offers on our platform."
        />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="gencom" />
        <meta name="twitter:title" content="gencom website" />
        <meta
          name="twitter:site"
          content="https://main.d1tngp6p7622tv.amplifyapp.com/"
        />
        <meta name="twitter:image" content="images/websitepic.jpg" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: "Product Name",
              image: "images/websitepic.jpg",
              description: "Short description of the product",
              offers: {
                "@type": "Offer",
                priceCurrency: "INR",
                price: "19.99",
                itemCondition: "https://schema.org/NewCondition",
                availability: "https://schema.org/InStock",
              },
            }),
          }}
        />

        {/* Bing Webmaster Tool */}
        <Script id="" strategy="lazyOnload">
          {`
            (function(c, l, a, r, i, t, y) {
              c[a] = c[a] || function () {
                (c[a].q = c[a].q || []).push(arguments);
              };
              t = l.createElement(r);
              t.async = 1;
              t.src = "https://www.clarity.ms/tag/" + i + "?ref=bwt";
              y = l.getElementsByTagName(r)[0];
              y.parentNode.insertBefore(t, y);
            })(window, document, "clarity", "script", "ogcahg8txm");
          `}
        </Script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
