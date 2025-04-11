"use client";
import { SideBarOptions } from "@/app/services/Constants";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AppSidebar = () => {
  const path = usePathname();
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-between w-full h-10 px-4 ">
          <img
            src="/logo.png"
            alt="Logo"
            className=" w-full h-full object-cover "
          />
        </div>
        <Button className="mt-2 ">
          <Plus /> Create New Interview{" "}
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarContent>
            <SidebarMenu>
              {SideBarOptions.map((option, index) => (
                <SidebarMenuItem key={index} className="p-1">
                  <SidebarMenuButton asChild className={`p-5 ${path === option.path && "bg-primary/10 font-medium"}`}>
                    <Link href={option.path}>
                      <option.icon className={`${path === option.path && "text-primary"}`} />
                      <span className={`text-sm ${path === option.path && "text-primary"}`}>{option.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};
export default AppSidebar;
