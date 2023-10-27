import { Metadata } from "next";
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import AuthBox from "../components/AuthBox";

export const metadata: Metadata = {
  title: "Home",
  description: "products page",
};

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <Navbar />
      <Sidebar />
      <AuthBox />
      {children}
    </main>
  );
};

export default Layout;
