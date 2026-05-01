import type { ReactNode } from "react";
import AppHeader from "./AppHeader";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-page">
      <AppHeader />
      <main className="mx-auto max-w-4xl px-6 py-12 md:px-12 md:py-16">
        {children}
      </main>
    </div>
  );
}
