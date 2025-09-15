"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

const menuItems = [
  { text: "Главная", href: "/" },
  { text: "О нас", href: "/about" },
  { text: "Мероприятия", href: "/events" },
  { text: "Команда", href: "/team" },
  { text: "Партнёры", href: "/partners" },
  { text: "Контакты", href: "/contacts" },
]

export function SiteNav() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled
          ? "bg-white/95 shadow-[0_6px_20px_-8px_rgba(15,45,52,0.10)]"
          : "bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-[0_1px_0_0_rgba(99,123,139,0.08)]"
      )}
      style={{
        "--tw-shadow-color": "rgba(99,123,139,0.08)",
      } as React.CSSProperties}
      aria-label="Основная навигация"
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white px-4 py-2 rounded-md">
        Перейти к содержанию
      </a>

      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 h-[72px] flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/assets/brand/logo-mark.png"
            alt="АНО «Уникальный мир»"
            width={48}
            height={32}
            className="h-7 md:h-8 w-auto"
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-1">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "text-[15px] md:text-[16px] transition-colors px-3 py-2 rounded-md",
                  isActive(item.href)
                    ? "text-[#2F3A46]"
                    : "text-[#616A78] hover:text-[#2F3A46]"
                )}
              >
                {item.text}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA and Mobile Menu */}
        <div className="flex items-center gap-3">
          <Button
            asChild
            className="inline-flex items-center gap-2 rounded-full px-4 md:px-5 py-2.5 text-[15px] font-medium shadow-sm bg-gradient-to-r from-[#7BCDC5] to-[#8DDCDA] text-[#0F2A2E] hover:opacity-90 transition-opacity"
          >
            <a
              href="https://t.me/wugamers"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Открыть Telegram для участия"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Принять участие</span>
            </a>
          </Button>

          {/* Mobile Menu Trigger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden h-10 w-10 rounded-md border-[rgba(99,123,139,0.18)]"
                aria-label="Открыть меню"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
              <SheetHeader className="p-4 border-b">
                <SheetTitle>Меню</SheetTitle>
              </SheetHeader>
              <nav className="p-4 flex flex-col gap-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-lg py-2 px-2 rounded-md transition-colors",
                      isActive(item.href)
                        ? "text-[#2F3A46] bg-gray-50"
                        : "text-[#616A78] hover:text-[#2F3A46] hover:bg-gray-50"
                    )}
                  >
                    {item.text}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}