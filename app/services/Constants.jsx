import { Calendar, LayoutDashboard, List, Settings, Wallet } from "lucide-react";


export const SideBarOptions = [
{
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
},
{
    name: "Scheduled Interview",
    icon: Calendar,
    path: "/scheduled-interview",
},
{
    name: "All Interview",
    icon: List,
    path: "/all-interview",
},
{
    name: "Billing",
    icon: Wallet,
    path: "/billing",
},
{
    name: "Settings",
    icon: Settings,
    path: "/settings",
}

]