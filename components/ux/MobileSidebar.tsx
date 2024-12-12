'use client';

import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Activity, 
  TrendingUp, 
  BarChart2, 
  Wallet, 
  Bell,
  Plus,
  ChevronDown,
  Menu,
  Home,
  Users,
  Trophy,
  Calendar,
  ClipboardList,
  Settings,
  User,
  PlusCircle,
  Star
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '../ui/button';

type SidebarProps = {
  userName?: string;
  userRole?: string;
  userImage?: string;
};

type NavItem = {
  label: string;
  icon: React.ReactNode;
  href: string;
  subItems?: { label: string; href: string; }[];
};

const MobileSidebar = ({ userName = "Manager Name", userRole = "Manager", userImage = "/admin.png" }: SidebarProps) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
    setExpandedItem(null);
  }, [pathname]);

  const navigationItems: NavItem[] = [
    {
      label: "players",
      icon: <Home className="w-5 h-5" />,
      href: "#",
      subItems: [
        { label: "Ajouter joueurs", href: "/manager/dashboard/players/add" },
        { label: "profile joueurs", href: "/manager/dashboard/players/profile" },
        { label: "liste joueurs", href: "/players" },
        { label: "statistics", href: "/manager/dashboard/players/statistics" },
  
      ]
    },
    {
      label: "Matches",
      icon: <Star/>,
      href: "/matches",
    },
    {
      label: "teams",
      icon: <Trophy/>,
      href: "/teams",
    },
    {
      label: "Training",
      icon: <Calendar />,
      href: "/training",
    },
    {
      label: "Statistics",
      icon: <Activity />,
      href: "/statistics",
    },
    {
      label: "Contracts",
      icon: <ClipboardList />,
      href: "/contracts",
    },
    {
      label: "Settings",
      icon: <Settings/>,
      href: "/settings",
    },
    {
      label: "Finance",
      icon: <Wallet className="w-5 h-5" />,
      href: "/finance",
    },
    {
      label: "Notifications",
      icon: <Bell className="w-5 h-5" />,
      href: "/notifications",
    }
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen} c>
      <SheetTrigger asChild>
      <Button variant="default" className=" z-50 fixed left-4 bottom-4"
         onClick={() => setOpen(!open)}
        >
            <PlusCircle className="h-6 w-6" /> 
          </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-[#1F1F1F] text-white w-auto bg-transparent">
        {/* Mobile Sidebar Header */}
        <div className="p-4 flex items-center gap-3">
          <button
              onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-gray-700 rounded-lg"
          >
            <Menu className="w-5 h-5 " />
          </button>

          {!isCollapsed && (
          <div className="flex items-center gap-3">
            <User className="text-white"/>
            <div>
              <h3 className="font-medium text-sm text-white">{userName}</h3>
              <p className="text-xs text-gray-400">{userRole}</p>
            </div>
          </div>
                )}
        </div>

       
        <nav className="px-3 py-4 overflow-y-auto">
          {navigationItems.map((item) => (
            <div key={item.label}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 p-3 rounded-lg mb-1 ${
                  pathname === item.href ? 'bg-secondary/70 border-primary' : 'hover:bg-gray-700'
                }`}
              >
                {item.icon}

               {!isCollapsed && (
                  <span className="flex-1">{item.label}</span>
                )}

{!isCollapsed && item.subItems && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      expandedItem === item.label ? 'rotate-180' : ''
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setExpandedItem(
                        expandedItem === item.label ? null : item.label
                      );
                    }}
                  />
                )}
              </Link>
              {!isCollapsed && item.subItems && expandedItem === item.label && (
                <div className="ml-6 space-y-1">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.label}
                      href={subItem.href}
                      className={`block p-2 rounded-lg text-sm ${
                        pathname === subItem.href
                          ? 'bg-orange-600'
                          : 'hover:bg-gray-700'
                      }`}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="p-4">
          <button
            className="w-full  flex items-center justify-center gap-2 bg-current/80 hover:bg-current/20 border-2 p-3 rounded-lg transition-colors"
          >
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;