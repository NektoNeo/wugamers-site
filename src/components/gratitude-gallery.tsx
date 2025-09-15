"use client"

import React, { useState, useRef, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from '@/components/ui/dialog'
import { Download, ChevronLeft, ChevronRight } from 'lucide-react'
import gratitudeData from '@/data/gratitude.json'

interface GratitudeItem {
  id: string
  title: string
  issuer: string
  date?: string | null
  date_label?: string | null
  full: string
  thumb?: string | null
  tags?: string[]
}

export default function GratitudeGallery() {
  const [selectedImage, setSelectedImage] = useState<GratitudeItem | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const animationRef = useRef<number>()
  const progressRef = useRef(0)

  // Группируем элементы по 4 для десктопа
  const itemsPerSlide = 4
  const totalSlides = Math.ceil(gratitudeData.items.length / itemsPerSlide)

  const checkScrollButtons = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }, [])

  useEffect(() => {
    checkScrollButtons()
    window.addEventListener("resize", checkScrollButtons)
    return () => window.removeEventListener("resize", checkScrollButtons)
  }, [checkScrollButtons])

  // Auto-scroll effect (opposite direction from partners)
  useEffect(() => {
    const scrollElement = scrollContainerRef.current
    if (!scrollElement) return

    const animate = () => {
      if (!isPaused && scrollElement) {
        progressRef.current -= 0.3 // Negative for opposite direction

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

  const scrollToSlide = (slideIndex: number) => {
    if (!scrollContainerRef.current) return

    const container = scrollContainerRef.current
    const cardWidth = container.querySelector('.gratitude-card')?.clientWidth || 300
    const gap = 24
    const scrollAmount = slideIndex * (itemsPerSlide * (cardWidth + gap))

    container.scrollTo({
      left: scrollAmount,
      behavior: 'smooth'
    })

    setCurrentSlide(slideIndex)
  }

  const handleScroll = () => {
    if (!scrollContainerRef.current) return

    const container = scrollContainerRef.current
    const cardWidth = container.querySelector('.gratitude-card')?.clientWidth || 300
    const gap = 24
    const slideWidth = itemsPerSlide * (cardWidth + gap)
    const newSlide = Math.round(container.scrollLeft / slideWidth)

    setCurrentSlide(newSlide)
    checkScrollButtons()
  }

  const scrollByDirection = (direction: "left" | "right") => {
    const newSlide = direction === "left"
      ? Math.max(0, currentSlide - 1)
      : Math.min(totalSlides - 1, currentSlide + 1)

    scrollToSlide(newSlide)
  }

  const handleDownload = async (url: string, filename: string) => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(downloadUrl)
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  const stats = [
    { value: "15+", label: "Официальных благодарностей" },
    { value: "200+", label: "Благодарностей от семей" },
    { value: "5", label: "Государственных наград" }
  ]

  return (
    <section
      className="relative overflow-hidden py-14 md:py-20 bg-gradient-to-r from-[#E4F5F9] to-[#F1EDF8]"
      aria-label="Письма благодарности — галерея грамот"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2F3A46]">
            Благодарности
          </h2>
          <p className="mt-3 text-base md:text-lg text-[#6B7785]">
            Признание нашей работы от государственных структур, партнёров и участников проекта
          </p>
        </div>

        {/* Carousel */}
        <div
          className="mt-10 md:mt-12 relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Scroll container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
            onScroll={handleScroll}
            role="list"
            aria-label="Карусель благодарностей"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <style jsx>{`
              .no-scrollbar::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {gratitudeData.items.map((item: GratitudeItem) => (
              <Dialog key={item.id}>
                <DialogTrigger asChild>
                  <div
                    className="gratitude-card snap-start shrink-0 w-[280px] md:w-[calc(25%-18px)] group glassmorphism-card rounded-2xl overflow-hidden transition-all cursor-pointer"
                    role="listitem"
                    onClick={() => setSelectedImage(item)}
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                      <Image
                        src={item.thumb || item.full}
                        alt={item.title}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-[17px] font-semibold text-[#2F3A46] line-clamp-2">
                        {item.title}
                      </h3>
                      {item.issuer && item.issuer !== "—" && (
                        <p className="mt-1 text-[13px] text-[#6B7785]">
                          {item.issuer}
                        </p>
                      )}
                    </div>
                  </div>
                </DialogTrigger>

                <DialogContent
                  className="max-w-4xl bg-white/95 backdrop-blur-sm p-0 overflow-hidden"
                >
                  <DialogTitle className="sr-only">{item.title}</DialogTitle>
                  <div className="relative">
                    {/* Full Image */}
                    <div className="relative max-h-[80vh] overflow-auto">
                      <Image
                        src={item.full}
                        alt={item.title}
                        width={1200}
                        height={900}
                        className="w-full h-auto"
                      />
                    </div>

                    {/* Info Bar */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                      <div className="flex items-end justify-between">
                        <div>
                          <h3 className="text-xl font-semibold">{item.title}</h3>
                          {item.issuer && item.issuer !== "—" && (
                            <p className="text-sm mt-1 opacity-90">{item.issuer}</p>
                          )}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDownload(item.full, `${item.id}.jpg`)
                          }}
                          className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
                          aria-label="Скачать изображение"
                        >
                          <Download className="w-4 h-4" />
                          <span className="text-sm">Скачать</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="hidden md:flex absolute inset-y-1/2 -translate-y-1/2 -left-5 -right-5 justify-between pointer-events-none">
            <button
              onClick={() => scrollByDirection("left")}
              disabled={!canScrollLeft}
              className={cn(
                "pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg border border-gray-200 hover:bg-white transition-all",
                !canScrollLeft && "opacity-50 cursor-not-allowed"
              )}
              aria-label="Предыдущие благодарности"
            >
              <ChevronLeft className="h-5 w-5 text-[#2F3A46]" />
            </button>

            <button
              onClick={() => scrollByDirection("right")}
              disabled={!canScrollRight}
              className={cn(
                "pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg border border-gray-200 hover:bg-white transition-all",
                !canScrollRight && "opacity-50 cursor-not-allowed"
              )}
              aria-label="Следующие благодарности"
            >
              <ChevronRight className="h-5 w-5 text-[#2F3A46]" />
            </button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToSlide(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  currentSlide === index
                    ? "bg-[#5C9897] w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                )}
                aria-label={`Перейти к слайду ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-12 md:mt-16 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white/60 rounded-2xl p-6 border border-gray-200/50 shadow-lg">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center py-4 sm:py-0"
            >
              <div className="text-2xl md:text-3xl font-bold text-[#5C9897]">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-[#6B7785]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}