"use client"

import React from 'react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

const floatingCards = [
  {
    id: 1,
    title: "Киберспорт для всех",
    description: "Создаем равные возможности в цифровом мире",
    icon: "🎮",
    position: "top-20 left-10",
    delay: "0s",
    color: "from-purple-400 to-pink-400"
  },
  {
    id: 2,
    title: "Инклюзивность",
    description: "Объединяем людей через игры и технологии",
    icon: "🤝",
    position: "top-40 right-20",
    delay: "2s",
    color: "from-blue-400 to-cyan-400"
  },
  {
    id: 3,
    title: "Развитие навыков",
    description: "Помогаем раскрыть потенциал каждого участника",
    icon: "🚀",
    position: "bottom-32 left-16",
    delay: "4s",
    color: "from-teal-400 to-green-400"
  },
  {
    id: 4,
    title: "Сообщество",
    description: "Строим дружественную и поддерживающую среду",
    icon: "💜",
    position: "bottom-20 right-10",
    delay: "6s",
    color: "from-pink-400 to-purple-400"
  }
]

export default function GlassFloatingCards() {
  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {floatingCards.map((card) => (
        <div
          key={card.id}
          className={`absolute ${card.position} pointer-events-auto hidden lg:block`}
          style={{ animationDelay: card.delay }}
        >
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="glassmorphism-card rounded-2xl p-4 cursor-pointer animate-float-advanced hover:scale-110 transition-all duration-300">
                <div className="text-3xl mb-2">{card.icon}</div>
                <h3 className={`text-sm font-semibold bg-gradient-to-r ${card.color} bg-clip-text text-transparent`}>
                  {card.title}
                </h3>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="glass-vibrant border-white/20 text-white">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">{card.title}</h4>
                <p className="text-xs text-white/80">{card.description}</p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      ))}
    </div>
  )
}