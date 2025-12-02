import React from "react";
import Footer from "./Footer";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <>
      {children}
      <Footer showNewsletter={false} />
    </>
  );
};

export default PageLayout;
