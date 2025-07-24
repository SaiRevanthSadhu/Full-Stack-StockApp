import { ReactNode } from "react";
import NavBar from "../../components/NavBar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-gray-50">
        {children}
      </main>
    </>
  );
} 