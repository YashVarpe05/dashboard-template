"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, FileText, CreditCard, Receipt, FileCheck, Bell, Menu, X } from "lucide-react"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: FileText, label: "Applications", active: false },
  { icon: CreditCard, label: "Billing", active: false },
  { icon: Receipt, label: "Rate Card", active: false },
  { icon: FileCheck, label: "Agreement Copy", active: false },
  { icon: Bell, label: "Notices", active: false },
]

export function Sidebar({ collapsed, onToggle, isMobile = false }) {
  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 transform",
        isMobile ? (collapsed ? "-translate-x-full" : "translate-x-0 w-64") : collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo and Toggle */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">KYC</span>
              </div>
              <span className="font-semibold text-sidebar-foreground">KYC Dashboard</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
          >
            {collapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item, index) => (
            <Button
              key={index}
              variant={item.active ? "default" : "ghost"}
              className={cn(
                "w-full justify-start text-left transition-all duration-200 hover:scale-105",
                collapsed ? "px-2" : "px-3",
                item.active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
            >
              <item.icon className={cn("h-4 w-4", collapsed ? "" : "mr-3")} />
              {!collapsed && <span>{item.label}</span>}
            </Button>
          ))}
        </nav>
      </div>
    </div>
  )
}
