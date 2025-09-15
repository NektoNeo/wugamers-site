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

  // Sort partners: featured first, then by category order, then by priority
  const sortedPartners = [...filteredPartners].sort((a: Partner, b: Partner) => {
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

  useEffect(() => {
    const scrollElement = scrollRef.current
    if (!scrollElement) return

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

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPaused, isDragging])

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
    const content = (
      <div
        className={cn(
          "group glassmorphism-card rounded-2xl px-6 py-5 md:px-7 md:py-6 flex items-center gap-4 min-w-[260px] md:min-w-[300px] lg:min-w-[340px] transition-all duration-300",
          partner.featured && "ring-2 ring-purple-500/65 shadow-[0_0_0_8px_rgba(139,92,246,0.15)] scale-[1.03]"
        )}
      >
        <div className="shrink-0 relative inline-flex items-center justify-center rounded-2xl bg-gradient-to-b from-[#7BCDC5]/10 to-[#7BCDC5]/5 p-3 md:p-4">
          <Image
            src={partner.logo}
            alt={partner.alt}
            width={partner.featured ? 56 : 48}
            height={partner.featured ? 56 : 48}
            className={cn(
              "object-contain",
              partner.featured ? "h-12 md:h-14 w-auto" : "h-10 md:h-12 w-auto"
            )}
          />
        </div>
        <div className="text-center md:text-left">
          <div className="text-sm md:text-[15px] font-medium text-gray-900">
            {partner.display_name}
          </div>
          <div className="mt-1 text-xs text-gray-600/70">
            {partner.category}
          </div>
        </div>
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