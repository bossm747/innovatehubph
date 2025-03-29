import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { ChevronRight, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

// Context for Sidebar state
type SidebarContextType = {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  width: number;
  setWidth: React.Dispatch<React.SetStateAction<number>>;
}

const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

// Provider component
interface SidebarProviderProps {
  children: React.ReactNode;
  defaultCollapsed?: boolean;
  defaultWidth?: number;
  collapsedWidth?: number;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({
  children,
  defaultCollapsed = false,
  defaultWidth = 240,
  collapsedWidth = 64,
}) => {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);
  const [width, setWidth] = React.useState(defaultCollapsed ? collapsedWidth : defaultWidth);

  React.useEffect(() => {
    setWidth(collapsed ? collapsedWidth : defaultWidth);
  }, [collapsed, collapsedWidth, defaultWidth]);

  const value = React.useMemo(() => ({
    collapsed,
    setCollapsed,
    width,
    setWidth,
  }), [collapsed, width]);

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
};

// Main Sidebar component
interface SidebarProps {
  className?: string;
  children?: React.ReactNode;
  defaultWidth?: number;
  collapsible?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  className,
  children,
  defaultWidth = 240,
  collapsible = false,
}) => {
  const { collapsed, width } = useSidebar();

  return (
    <aside
      className={cn(
        "flex flex-col border-r bg-background h-screen overflow-y-auto transition-all duration-300 ease-in-out",
        className
      )}
      style={{ width: `${width}px`, minWidth: `${width}px` }}
    >
      {children}
    </aside>
  );
};

// Sidebar Header component
interface SidebarHeaderProps {
  className?: string;
  children?: React.ReactNode;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  className,
  children,
}) => {
  const { collapsed } = useSidebar();

  return (
    <div
      className={cn(
        "flex flex-shrink-0 items-center overflow-hidden transition-all",
        className
      )}
    >
      {children}
    </div>
  );
};

// Sidebar Content component
interface SidebarContentProps {
  className?: string;
  children?: React.ReactNode;
}

export const SidebarContent: React.FC<SidebarContentProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "flex-1 overflow-y-auto py-2",
        className
      )}
    >
      {children}
    </div>
  );
};

// Sidebar Footer component
interface SidebarFooterProps {
  className?: string;
  children?: React.ReactNode;
}

export const SidebarFooter: React.FC<SidebarFooterProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "flex-shrink-0 overflow-hidden transition-all",
        className
      )}
    >
      {children}
    </div>
  );
};

// Sidebar Trigger component
interface SidebarTriggerProps {
  className?: string;
}

export const SidebarTrigger: React.FC<SidebarTriggerProps> = ({
  className,
}) => {
  const { collapsed, setCollapsed } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setCollapsed(!collapsed)}
      className={cn("", className)}
      aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
    >
      <Menu className="h-5 w-5" />
    </Button>
  );
};

// Sidebar Group components
interface SidebarGroupProps {
  className?: string;
  children?: React.ReactNode;
}

export const SidebarGroup: React.FC<SidebarGroupProps> = ({
  className,
  children,
}) => {
  return (
    <div className={cn("py-2", className)}>
      {children}
    </div>
  );
};

// Sidebar Group Label
interface SidebarGroupLabelProps {
  className?: string;
  children?: React.ReactNode;
}

export const SidebarGroupLabel: React.FC<SidebarGroupLabelProps> = ({
  className,
  children,
}) => {
  const { collapsed } = useSidebar();

  if (collapsed) {
    return null;
  }

  return (
    <div className={cn("px-4 py-1 text-xs font-medium text-muted-foreground", className)}>
      {children}
    </div>
  );
};

// Sidebar Group Content
interface SidebarGroupContentProps {
  className?: string;
  children?: React.ReactNode;
}

export const SidebarGroupContent: React.FC<SidebarGroupContentProps> = ({
  className,
  children,
}) => {
  return (
    <div className={cn("", className)}>
      {children}
    </div>
  );
};

// Sidebar Menu
interface SidebarMenuProps {
  className?: string;
  children?: React.ReactNode;
}

export const SidebarMenu: React.FC<SidebarMenuProps> = ({
  className,
  children,
}) => {
  return (
    <nav className={cn("px-2 space-y-1", className)}>
      {children}
    </nav>
  );
};

// Sidebar Menu Item
interface SidebarMenuItemProps {
  className?: string;
  children?: React.ReactNode;
}

export const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({
  className,
  children,
}) => {
  return (
    <div className={cn("", className)}>
      {children}
    </div>
  );
};

// Sidebar Menu Button
const menuButtonVariants = cva(
  "flex items-center w-full py-2 px-3 text-sm rounded-md transition-colors",
  {
    variants: {
      variant: {
        default: "hover:bg-accent hover:text-accent-foreground",
      },
      active: {
        true: "bg-accent text-accent-foreground",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      active: false,
    },
  }
);

interface SidebarMenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof menuButtonVariants> {
  asChild?: boolean;
}

export const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonProps
>(({ className, variant, active, asChild = false, ...props }, ref) => {
  const { collapsed } = useSidebar();
  
  if (asChild && React.isValidElement(props.children)) {
    const child = props.children;
    return React.cloneElement(child, {
      className: cn(
        menuButtonVariants({ variant, active, className }),
        collapsed ? "justify-center" : "",
        child.props.className
      ),
      ...props,
      children: collapsed ? 
        React.Children.map(child.props.children, childItem => {
          if (React.isValidElement(childItem) && 
              (typeof childItem.type === 'string' && childItem.type === 'svg' || 
               childItem.props?.className?.includes?.('w-') || 
               childItem.props?.className?.includes?.('h-'))) {
            return childItem;
          }
          return null;
        }) : 
        child.props.children
    });
  }

  return (
    <button
      ref={ref}
      className={cn(
        menuButtonVariants({ variant, active, className }),
        collapsed ? "justify-center" : ""
      )}
      {...props}
    />
  );
});

SidebarMenuButton.displayName = "SidebarMenuButton";
