import "./globals.css";
import { ReactNode } from "react";
import ClientRoot from "../components/ClientRoot";
import { ErrorBoundary } from "../components/ErrorBoundary";

export const metadata = {
  title: "StockAI - Intelligent Market Predictions",
  description: "AI-powered stock predictions using advanced neural networks. Get accurate market insights and make informed investment decisions.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          <ClientRoot>
            {children}
          </ClientRoot>
        </ErrorBoundary>
      </body>
    </html>
  );
}