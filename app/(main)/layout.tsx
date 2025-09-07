import Footer from "@/components/footers/Footer";
import Header from "@/components/headers/Header";
import ScrollToTop from "@/components/others/ScrollToTop";
import { Toaster } from "sonner";


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header/>
      {children}
      <Footer />
      <ScrollToTop />
      {/* <Toaster position="top-right" duration={2000}/> */}
    </div>
  );
}
