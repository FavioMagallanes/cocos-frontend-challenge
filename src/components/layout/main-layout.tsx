import { FC, ReactNode } from "react";
import { Footer } from "./footer";
import { Navbar } from "./navbar";

type MainLayoutProps = {
  children: ReactNode;
};

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow p-12">{children}</main>
      <Footer />
    </div>
  );
};
