// components/layout/RootLayout.js
import { Inter } from "next/font/google";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import "../../styles/app.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Vehicle Maintenance App",
  description: "Manage your vehicles and their maintenance efficiently.",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en" className="h-full">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* Add any additional meta tags, stylesheets, or scripts */}
      </Head>
      <body className={`flex flex-col min-h-screen ${inter.className}`}>
        <Header />
        <main className="flex-grow px-4 md:px-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;