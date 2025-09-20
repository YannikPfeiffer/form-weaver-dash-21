import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Search, Plus, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  showSearch?: boolean;
  showUploadButton?: boolean;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  onUpload?: () => void;
}

export function DashboardLayout({
  children,
  title,
  showSearch = true,
  showUploadButton = true,
  searchPlaceholder = "Search forms...",
  onSearch,
  onUpload,
}: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="border-b border-border bg-card/50 backdrop-blur">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="lg:hidden" />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{title}</h1>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {showSearch && (
                  <div className="relative w-96 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder={searchPlaceholder}
                      className="pl-10 bg-background"
                      onChange={(e) => onSearch?.(e.target.value)}
                    />
                  </div>
                )}
                
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Add Filter
                </Button>
                
                {showUploadButton && (
                  <Button onClick={onUpload} className="gap-2 bg-primary hover:bg-primary/90">
                    <Plus className="h-4 w-4" />
                    Upload New Doc
                  </Button>
                )}
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}