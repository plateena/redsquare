// components/layout/RootLayout.js

import { Inter } from "next/font/google";
import Head from "next/head";
import Header from "./header";
import Footer from "./footer";
import "../../styles/app.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};


const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* Add any additional meta tags, stylesheets, or scripts */}
      </Head>
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;