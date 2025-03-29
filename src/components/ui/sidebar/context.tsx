
import * as React from "react"

// Context for Sidebar state
export type SidebarContextType = {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  width: number;
  setWidth: React.Dispatch<React.SetStateAction<number>>;
}

export const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined);

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
