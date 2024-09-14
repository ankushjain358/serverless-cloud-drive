import Footer from "@/components/Footer";
import Header from "@/components/Header";


export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header></Header>
      <div className="flex-grow bg-gray-100 px-6 sm:px-16 py-8">
        {children}
      </div>
      <Footer></Footer>
    </>
  );
}