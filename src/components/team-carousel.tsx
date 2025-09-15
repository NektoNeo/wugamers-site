"use client"

import * as React from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import teamData from "@/data/team.json"

export default function TeamCarousel() {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = React.useState(false)
  const [canScrollRight, setCanScrollRight] = React.useState(true)
  const [isPaused, setIsPaused] = React.useState(false)
  const animationRef = React.useRef<number>()
  const progressRef = React.useRef(0)

  const checkScrollButtons = React.useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }, [])

  React.useEffect(() => {
    checkScrollButtons()
    window.addEventListener("resize", checkScrollButtons)
    return () => window.removeEventListener("resize", checkScrollButtons)
  }, [checkScrollButtons])

  // Auto-scroll effect (opposite direction from partners, same as gratitude)
  React.useEffect(() => {
    const scrollElement = scrollContainerRef.current
    if (!scrollElement) return

    const animate = () => {
      if (!isPaused && scrollElement) {
        progressRef.current -= 0.4 // Negative for opposite direction, slightly faster

        const maxScroll = scrollElement.scrollWidth - scrollElement.clientWidth
        if (progressRef.current <= 0) {
          progressRef.current = maxScroll
        }

        scrollElement.scrollLeft = progressRef.current
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPaused])

  const scrollByCardWidth = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return

    const container = scrollContainerRef.current
    const cardWidth = container.querySelector(".team-card")?.clientWidth || 320
    const gap = 24 // gap between cards
    const scrollAmount = cardWidth + gap

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    })
  }

  return (
    <section
      className="relative overflow-hidden py-14 md:py-20 bg-gradient-to-r from-[#E4F5F9] to-[#F1EDF8]"
      aria-label="Команда проекта — карусель"
    >
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#2F3A46]">
            Команда
          </h2>
          <p className="mt-3 text-base md:text-lg text-[rgba(47,58,70,0.70)]">
            Профессиональная команда экспертов, объединённых общей миссией создания инклюзивного киберспорта
          </p>
        </div>

        {/* Carousel */}
        <div
          className="mt-10 md:mt-12 relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[rgba(228,245,249,1)] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[rgba(241,237,248,1)] to-transparent z-10" />

          {/* Scroll container */}
          <div
            ref={scrollContainerRef}
            className="relative snap-x snap-mandatory overflow-x-auto overflow-y-visible no-scrollbar scroll-smooth -mx-4 px-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            onScroll={checkScrollButtons}
            role="list"
            aria-label="Слайдер команды, прокрутка по горизонтали"
          >
            <style jsx>{`
              .no-scrollbar::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            <div className="flex gap-5 md:gap-6 items-stretch">
              {teamData.members.map((member) => (
                <Card
                  key={member.id}
                  className="team-card group snap-start shrink-0 w-[260px] md:w-[320px] lg:w-[360px] glassmorphism-card rounded-[1rem] overflow-hidden focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500/60"
                  role="listitem"
                >
                  <CardContent className="p-0">
                    {/* Photo */}
                    <div className="relative aspect-[3/4] bg-[rgba(99,123,139,0.06)] overflow-hidden">
                      {member.photo ? (
                        <Image
                          src={member.photo}
                          alt={member.alt}
                          fill
                          className="object-cover object-[center_20%]"
                          sizes="(min-width: 1024px) 360px, (min-width: 768px) 320px, 260px"
                          loading="lazy"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-[#6B7785]/40">
                          <div className="text-center">
                            <div className="text-6xl mb-2">👤</div>
                            <div className="text-sm">Фото</div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Body */}
                    <div className="p-4 md:p-5">
                      <h3 className="text-[17px] md:text-lg font-semibold text-[#2F3A46]">
                        {member.name}
                      </h3>

                      {member.badge && (
                        <span className="mt-2 inline-flex items-center gap-2 text-[13px] px-3 py-1 rounded-full bg-[rgba(123,205,197,0.12)] text-[#5BA8A8]">
                          {member.badge}
                        </span>
                      )}

                      <p className="mt-2 text-[15px] leading-6 text-[#6B7785]">
                        {member.bio}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="hidden md:flex absolute inset-y-1/2 -translate-y-1/2 left-2 right-2 justify-between pointer-events-none">
            <Button
              onClick={() => scrollByCardWidth("left")}
              disabled={!canScrollLeft}
              className={cn(
                "pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow border border-[rgba(99,123,139,0.18)] hover:bg-white transition-all p-0",
                !canScrollLeft && "opacity-50 cursor-not-allowed"
              )}
              aria-label="Предыдущие участники"
            >
              <ChevronLeft className="h-5 w-5 text-[#2F3A46]" />
            </Button>

            <Button
              onClick={() => scrollByCardWidth("right")}
              disabled={!canScrollRight}
              className={cn(
                "pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow border border-[rgba(99,123,139,0.18)] hover:bg-white transition-all p-0",
                !canScrollRight && "opacity-50 cursor-not-allowed"
              )}
              aria-label="Следующие участники"
            >
              <ChevronRight className="h-5 w-5 text-[#2F3A46]" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}