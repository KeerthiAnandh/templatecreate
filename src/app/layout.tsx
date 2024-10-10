import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-commerce Template",
  description: "Welcome to our homepage! Sign in or create an account to access exciting features and personalized services. Enjoy a seamless experience with easy navigation, secure sign-in, and quick access to all your favorite content. Join our community today!",
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="title" content="E-commerce Template" />
        <meta
          name="description"
          content="Welcome to our homepage! Sign in or create an account to access exciting features and personalized services. Enjoy a seamless experience with easy navigation, secure sign-in, and quick access to all your favorite content. Join our community today!"
        />
        <meta
          name="keywords"
          content="e-commerce template, e-commerce template free download, free e-commerce template, styles e-commerce template free, website e-commerce template, e-commerce template free, nextjs e-commerce template, best e-commerce template, figma e-commerce template, react e-commerce template, ecommerce template github, ecommerce templates, e commerce app template, an example of e-commerce, ecommerce template buy, e-commerce banner templates, ecommerce design template, ecommerce front end template, e-commerce goods example, ecommerce home page template, react js ecommerce template, e commerce responsive template, figma ecommerce template mobile, template of ecommerce website, dynamic page ecommerce template, e commerce responsive template, E-commerce Project Examples"
        />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <link rel="canonical" href="https://main.d1tngp6p7622tv.amplifyapp.com/" />

        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="Dynamic website" />
        <meta property="og:title" content="E-commerce Website" />
        <meta
          property="og:url"
          content="https://main.d1tngp6p7622tv.amplifyapp.com/"
        />
        <meta
          property="og:image"
          content="images/websitepic.jpg"
        />
        <meta
          property="og:description"
          content="Welcome to our homepage! Sign in or create an account to access exciting features and personalized services. Enjoy a seamless experience with easy navigation, secure sign-in, and quick access to all your favorite content. Join our community today!"
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
          content="images/websitepic.jpg"
        />

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
                priceCurrency: "USD",
                price: "19.99",
                itemCondition: "https://schema.org/NewCondition",
                availability: "https://schema.org/InStock",
              },
            }),
          }}
        />
        {/* bing webmaster tool */}
        {/* <!-- Clarity tracking code for https://main.d1tngp6p7622tv.amplifyapp.com/ --> */}
        <Script id="clarity" strategy="lazyOnload">
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
