import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AppHeader() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-card px-4">
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <div className="hidden sm:block">
          <h1 className="text-sm font-semibold text-foreground">
            WAITLESS AI
            <span className="ml-2 text-xs font-normal text-muted-foreground">
              – Time-to-Risk Intelligence
            </span>
          </h1>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
        </Button>
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
          DR
        </div>
      </div>
    </header>
  );
}
