"use client";

import { MenuIcon, PlusCircle, Settings } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "../ux/SideBar";
import MobileSidebar from "../ux/MobileSidebar";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex min-h-screen ">
      <div className="hidden md:flex">
      <Sidebar/>
    
      </div>

      <span className="inline md:hidden">
        <MobileSidebar userName="Agbota" userRole="Manager" />
      </span>

    
      <div className="flex-1 p-4 md:p-8">{children}</div>
    </div>
  );
}