"use client"

import { cn } from "@/lib/utils"
import { BarChart3, Users, ShoppingBasket, Settings, LogOut, Menu, X, Home, Leaf } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const routes = [
  {
    label: "Dashboard",
    icon: Home,
    href: "/admin",
    color: "text-sky-500",
  },
  {
    label: "Farmers",
    icon: Leaf,
    href: "/admin/farmers",
    color: "text-green-500",
  },
  {
    label: "Clients",
    icon: Users,
    href: "/admin/clients",
    color: "text-violet-500",
  },
  {
    label: "Products",
    icon: ShoppingBasket,
    href: "/admin/products",
    color: "text-orange-500",
  },
  {
    label: "Analytics",
    icon: BarChart3,
    href: "/admin/analytics",
    color: "text-yellow-500",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/admin/settings",
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    // In a real app, you would handle logout logic here
    // For now, we'll just redirect to the auth page
    router.push("/auth")
  }

  return (
    <>
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-white shadow-lg transition-transform duration-300 md:relative md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/admin" className="flex items-center gap-2 font-bold text-xl">
            <Leaf className="h-6 w-6 text-green-600" />
            <span>MerrBio Admin</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-4">
          <nav className="grid items-start px-4 text-sm">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-foreground",
                  pathname === route.href ? "bg-muted text-foreground font-medium" : "text-muted-foreground",
                )}
                onClick={() => setIsOpen(false)}
              >
                <route.icon className={cn("h-5 w-5", route.color)} />
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto border-t p-4">
          <Button variant="outline" className="w-full justify-start gap-2" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </>
  )
}
