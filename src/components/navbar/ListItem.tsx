
import React from 'react';
import { Link } from 'react-router-dom';

interface ListItemProps {
  href: string;
  title: string;
  children?: React.ReactNode;
}

const ListItem = React.forwardRef<React.ElementRef<"a">, ListItemProps>(
  ({ href, title, children, ...props }, ref) => {
    return (
      <li>
        <Link
          to={href}
          ref={ref}
          className="group flex cursor-pointer select-none items-center rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          {...props}
        >
          <div className="mr-2 h-4 w-4 text-muted-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M3.75 3a.75.75 0 00-.75.75v15.75a.75.75 0 00.75.75h16.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75H3.75zM3 2.25a1.5 1.5 0 011.5-1.5h16.5a1.5 1.5 0 011.5 1.5v15.75a1.5 1.5 0 01-1.5 1.5H3.75a1.5 1.5 0 01-1.5-1.5V2.25z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M7.572 7.572a.75.75 0 011.06 0l2.25 2.25a.75.75 0 010 1.06l-2.25 2.25a.75.75 0 01-1.06-1.06L9.811 10.5l-2.24-2.24a.75.75 0 010-1.06zM16.428 7.572a.75.75 0 00-1.06 0l-2.25 2.25a.75.75 0 000 1.06l2.25 2.25a.75.75 0 001.06-1.06L14.189 10.5l2.24-2.24a.75.75 0 000-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span>{title}</span>
        </Link>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </li>
    )
  }
)
ListItem.displayName = "ListItem"

export default ListItem;
