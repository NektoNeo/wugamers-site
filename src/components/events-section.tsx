import Link from "next/link"
import { MapPin, BadgeCheck, Users, Globe2, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import eventsData from "@/data/events.json"

const accentStyles = {
  aqua: {
    dateBorder: "border-[#7BCDC5]",
    dateText: "text-[#7BCDC5]",
    ctaClass: "bg-gradient-to-r from-[#7BCDC5] to-[#8DDCDA] text-[#0F2A2E]"
  },
  purple: {
    dateBorder: "border-[#B597F6]",
    dateText: "text-[#B597F6]",
    ctaClass: "bg-[#B597F6] text-white"
  },
  green: {
    dateBorder: "border-[#9BE5C7]",
    dateText: "text-[#9BE5C7]",
    ctaClass: "bg-[#9BE5C7] text-[#0F2A2E]"
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  const day = date.getDate().toString().padStart(2, '0')
  const months = ['ЯНВ', 'ФЕВ', 'МАР', 'АПР', 'МАЙ', 'ИЮН', 'ИЮЛ', 'АВГ', 'СЕН', 'ОКТ', 'НОЯ', 'ДЕК']
  const month = months[date.getMonth()]
  const year = date.getFullYear()

  return { day, month, year }
}

function getMetaIcon(location: string) {
  if (location.includes("Онлайн")) return <Globe2 className="h-4 w-4" />
  return <MapPin className="h-4 w-4" />
}

function getMetaInfo(event: typeof eventsData.items[0]) {
  const meta = []

  if (event.location) {
    meta.push({
      icon: getMetaIcon(event.location),
      text: event.location
    })
  }

  // Add registration status for first event
  if (event.id === "2025-03-15-world-of-tanks-uav-fidgital") {
    meta.push({
      icon: <BadgeCheck className="h-4 w-4" />,
      text: "Регистрация открыта"
    })
  }

  // Add participants for second event
  if (event.id === "2025-03-22-drone-racing-masterclass") {
    meta.push({
      icon: <Users className="h-4 w-4" />,
      text: "30+ участников"
    })
  }

  // Add countries for third event
  if (event.id === "2025-04-05-classic-football-cup") {
    meta.push({
      icon: <Globe2 className="h-4 w-4" />,
      text: "15 стран"
    })
  }

  return meta
}

export default function EventsSection() {
  return (
    <section
      className="relative overflow-hidden py-14 md:py-20 bg-gradient-to-r from-[#E4F5F9] to-[#F1EDF8]"
      aria-label="Ближайшие мероприятия"
    >
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#2F3A46]">
            Ближайшие мероприятия
          </h2>
          <p className="mt-3 text-base md:text-lg text-[rgba(47,58,70,0.65)]">
            Присоединяйтесь к нашим инклюзивным турнирам и мастер-классам
          </p>
        </div>

        {/* Events Grid */}
        <div
          className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          role="list"
          aria-label="Список ближайших мероприятий"
        >
          {eventsData.items.map((event) => {
            const { day, month, year } = formatDate(event.date)
            const accent = (event.accent || 'aqua') as keyof typeof accentStyles
            const styles = accentStyles[accent]
            const metaInfo = getMetaInfo(event)

            return (
              <Card
                key={event.id}
                className="group bg-white rounded-2xl p-6 md:p-7 border border-[rgba(99,123,139,0.16)] shadow-[0_10px_24px_-12px_rgba(15,45,52,0.08)] hover:shadow-[0_18px_38px_-16px_rgba(15,45,52,0.08)] transition-all hover:translate-y-[2px] focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[rgba(123,205,197,0.6)]"
                role="listitem"
              >
                <CardContent className="p-0">
                  <div className="flex items-start">
                    {/* Date Box */}
                    <div className={`inline-flex flex-col items-center justify-center w-[88px] h-[88px] md:w-[94px] md:h-[94px] rounded-2xl border-2 ${styles.dateBorder} ${styles.dateText}`}>
                      <div className="text-2xl font-semibold">{day}</div>
                      <div className="text-sm tracking-widest uppercase">{month}</div>
                      <div className="text-xs text-[#6B7785]">{year}</div>
                    </div>

                    {/* Status Badge */}
                    {event.status && (
                      <Badge
                        variant="secondary"
                        className="ml-3 align-middle rounded-full px-3 py-1 text-xs font-medium bg-[rgba(99,123,139,0.08)] text-[#6B7785] border-0"
                      >
                        {event.status}
                      </Badge>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="mt-5 text-xl md:text-2xl font-semibold text-[#2F3A46]">
                    {event.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-[15px] leading-6 text-[#6B7785]">
                    {event.description}
                  </p>

                  {/* Meta Info */}
                  {metaInfo.length > 0 && (
                    <ul className="mt-4 space-y-1 text-[15px] text-[#6B7785]">
                      {metaInfo.map((item, index) => (
                        <li
                          key={index}
                          className={`flex items-center gap-2 ${item.text === "Регистрация открыта" ? "text-[#2F3A46] font-medium" : ""}`}
                        >
                          {item.icon}
                          <span>{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* CTA Button */}
                  <Link
                    href={event.links.details}
                    className={`mt-6 inline-flex items-center justify-center gap-2 w-full rounded-full px-5 py-3 ${styles.ctaClass} font-medium hover:opacity-95 transition-opacity`}
                    aria-label={`Подробнее о мероприятии ${event.title}`}
                  >
                    Подробнее
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}