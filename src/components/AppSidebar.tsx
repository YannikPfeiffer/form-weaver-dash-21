import { NavLink } from "react-router-dom";
import { FileText, Settings, User, BarChart3 } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: FileText,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
  },
];

const bottomNavigationItems = [
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar className="w-16" collapsible="icon">
      <SidebarContent className="bg-card border-r border-border flex flex-col h-full">
        {/* User Profile Section - Compact */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-center">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/user.jpg" alt="Jane Doe" />
              <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-xs">
                JD
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Main Navigation */}
        <SidebarGroup className="flex-1">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="mx-2 rounded-lg transition-colors hover:bg-accent hover:text-accent-foreground w-10 h-10 p-0 flex items-center justify-center"
                  >
                    <NavLink
                      to={item.url}
                      end
                      className={({ isActive }) =>
                        `flex items-center justify-center w-full h-full ${
                          isActive
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "text-foreground"
                        }`
                      }
                      title={item.title}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Bottom Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {bottomNavigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="mx-2 rounded-lg transition-colors hover:bg-accent hover:text-accent-foreground w-10 h-10 p-0 flex items-center justify-center"
                  >
                    <NavLink
                      to={item.url}
                      end
                      className={({ isActive }) =>
                        `flex items-center justify-center w-full h-full ${
                          isActive
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "text-foreground"
                        }`
                      }
                      title={item.title}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}