
import * as React from "react";

interface SidebarContextProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  width: number;
}

const SidebarContext = React.createContext<SidebarContextProps | undefined>(undefined);

interface SidebarProviderProps {
  children: React.ReactNode;
  defaultWidth?: number;
  defaultCollapsed?: boolean;
  collapsedWidth?: number;
}

export function SidebarProvider({
  children,
  defaultWidth = 240,
  defaultCollapsed = false,
  collapsedWidth = 64,
}: SidebarProviderProps) {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);
  const width = React.useMemo(
    () => (collapsed ? collapsedWidth : defaultWidth),
    [collapsed, collapsedWidth, defaultWidth]
  );

  return (
    <SidebarContext.Provider
      value={{
        collapsed,
        setCollapsed,
        width,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  
  return context;
}
