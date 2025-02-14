"use client"; // 👈 This file is a client component

import Navbar from "./Navbar";
import { usePathname } from "next/navigation";

const NavbarWrapper = () => {
  const pathname = usePathname();
  return pathname === "/admin/dashboard" ? null : <Navbar />;
};

export default NavbarWrapper;
