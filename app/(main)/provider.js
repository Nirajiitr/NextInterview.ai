import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import AppSidebar from "./_components/AppSidebar";
import Provider from "../provider";

const DashboardProvider = ({ children }) => {
  return (
    <Provider>
      <SidebarProvider>
        <AppSidebar />
        <div className="w-full">
          <SidebarTrigger />
          {children}
        </div>
      </SidebarProvider>
    </Provider>
  );
};

export default DashboardProvider;
