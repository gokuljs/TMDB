import React from 'react';
interface HomeLayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<HomeLayoutProps> = ({ children }): JSX.Element => {
  return <main>{children}</main>;
};

export default Layout;
