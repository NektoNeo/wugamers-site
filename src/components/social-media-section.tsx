"use client"

import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const socialLinks = [
  {
    id: 'telegram',
    name: 'Telegram',
    href: 'https://t.me/wugamers',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.85 5.18-4.68c.223-.198-.054-.308-.346-.11l-6.4 4.02-2.76-.918c-.6-.187-.612-.6.125-.89l10.782-4.156c.5-.18.94.12.78.88z"/>
      </svg>
    ),
    color: 'hover:text-[#0088cc]',
    bgColor: 'hover:bg-[#0088cc]/10'
  },
  {
    id: 'vk',
    name: 'VKontakte',
    href: 'https://vk.com/wugamers',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.344 16.163h-1.867c-1.055 0-1.232-.601-2.102-1.469-.785-.785-1.22-.183-1.202.935.006.297-.141.534-.495.534-1.105 0-2.694.156-4.304-1.58C6.656 12.724 5.5 10.16 5.5 10.16s-.095-.258.006-.381c.238-.278.908-.252.908-.252h1.602c.428 0 .528.234.618.457.298.696.782 1.882 1.492 2.731.877 1.046 1.266.532 1.266-.681V9.827c-.067-.946-.607-1.156-.607-1.156s-.238-.267.006-.508c.238-.239.689-.239.689-.239h2.744c.515 0 .699.222.699.77v3.016c0 .695.783.364 1.314-.223.817-.901 1.646-2.832 1.646-2.832s.141-.324.348-.387c.206-.063.48-.011.48-.011h1.804c1.101 0 .727.39.317 1.313-.633 1.431-2.866 3.635-2.866 3.635s-.177.262-.035.428c.163.19.725.669 1.095 1.108.698.83 1.281 1.468 1.173 2.293z"/>
      </svg>
    ),
    color: 'hover:text-[#4680C2]',
    bgColor: 'hover:bg-[#4680C2]/10'
  },
  {
    id: 'youtube',
    name: 'YouTube',
    href: 'https://youtube.com/@wugamers',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 12.209l-6.365 3.018c-.556.264-1.01-.071-1.01-.668V9.441c0-.597.454-.932 1.01-.668l6.365 3.018c.556.263.556.693 0 .957z"/>
      </svg>
    ),
    color: 'hover:text-[#FF0000]',
    bgColor: 'hover:bg-[#FF0000]/10'
  },
  {
    id: 'rutube',
    name: 'RuTube',
    href: 'https://rutube.ru/channel/wugamers',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 19.2c-3.976 0-7.2-3.224-7.2-7.2s3.224-7.2 7.2-7.2 7.2 3.224 7.2 7.2-3.224 7.2-7.2 7.2zm-1.8-10.8v7.2l5.4-3.6-5.4-3.6z"/>
      </svg>
    ),
    color: 'hover:text-[#00D959]',
    bgColor: 'hover:bg-[#00D959]/10'
  }
]

export default function SocialMediaSection() {
  return (
    <section
      className="relative overflow-hidden py-14 md:py-20 bg-gradient-to-r from-[#F1EDF8] to-[#E4F5F9]"
      aria-label="Социальные сети"
    >
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#2F3A46]">
            Присоединяйтесь к нам
          </h2>
          <p className="mt-3 text-base md:text-lg text-[rgba(47,58,70,0.70)]">
            Следите за новостями и анонсами мероприятий в наших социальных сетях
          </p>
        </div>

        {/* Social Links Grid */}
        <div className="mt-10 md:mt-12 flex flex-wrap justify-center gap-6 md:gap-8">
          {socialLinks.map((social) => (
            <Link
              key={social.id}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group relative flex flex-col items-center gap-3 p-6 md:p-8",
                "glassmorphism-card rounded-2xl",
                "transition-all duration-300 hover:scale-110",
                "hover:shadow-xl",
                social.bgColor
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center w-20 h-20 md:w-24 md:h-24",
                  "rounded-2xl transition-all duration-300",
                  "bg-white/50 group-hover:bg-white"
                )}
              >
                <div className={cn("text-[#6B7785] transition-colors", social.color)}>
                  {social.icon}
                </div>
              </div>
              <span className="text-sm md:text-base font-medium text-[#2F3A46] transition-colors">
                {social.name}
              </span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <p className="text-sm md:text-base text-[#6B7785]">
            Подписывайтесь на наши каналы, чтобы не пропустить важные события
          </p>
        </div>
      </div>
    </section>
  )
}