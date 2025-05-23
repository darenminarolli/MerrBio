"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { Menu, ShoppingCart } from 'lucide-react'
import { useAuth } from '@/contexts/UserContext'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const { user, isAuthenticated } = useAuth()
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleScrollToSection = () => {
    const section = document.getElementById("contact-section")
    section?.scrollIntoView({ behavior: "smooth" })
  }

  const handleLogout = async () => {
    localStorage.removeItem("user")
    try {
      const res = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
      const data = await res.json()
      if (!res.ok) {
   
      } else {
        console.log("User logged out:", data)
        localStorage.setItem("user", JSON.stringify(data.user))
        window.location.href = "/"
      }
    } catch (err) {
      alert("Error during logout")
    }
    window.location.href = "/auth/signin"
  }

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"}`}
    >
      <div className="container flex h-20 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 16a6 6 0 1 1 6-6 6 6 0 0 1-6 6z" />
                <path d="M12 8v8" />
                <path d="M8 12h8" />
              </svg>
            </div>
            <span className="text-2xl font-bold tracking-tight">MerrBio</span>
          </Link>
        </div>
        <nav className="hidden md:flex md:items-center md:gap-8">
          <Link href="/shop" className="text-sm font-medium hover:text-emerald-600 transition-colors">
            Shop
          </Link>
          <button onClick={handleScrollToSection} className="text-sm font-medium text-foreground hover:text-emerald-600 transition-colors bg-transparent p-0 border-none">
            Farmers
          </button>
          <Link href="/infos/how-it-works" className="text-sm font-medium hover:text-emerald-600 transition-colors">
            How It Works
          </Link>
          <Link href="/about-us" className="text-sm font-medium hover:text-emerald-600 transition-colors">
            About Us
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative" onClick={() => setCartOpen(true)}>
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-xs text-white">
            </span>
            <span className="sr-only">Shopping Cart</span>
          </Button>
          {isAuthenticated && user ? (
            user.role === 'client' ? (
              <div className="hidden md:flex md:gap-3">
                <Button variant="ghost" onClick={handleLogout} className="hover:text-emerald-600 transition-colors">
                  Logout
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex md:gap-3">
                <Link href={user.role==='admin'?'/admin': "/profile"}>
                  <Button variant="ghost" className="hover:text-emerald-600 transition-colors">
                    Profile
                  </Button>
                </Link>
              </div>
            )
          ) : (
            <div className="hidden md:flex md:gap-3">
              <Link href="/auth/signin">
                <Button variant="ghost" className="hover:text-emerald-600 transition-colors">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-6">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between border-b pb-4">
                  <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 16a6 6 0 1 1 6-6 6 6 0 0 1-6 6z" />
                        <path d="M12 8v8" />
                        <path d="M8 12h8" />
                      </svg>
                    </div>
                    <span className="text-xl font-bold">MerrBio</span>
                  </Link>
                </div>
                <nav className="flex flex-col gap-6 py-8">
                  <Link href="/shop" className="text-lg font-medium">
                    Shop
                  </Link>
                  <Link href="#" className="text-lg font-medium">
                    Farmers
                  </Link>
                  <Link href="infos/how-it-works" className="text-lg font-medium">
                    How It Works
                  </Link>
                  <Link href="/about-us" className="text-lg font-medium">
                    About Us
                  </Link>
                </nav>
                {isAuthenticated && user ? (
                  user.role === 'client' ? (
                    <div className="mt-auto border-t pt-6 flex flex-col gap-3">
                      <Button variant="outline" onClick={handleLogout} className="w-full justify-start">
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <div className="hidden md:flex md:gap-3">
                      <Link href={user.role==='admin'?'/admin':"/profile"}>
                        <Button variant="ghost" className="hover:text-emerald-600 transition-colors">
                          Profile
                        </Button>
                      </Link>
                    </div>
                  )
                ) : (
                  <div className="mt-auto border-t pt-6 flex flex-col gap-3">
                    <Link href="/auth/signin">
                      <Button variant="outline" className="w-full justify-start">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/auth/signup">
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export default Header
