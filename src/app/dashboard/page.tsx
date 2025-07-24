"use client";
import { useSession } from "next-auth/react";
import StockPredictor from "../../components/StockPredictor";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <LoadingSpinner />;
  }
  if (!session) {
    return <p className="p-6 text-red-600">Access denied. Please log in.</p>;
  }
  return <StockPredictor />;
} 