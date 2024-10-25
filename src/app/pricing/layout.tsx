
// import { Footer, Navbar } from "@/components";
import React from "react"; 

interface Props {
  children: React.ReactNode;
}

const PayementLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col items-center w-full">
      {/* <Navbar /> */}
      {children}
      {/* <Footer /> */}
    </div>
  );
};

export default PayementLayout;
