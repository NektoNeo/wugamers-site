"use client"

import React, { useState, useEffect, FormEvent } from 'react'
import { LINKS } from '@/lib/config'
import { cn } from '@/lib/utils'
import {
  Mail,
  Phone,
  LifeBuoy,
  Send,
  Download,
  MapPin,
  FileText,
  Youtube,
  MessageCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

declare global {
  interface Window {
    ymaps: any
    initYMap: () => void
  }
}

export default function ContactsSection() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  useEffect(() => {
    // Load Yandex Maps script
    if (!document.getElementById('yandex-maps-script')) {
      const script = document.createElement('script')
      script.id = 'yandex-maps-script'
      script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU'
      script.async = true
      script.defer = true

      script.onload = () => {
        window.initYMap = () => {
          if (window.ymaps && window.ymaps.ready) {
            window.ymaps.ready(() => {
              const map = new window.ymaps.Map('yandex-map', {
                center: [55.7558, 37.6173],
                zoom: 10
              })

              window.ymaps.geocode('Москва, Россия').then((result: any) => {
                const firstGeoObject = result.geoObjects.get(0)
                if (firstGeoObject) {
                  const coords = firstGeoObject.geometry.getCoordinates()
                  map.geoObjects.add(
                    new window.ymaps.Placemark(coords, {
                      balloonContent: 'АНО «Уникальный мир» — Центральный офис'
                    })
                  )
                  map.setCenter(coords, 12)
                }
              })
            })
          }
        }
        window.initYMap()
      }

      document.head.appendChild(script)
    }

    return () => {
      const script = document.getElementById('yandex-maps-script')
      if (script) {
        script.remove()
      }
    }
  }, [])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name || formData.name.length < 2) {
      newErrors.name = 'Имя должно содержать минимум 2 символа'
    }

    if (!formData.email) {
      newErrors.email = 'Email обязателен'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Введите корректный email'
    }

    if (formData.message && formData.message.length > 3000) {
      newErrors.message = 'Сообщение не должно превышать 3000 символов'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setSubmitStatus('idle')

    try {
      // Симуляция отправки формы
      await new Promise(resolve => setTimeout(resolve, 1000))

      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })

      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    } catch (error) {
      setSubmitStatus('error')
      console.error('Form submission error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const channels = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Основная почта',
      value: LINKS.contacts.email,
      href: `mailto:${LINKS.contacts.email}`
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: 'Телефон',
      value: LINKS.contacts.phone,
      href: `tel:${LINKS.contacts.phone.replace(/\D/g, '')}`
    },
    {
      icon: <LifeBuoy className="w-5 h-5" />,
      label: 'Тех. поддержка',
      value: 'cio@wugamers.ru',
      href: 'mailto:cio@wugamers.ru'
    }
  ]

  const documents = [
    {
      title: 'Презентация',
      meta: 'PDF',
      href: LINKS.docs.ru
    },
    {
      title: 'Presentation ENG',
      meta: 'PDF',
      href: LINKS.docs.en
    }
  ]

  const quickLinks = [
    {
      icon: <Youtube className="w-4 h-4" />,
      label: 'Проморолик',
      href: LINKS.youtube
    },
    {
      icon: <FileText className="w-4 h-4" />,
      label: 'Презентация',
      href: LINKS.docs.ru
    },
    {
      icon: <MessageCircle className="w-4 h-4" />,
      label: 'Telegram',
      href: LINKS.telegram
    }
  ]

  return (
    <section
      className="relative overflow-hidden py-14 md:py-20 bg-gradient-to-r from-[#F7F9FB] to-[#F1EDF8]"
      aria-label="Контакты"
    >
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#2F3A46]">
            Контакты
          </h2>
          <p className="mt-3 text-base md:text-lg text-gray-600">
            Свяжитесь с нами для участия в проектах или получения дополнительной информации
          </p>
        </div>

        {/* Grid Layout */}
        <div className="mt-10 md:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-7">
          {/* Map Card */}
          <Card className="rounded-2xl border border-gray-200/50 bg-white/70 shadow-xl p-0 overflow-hidden">
            <div
              id="yandex-map"
              className="h-[260px] md:h-[340px] w-full"
              aria-label="Карта расположения офиса"
            />
          </Card>

          {/* Contact Form Card */}
          <Card className="rounded-2xl border border-gray-200/50 bg-white/70 shadow-xl p-6 md:p-7">
            <h3 className="text-xl font-semibold text-[#2F3A46] mb-5">
              Отправить сообщение
            </h3>

            <form onSubmit={handleSubmit} aria-label="Форма обратной связи">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Ваше имя *
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={cn(
                      "w-full rounded-lg",
                      errors.name && "border-red-500"
                    )}
                    required
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Ваш e‑mail *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={cn(
                      "w-full rounded-lg",
                      errors.email && "border-red-500"
                    )}
                    required
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Сообщение
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={5}
                    className={cn(
                      "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#7BCDC5] focus:outline-none focus:ring-1 focus:ring-[#7BCDC5]",
                      errors.message && "border-red-500"
                    )}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500">{errors.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-[#7BCDC5] to-[#8DDCDA] text-[#0F2A2E] hover:opacity-90"
                >
                  {isLoading ? (
                    'Отправка...'
                  ) : (
                    <>
                      Отправить
                      <Send className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>

                {submitStatus === 'success' && (
                  <p className="text-sm text-green-600 text-center">
                    Сообщение успешно отправлено!
                  </p>
                )}

                {submitStatus === 'error' && (
                  <p className="text-sm text-red-600 text-center">
                    Произошла ошибка. Попробуйте позже.
                  </p>
                )}

                <p className="text-xs text-gray-500 text-center mt-3">
                  Отправляя форму, вы соглашаетесь с обработкой персональных данных
                </p>
              </div>
            </form>
          </Card>

          {/* Contact Info Card */}
          <Card className="rounded-2xl border border-gray-200/50 bg-white/70 shadow-xl p-6 md:p-7">
            <div className="flex items-start gap-3 mb-6">
              <MapPin className="w-5 h-5 text-[#5C9897] mt-1" />
              <div>
                <h3 className="font-semibold text-[#2F3A46]">Москва, Россия</h3>
                <p className="text-sm text-gray-600">Центральный офис</p>
              </div>
            </div>

            <div className="space-y-4">
              {channels.map((channel, index) => (
                <a
                  key={index}
                  href={channel.href}
                  className="flex items-start gap-3 group hover:bg-gray-50 p-2 -mx-2 rounded-lg transition"
                >
                  <span className="text-[#5C9897]">{channel.icon}</span>
                  <div>
                    <p className="text-sm text-gray-600">{channel.label}</p>
                    <p className="font-medium text-[#2F3A46] group-hover:text-[#5C9897] transition">
                      {channel.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </Card>

          {/* Documents Card */}
          <Card className="rounded-2xl border border-gray-200/50 bg-white/70 shadow-xl p-4 md:p-5">
            <h3 className="font-semibold text-[#2F3A46] mb-4">Документы</h3>

            <div className="space-y-3">
              {documents.map((doc, index) => (
                <a
                  key={index}
                  href={doc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-[#5C9897]" />
                    <span className="text-sm font-medium text-[#2F3A46]">
                      {doc.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
                      {doc.meta}
                    </span>
                    <Download className="w-4 h-4 text-gray-400" />
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {quickLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-gray-200 hover:border-[#7BCDC5] hover:bg-[#7BCDC5]/5 transition text-sm"
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}