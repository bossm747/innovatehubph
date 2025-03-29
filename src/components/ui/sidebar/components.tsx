
import * as React from "react";
import { cn } from "@/lib/utils";
import { useSidebar } from "./context";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultWidth?: number;
  defaultCollapsed?: boolean;
  collapsedWidth?: number;
  collapsible?: boolean;
  children?: React.ReactNode;
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ 
    className, 
    defaultWidth = 240, 
    defaultCollapsed = false,
    collapsedWidth = 64,
    collapsible = false,
    children,
    ...props 
  }, ref) => {
    return (
      <SidebarProvider 
        defaultCollapsed={defaultCollapsed} 
        defaultWidth={defaultWidth}
        collapsedWidth={collapsedWidth}
      >
        <div
          ref={ref}
          className={cn(
            "shrink-0 bg-background border-r transition-width duration-300 ease-in-out",
            className
          )}
          style={{ width: `${useSidebar().width}px` }}
          {...props}
        >
          {children}
        </div>
      </SidebarProvider>
    );
  }
);
Sidebar.displayName = "Sidebar";

interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const SidebarHeader = React.forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ className, children, ...props }, ref) => {
    const { collapsed } = useSidebar();
    
    return (
      <div
        ref={ref}
        className={cn("px-2 py-3", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
SidebarHeader.displayName = "SidebarHeader";

interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const SidebarContent = React.forwardRef<HTMLDivElement, SidebarContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col flex-1 overflow-y-auto", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
SidebarContent.displayName = "SidebarContent";

interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const SidebarFooter = React.forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("px-2 py-3 mt-auto", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
SidebarFooter.displayName = "SidebarFooter";

interface SidebarTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const SidebarTrigger = React.forwardRef<HTMLButtonElement, SidebarTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const { collapsed, setCollapsed } = useSidebar();
    
    return (
      <button
        ref={ref}
        onClick={() => setCollapsed(!collapsed)}
        className={cn(
          "flex items-center justify-center w-8 h-8 rounded-md hover:bg-accent hover:text-accent-foreground",
          className
        )}
        {...props}
      >
        {children || (collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />)}
      </button>
    );
  }
);
SidebarTrigger.displayName = "SidebarTrigger";

interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const SidebarGroup = React.forwardRef<HTMLDivElement, SidebarGroupProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("py-2", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
SidebarGroup.displayName = "SidebarGroup";

interface SidebarGroupLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const SidebarGroupLabel = React.forwardRef<HTMLDivElement, SidebarGroupLabelProps>(
  ({ className, children, ...props }, ref) => {
    const { collapsed } = useSidebar();
    
    if (collapsed) {
      return null;
    }
    
    return (
      <div
        ref={ref}
        className={cn("px-3 py-1 text-xs font-medium text-muted-foreground", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
SidebarGroupLabel.displayName = "SidebarGroupLabel";

interface SidebarGroupContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const SidebarGroupContent = React.forwardRef<HTMLDivElement, SidebarGroupContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("px-1", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
SidebarGroupContent.displayName = "SidebarGroupContent";

interface SidebarMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const SidebarMenu = React.forwardRef<HTMLDivElement, SidebarMenuProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("space-y-1", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
SidebarMenu.displayName = "SidebarMenu";

interface SidebarMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const SidebarMenuItem = React.forwardRef<HTMLDivElement, SidebarMenuItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
SidebarMenuItem.displayName = "SidebarMenuItem";

interface SidebarMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  asChild?: boolean;
  children?: React.ReactNode;
}

const SidebarMenuButton = React.forwardRef<HTMLButtonElement, SidebarMenuButtonProps>(
  ({ className, active, asChild = false, children, ...props }, ref) => {
    const { collapsed } = useSidebar();
    const Comp = asChild ? React.cloneElement(children as React.ReactElement, { ref, ...props }) : "button";
    
    if (asChild) {
      return React.cloneElement(
        children as React.ReactElement,
        {
          ref,
          className: cn(
            "w-full flex items-center rounded-md px-3 py-2 text-sm font-medium",
            active ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground",
            collapsed && "justify-center px-0",
            className
          ),
          ...props
        }
      );
    }
    
    return (
      <button
        ref={ref}
        className={cn(
          "w-full flex items-center rounded-md px-3 py-2 text-sm font-medium",
          active ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground",
          collapsed && "justify-center px-0",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
SidebarMenuButton.displayName = "SidebarMenuButton";

export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
};
