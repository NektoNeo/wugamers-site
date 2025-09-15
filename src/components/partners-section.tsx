"use client"

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import partnersData from '@/data/partners.json'

interface Partner {
  id: string
  display_name: string
  category: string
  priority: number
  featured?: boolean
  logo: string
  href?: string | null
  alt: string
  approved: boolean
}

export default function PartnersSection() {
  const [isPaused, setIsPaused] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()
  const progressRef = useRef(0)

  // Filter and sort partners according to spec
  const filteredPartners = partnersData.items.filter((partner: Partner) => {
    const excludeList = partnersData.meta.exclude || []
    return !excludeList.some(excluded =>
      partner.display_name.toLowerCase().includes(excluded.toLowerCase())
    )
  })

  // Sort partners: VA-PC and VA-STUDIO first, then featured, then by category order, then by priority
  const sortedPartners = [...filteredPartners].sort((a: Partner, b: Partner) => {
    // VA-PC and VA-STUDIO always first
    if (a.id === 'va-pc') return -1
    if (b.id === 'va-pc') return 1
    if (a.id === 'va-studio') return -1
    if (b.id === 'va-studio') return 1

    // Featured first
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1

    // Then by category order
    const categoryOrder = partnersData.meta.ordering
    const aIndex = categoryOrder.indexOf(a.category)
    const bIndex = categoryOrder.indexOf(b.category)

    if (aIndex !== bIndex) {
      return aIndex - bIndex
    }

    // Then by priority
    return b.priority - a.priority
  })

  // Duplicate for seamless loop
  const partners = [...sortedPartners, ...sortedPartners]

  // Initialize scroll position to center VA-PC and VA-STUDIO
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const scrollElement = scrollRef.current
    if (!scrollElement || isInitialized) return

    // Find the first partner card to calculate width
    const cards = scrollElement.querySelectorAll('.partner-logo')
    if (cards.length > 0) {
      const firstCard = cards[0] as HTMLElement
      const containerWidth = scrollElement.clientWidth
      const cardWidth = firstCard.offsetWidth
      const gap = 20 // gap between cards

      // Calculate position to center the first two logos (VA-PC and VA-STUDIO)
      const scrollPosition = 0 // Start at beginning since VA-PC is first
      scrollElement.scrollLeft = scrollPosition
      progressRef.current = scrollPosition
      setIsInitialized(true)
    }
  }, [])

  useEffect(() => {
    const scrollElement = scrollRef.current
    if (!scrollElement || !isInitialized) return

    const animate = () => {
      if (!isPaused && !isDragging && scrollElement) {
        progressRef.current += 0.5 // Speed in pixels per frame

        const maxScroll = scrollElement.scrollWidth / 2
        if (progressRef.current >= maxScroll) {
          progressRef.current = 0
        }

        scrollElement.scrollLeft = progressRef.current
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    // Start animation after a short delay
    const timeoutId = setTimeout(() => {
      animationRef.current = requestAnimationFrame(animate)
    }, 3000) // 3 second delay before auto-scroll starts

    return () => {
      clearTimeout(timeoutId)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPaused, isDragging, isInitialized])

  const handleMouseDown = (e: React.MouseEvent) => {
    const scrollElement = scrollRef.current
    if (!scrollElement) return

    setIsDragging(true)
    setStartX(e.pageX - scrollElement.offsetLeft)
    setScrollLeft(scrollElement.scrollLeft)
    scrollElement.classList.add('dragging')
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()

    const scrollElement = scrollRef.current
    if (!scrollElement) return

    const x = e.pageX - scrollElement.offsetLeft
    const walk = (x - startX) * 1.5
    const newScrollLeft = scrollLeft - walk

    scrollElement.scrollLeft = newScrollLeft
    progressRef.current = newScrollLeft
  }

  const handleMouseUp = () => {
    const scrollElement = scrollRef.current
    if (scrollElement) {
      scrollElement.classList.remove('dragging')
    }
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp()
    }
    setIsPaused(false)
  }

  const PartnerCard = ({ partner }: { partner: Partner }) => {
    const isVAPC = partner.id === 'va-pc'
    const isVAStudio = partner.id === 'va-studio'
    const isSpecialPartner = isVAPC || isVAStudio

    const content = (
      <div
        className={cn(
          "partner-logo group glassmorphism-card rounded-2xl p-6 md:p-8 flex items-center justify-center min-w-[140px] md:min-w-[180px] lg:min-w-[200px] h-[140px] md:h-[180px] lg:h-[200px] transition-all duration-300 hover:scale-105",
          partner.featured && !isSpecialPartner && "ring-2 ring-purple-500/30 shadow-[0_0_20px_rgba(139,92,246,0.2)]",
          isSpecialPartner && "scale-110 ring-2 ring-[#7BCDC5] bg-gradient-to-br from-white/95 to-[#7BCDC5]/20 shadow-[0_0_30px_rgba(123,205,197,0.4)]"
        )}
      >
        <Image
          src={partner.logo}
          alt={partner.alt}
          width={isSpecialPartner ? 120 : partner.featured ? 100 : 80}
          height={isSpecialPartner ? 120 : partner.featured ? 100 : 80}
          className={cn(
            "object-contain pointer-events-none select-none",
            isSpecialPartner ? "h-28 md:h-32 lg:h-36 w-auto" :
            partner.featured ? "h-20 md:h-24 lg:h-28 w-auto" :
            "h-16 md:h-20 lg:h-24 w-auto"
          )}
          draggable={false}
        />
      </div>
    )

    if (partner.href) {
      return (
        <a
          href={partner.href}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          {content}
        </a>
      )
    }

    return content
  }

  return (
    <section
      className="relative overflow-hidden py-14 md:py-20 bg-gradient-to-r from-[#F1F6FB] to-[#F4EFF8]"
      aria-label="Карусель логотипов партнёров"
    >
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
            Партнёры
          </h2>
          <p className="mt-3 text-base md:text-lg text-gray-700/70">
            Вместе мы создаём инклюзивное киберспортивное сообщество
          </p>
        </div>

        <div
          className="mt-10 md:mt-12 relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={handleMouseLeave}
        >
          {/* Fade gradients */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 md:w-20 bg-gradient-to-r from-[#F1F6FB] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 md:w-20 bg-gradient-to-l from-[#F4EFF8] to-transparent z-10" />

          {/* Marquee track */}
          <div className="relative overflow-hidden">
            <div
              ref={scrollRef}
              className="flex overflow-x-hidden draggable-carousel"
              role="list"
              aria-label="Лента логотипов, прокручивается автоматически"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            >
              <div className="flex items-center gap-5 md:gap-6 will-change-transform">
                {partners.map((partner, index) => (
                  <div key={`${partner.id}-${index}`} role="listitem">
                    <PartnerCard partner={partner} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}