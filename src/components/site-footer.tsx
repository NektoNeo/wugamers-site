import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { LINKS } from '@/lib/config'
import {
  Send,
  UsersRound,
  PlayCircle,
  Video,
  Mail,
  Phone,
  LifeBuoy
} from 'lucide-react'

export default function SiteFooter() {
  const currentYear = new Date().getFullYear()

  const socials = [
    {
      id: 'tg',
      icon: <Send className="w-5 h-5" />,
      label: 'Telegram',
      href: LINKS.telegram
    },
    {
      id: 'vk',
      icon: <UsersRound className="w-5 h-5" />,
      label: 'VK',
      href: LINKS.vk
    },
    {
      id: 'yt',
      icon: <PlayCircle className="w-5 h-5" />,
      label: 'YouTube',
      href: LINKS.youtube
    },
    {
      id: 'rt',
      icon: <Video className="w-5 h-5" />,
      label: 'RuTube',
      href: LINKS.rutube
    }
  ]

  const navLinks = [
    { label: 'О проекте', href: '/#about' },
    { label: 'Миссия и цели', href: '/#mission' },
    { label: 'Принять участие', href: '/#join' },
    { label: 'Поддержать проект', href: '/#donate' }
  ]

  const contactLinks = [
    {
      label: LINKS.contacts.email,
      href: `mailto:${LINKS.contacts.email}`,
      icon: <Mail className="w-4 h-4" />
    },
    {
      label: LINKS.contacts.phone,
      href: `tel:${LINKS.contacts.phone.replace(/\D/g, '')}`,
      icon: <Phone className="w-4 h-4" />
    },
    {
      label: 'cio@wugamers.ru',
      href: 'mailto:cio@wugamers.ru',
      icon: <LifeBuoy className="w-4 h-4" />
    }
  ]

  const midRowLinks = [
    { label: 'Новости', href: '/news' },
    { label: 'Партнёры', href: '/#partners' },
    { label: 'Команда', href: '/#team' },
    { label: 'Контакты', href: '/#contacts' }
  ]

  return (
    <footer
      className="relative bg-[radial-gradient(120%_120%_at_0%_0%,#12212B_0%,#0E1A22_40%,#0B1720_100%)] text-white/90"
      role="contentinfo"
    >
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
        {/* Brand Column */}
        <div className="md:col-span-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#7BCDC5] to-[#5C9897] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">WU</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Мир уникальных геймеров
              </h3>
              <p className="text-sm text-white/60">WUGamers</p>
            </div>
          </div>
          <p className="text-sm text-white/70 max-w-md">
            Специальный инклюзивный проект по киберспорту и кибербезопасности для детей, подростков и молодёжи с ограниченными возможностями.
          </p>

          {/* Social Links */}
          <div className="flex gap-3 mt-6" aria-label="Социальные сети организации">
            {socials.map((social) => (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7BCDC5] focus:ring-offset-[#0E1A22]"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Navigation Column */}
        <div className="md:col-span-3">
          <h4 className="text-white font-semibold mb-4">Навигация</h4>
          <nav aria-label="Навигация по сайту">
            <ul className="space-y-3">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Contacts Column */}
        <div className="md:col-span-3">
          <h4 className="text-white font-semibold mb-4">Контакты</h4>
          <div className="space-y-3" aria-label="Контактная информация">
            {contactLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm"
              >
                {link.icon}
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 border-t border-white/10" />

      {/* Mid Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-white/60 text-sm">
        {midRowLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="hover:text-white transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 flex flex-col md:flex-row items-center md:items-start justify-between gap-4 text-sm text-white/60">
        <p>© {currentYear} АНО «Уникальный мир». Все права защищены.</p>
        <div className="flex gap-6">
          <Link
            href="/legal/privacy"
            className="hover:text-white transition-colors"
          >
            Политика конфиденциальности
          </Link>
          <Link
            href="/legal/terms"
            className="hover:text-white transition-colors"
          >
            Пользовательское соглашение
          </Link>
        </div>
      </div>
    </footer>
  )
}