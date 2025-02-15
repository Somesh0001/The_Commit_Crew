import "./globals.css";
import { Inter } from "next/font/google";

import AuthProvider from "./context/AuthProvider";
import { UserProvider } from "@/context/UserContext";

import DashboardSidebar from "./components/DashboardComponents/DashboardSidebar";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Security Committed",
  description: "Ojass Hackathon file of the commit crew",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="w-full h-full">
      <body className={`${inter.className} w-full h-full m-0 p-0`}>
        <AuthProvider>
          <UserProvider> {/* Added UserProvider here */}
            <main className="flex justify-center items-start w-full h-full">
              <DashboardSidebar child={children} />
            </main>
            <Toaster />
          </UserProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
