import "./globals.css";
import { Inter } from "next/font/google";

import AuthProvider from "./context/AuthProvider";


import DashboardSidebar from "./components/DashboardComponents/DashboardSidebar";
import { Toaster } from "@/components/ui/toaster";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "The Commit Crew",
  description: "Ojass Hackathon file of the commit crew",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="w-full h-full">
      <body className={`${inter.className} w-full h-full m-0 p-0`}>
        <AuthProvider>
          <main className="flex justify-center items-start w-full h-full">
            <DashboardSidebar child={children} />
          </main>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}

