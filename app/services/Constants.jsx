import { BriefcaseBusinessIcon, Calendar, Code2Icon, LayoutDashboard, List, Puzzle, Settings, User2Icon, Wallet } from "lucide-react";


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
export const InterviewTypes=[
    {
        title: "Technical",
        icon: Code2Icon
    },
    {
        title: "Behavioral",
        icon:User2Icon
    },
    {
        title: "Experience",
        icon:BriefcaseBusinessIcon
    },
    {
        title: "Problem Solving",
        icon:Puzzle
    },
    {
        title: "Culture Fit",
        icon:LayoutDashboard
    },
    {
        title: "General",
        icon:List
    }
]