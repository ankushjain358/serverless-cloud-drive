import Footer from "@/app/(external)/_components/Footer";
import Header from "@/app/(external)/_components/Header";


export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header></Header>

      <div className="flex-grow bg-gray-100 dark:bg-black p-5 md:p-8">
        {children}
      </div>
      <Footer></Footer>
    </>
  );
}