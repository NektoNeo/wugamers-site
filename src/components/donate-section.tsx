"use client"

import React, { useState } from 'react'
import { LINKS } from '@/lib/config'
import { cn } from '@/lib/utils'
import {
  Heart,
  Lock,
  CreditCard,
  ShieldCheck,
  QrCode,
  Smartphone
} from 'lucide-react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

export default function DonateSection() {
  const [selectedAmount, setSelectedAmount] = useState<number>(1000)
  const [customAmount, setCustomAmount] = useState<string>('')
  const [activeTab, setActiveTab] = useState<string>('iomoney')
  const [error, setError] = useState<string>('')

  const recommendedAmounts = [500, 1000, 2500, 5000]

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount)
    setCustomAmount('')
    setError('')
  }

  const handleCustomAmountChange = (value: string) => {
    const numValue = parseInt(value) || 0

    if (numValue < 100 && value !== '') {
      setError('Минимальная сумма — 100 ₽')
    } else if (numValue > 500000) {
      setError('Слишком большая сумма')
    } else if (numValue % 50 !== 0 && value !== '') {
      setError('Сумма должна быть кратна 50 ₽')
    } else {
      setError('')
      setSelectedAmount(numValue)
    }

    setCustomAmount(value)
  }

  const handleDonate = () => {
    const amount = customAmount ? parseInt(customAmount) : selectedAmount

    if (!amount || amount < 100) {
      setError('Введите сумму или выберите из предложенных')
      return
    }

    const url = activeTab === 'iomoney'
      ? LINKS.donate.iomoney
      : LINKS.donate.yandex

    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const finalAmount = customAmount ? parseInt(customAmount) || 0 : selectedAmount

  return (
    <section
      className="relative overflow-hidden py-14 md:py-20 bg-gradient-to-r from-[#E4F5F9] to-[#F1EDF8]"
      aria-label="Поддержать проект"
    >
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 text-[13px] text-gray-600 shadow-sm">
            Финансирование
          </div>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-[#2F3A46]">
            Поддержать проект
          </h2>
          <p className="mt-3 text-base md:text-lg text-gray-700/70">
            Мы будем признательны за любую помощь и поддержку. Вся наша деятельность направлена на проведение регулярных инклюзивных мероприятий.
          </p>
        </div>

        {/* Donation Panel */}
        <div className="mt-8 md:mt-10 max-w-3xl mx-auto rounded-3xl border border-gray-200/50 shadow-xl overflow-hidden">
          {/* Panel Header */}
          <div className="bg-gradient-to-r from-[#6BC4F4] to-[#B597F6] px-6 py-4 text-white">
            <div className="flex items-center justify-between">
              <div className="text-[15px] font-semibold">
                Криптозащищённые платежи
              </div>
              <div className="text-[13px] bg-white/20 px-2.5 py-1 rounded-full">
                SSL 256
              </div>
            </div>
            <div className="mt-1 text-[13px] opacity-90">
              Безопасная система поддержки инклюзивных турниров
            </div>
          </div>

          {/* Panel Body */}
          <div className="bg-white/70 backdrop-blur px-6 py-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 gap-3 p-2 rounded-2xl bg-gray-100/70 border border-gray-200/50 w-full">
                <TabsTrigger
                  value="iomoney"
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-[15px] font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#7BCDC5] data-[state=active]:to-[#5BA8A8] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:text-gray-600 data-[state=inactive]:bg-white/50 transition-all duration-300"
                >
                  <CreditCard className="w-4 h-4" />
                  IOMoney
                </TabsTrigger>
                <TabsTrigger
                  value="yandex_donate"
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-[15px] font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#B597F6] data-[state=active]:to-[#9370DB] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=inactive]:text-gray-600 data-[state=inactive]:bg-white/50 transition-all duration-300"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Yandex Donate
                  <Badge className="ml-1 bg-green-100 text-green-700 text-xs px-2 py-0">
                    Надёжно
                  </Badge>
                </TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-6">
                {/* Recommended Amounts */}
                <div>
                  <p className="text-sm text-gray-600 mb-3">Рекомендуемые суммы:</p>
                  <div className="flex flex-wrap gap-2">
                    {recommendedAmounts.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => handleAmountSelect(amount)}
                        className={cn(
                          "rounded-full px-4 py-2 text-[15px] border transition",
                          selectedAmount === amount && !customAmount
                            ? "bg-white border-[#7BCDC5] text-[#2F3A46] shadow-sm"
                            : "bg-white/70 border-white/60 text-[#2F3A46] hover:bg-white"
                        )}
                      >
                        {amount.toLocaleString('ru-RU')} ₽
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Amount */}
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Или введите свою сумму:</p>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="Введите сумму"
                      value={customAmount}
                      onChange={(e) => handleCustomAmountChange(e.target.value)}
                      min={100}
                      max={500000}
                      step={50}
                      className="w-full rounded-xl border border-gray-200/50 bg-white/80 px-4 py-3 text-[16px] pr-12"
                      aria-label="Сумма пожертвования в рублях"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                      ₽
                    </span>
                  </div>
                  {error && (
                    <p className="mt-2 text-sm text-red-500" role="alert">
                      {error}
                    </p>
                  )}
                </div>

                {/* Donate Button */}
                <Button
                  onClick={handleDonate}
                  disabled={!finalAmount || finalAmount < 100 || !!error}
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 bg-gradient-to-r from-[#7BCDC5] to-[#8DDCDA] text-[#0F2A2E] font-medium shadow-sm hover:opacity-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Отправить пожертвование"
                >
                  <Heart className="w-5 h-5" />
                  {activeTab === 'iomoney'
                    ? 'Поддержать через IOMoney'
                    : 'Поддержать через Yandex Donate'}
                </Button>

                {/* Security Note */}
                <div className="mt-3 flex items-start gap-2 text-[13px] text-gray-600">
                  <Lock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>
                    256-битное шифрование SSL/TLS. Все пожертвования идут на организацию инклюзивных турниров и развитие проекта «Мир уникальных геймеров».
                  </span>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Quick Donate Section */}
        <div className="mt-12 md:mt-16 max-w-3xl mx-auto text-center bg-white/60 rounded-3xl border border-gray-200/50 px-6 py-8">
          <h3 className="text-xl font-semibold text-[#2F3A46]">
            Быстрый донат
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Отсканируйте QR‑код для мгновенного пожертвования
          </p>

          <div className="mt-6 inline-flex items-center justify-center p-4 bg-white rounded-2xl shadow-lg">
            <QrCode className="w-32 h-32 text-gray-800" />
          </div>

          <a
            href={LINKS.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 border border-gray-300 bg-white text-gray-700 text-[15px] font-medium hover:bg-gray-50 hover:border-gray-400 transition"
          >
            <Smartphone className="w-4 h-4 text-gray-600" />
            Открыть в Telegram
          </a>
        </div>
      </div>
    </section>
  )
}