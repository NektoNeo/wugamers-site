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
  { text: "Главная", href: "#hero" },
  { text: "О нас", href: "#about" },
  { text: "Мероприятия", href: "#events" },
  { text: "Команда", href: "#team" },
  { text: "Партнёры", href: "#partners" },
  { text: "Контакты", href: "#contacts" },
]

export function SiteNav() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState("hero")

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8)

      // Update active section based on scroll position
      const sections = ["hero", "about", "events", "team", "partners", "contacts"]
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace("#", "")
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
      setIsOpen(false)
    }
  }

  const isActive = (href: string) => {
    const sectionId = href.replace("#", "")
    return activeSection === sectionId
  }

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200 glassmorphism",
        isScrolled
          ? "bg-white/95 shadow-lg"
          : "bg-white/85 backdrop-blur-xl"
      )}
      style={{
        "--tw-shadow-color": "rgba(99,123,139,0.08)",
      } as React.CSSProperties}
      aria-label="Основная навигация"
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white px-4 py-2 rounded-md">
        Перейти к содержанию
      </a>

      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 h-[80px] flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 flex items-center gap-3">
          <Image
            src="/brand/logo-mark.png"
            alt="АНО «Уникальный мир»"
            width={72}
            height={48}
            className="h-12 md:h-14 w-auto"
            priority
          />
          <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">WU GAMERS</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-1">
          {menuItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className={cn(
                  "text-[15px] md:text-[16px] transition-all px-4 py-2 rounded-full cursor-pointer",
                  isActive(item.href)
                    ? "text-white bg-gradient-to-r from-purple-500 to-purple-600 shadow-md"
                    : "text-[#616A78] hover:text-purple-600 hover:bg-purple-50"
                )}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA and Mobile Menu */}
        <div className="flex items-center gap-3">
          <Button
            asChild
            className="btn-purple-gradient inline-flex items-center gap-2 rounded-full px-5 md:px-6 py-2.5 md:py-3 text-[15px] font-semibold transition-all"
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
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleClick(e, item.href)}
                    className={cn(
                      "text-lg py-2 px-2 rounded-md transition-colors cursor-pointer",
                      isActive(item.href)
                        ? "text-[#2F3A46] bg-gray-50"
                        : "text-[#616A78] hover:text-[#2F3A46] hover:bg-gray-50"
                    )}
                  >
                    {item.text}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}