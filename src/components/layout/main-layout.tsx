import { FC, ReactNode } from "react";
import { Footer } from "./footer";
import { Navbar } from "./navbar";

type MainLayoutProps = {
  children: ReactNode;
};

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};
