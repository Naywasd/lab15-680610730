import { BookOpen, Calendar, Home, Settings } from "lucide-react";
import { Link, useLocation } from "react-router";
import { currentUser } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  { title: "หน้าแรก", url: "/", icon: Home },
  { title: "ลงทะเบียนเรียน", url: "/enrollment", icon: BookOpen },
  
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-2 py-1 text-sm font-semibold">CPE & ISNE</div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>เมนูหลัก</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={location.pathname === item.url}
                    render={<Link to={item.url} />}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        <Separator className="mb-3" />
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={currentUser.avatar} alt={currentUser.nickname} />
            <AvatarFallback>{currentUser.nickname[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start text-xs">
            <span className="font-medium">{currentUser.nickname}</span>
            <Badge variant="outline" className="mt-1 h-5 text-[10px]">
              {currentUser.role}
            </Badge>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
