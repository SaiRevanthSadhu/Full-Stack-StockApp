import { ReactNode } from "react";
import NavBar from "../../components/NavBar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <NavBar />
      <main className="min-h-screen">
        {children}
      </main>
    </>
  );
} 