import DriveFooter from "@/app/drive/_components/DriveFooter";
import DriveHeader from "@/app/drive/_components/DriveHeader";
import { Toaster } from "react-hot-toast";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <DriveHeader></DriveHeader>
      <div className="flex-grow bg-gray-100 px-6 sm:px-16 py-6">
        {children}
      </div>
      <DriveFooter></DriveFooter>
      <Toaster />
    </>
  );
}