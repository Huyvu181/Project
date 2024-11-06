import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarIconProps {
  icon: React.ReactNode;
  to?: string;      // Đường dẫn nội bộ
  href?: string;    // Đường dẫn bên ngoài
}

export function NavbarIcon({ icon, to, href }: NavbarIconProps) {
  if (to) {
    return (
      <Link to={to}>
        <div>{icon}</div>
      </Link>
    );
  } else if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        <div>{icon}</div>
      </a>
    );
  } else {
    return <div>{icon}</div>;
  }
}



