
import { Inter } from "next/font/google";
import DashboardSidebar from "../components/DashboardComponents/DashboardSidebar";



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "The Commit Crew",
  description: "Ojass Hackathon file of the commit crew",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
       <DashboardSidebar child={children}/>
      </body>
    </html>
  );
}
