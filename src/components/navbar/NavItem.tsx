
import React from 'react';
import { Link } from 'react-router-dom';
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

interface NavItemProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavItem = ({ to, children, onClick }: NavItemProps) => {
  return (
    <Link to={to} className={navigationMenuTriggerStyle()} onClick={onClick}>
      {children}
    </Link>
  );
};

export default NavItem;
