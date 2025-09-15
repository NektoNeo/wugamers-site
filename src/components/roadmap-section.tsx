import { MapPin, Building2, Building } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import roadmapData from "@/data/roadmap.json"

const accentStyles = {
  aqua: {
    dateBadge: "border-[#7BCDC5] text-[#7BCDC5]",
    marker: "bg-[#7BCDC5]"
  },
  purple: {
    dateBadge: "border-[#B597F6] text-[#B597F6]",
    marker: "bg-[#B597F6]"
  },
  green: {
    dateBadge: "border-[#9BE5C7] text-[#9BE5C7]",
    marker: "bg-[#9BE5C7]"
  },
  peach: {
    dateBadge: "border-[#F6C9C4] text-[#F6C9C4]",
    marker: "bg-[#F6C9C4]"
  }
}

function getIcon(iconName: string) {
  switch (iconName) {
    case "lucide:map-pin":
      return <MapPin className="h-4 w-4" />
    case "lucide:building-2":
      return <Building2 className="h-4 w-4" />
    case "lucide:building":
      return <Building className="h-4 w-4" />
    default:
      return null
  }
}

const summaryStats = [
  { value: "8", label: "ключевых событий" },
  { value: "3", label: "года развития" },
  { value: "5+", label: "городов" },
  { value: "1000+", label: "участников" }
]

export default function RoadmapSection() {
  return (
    <section
      className="relative overflow-hidden py-14 md:py-20 bg-gradient-to-r from-[#E4F5F9] to-[#F1EDF8]"
      aria-label="Дорожная карта проекта"
    >
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#2F3A46]">
            Дорожная карта проекта
          </h2>
          <p className="mt-3 text-base md:text-lg text-[rgba(47,58,70,0.70)]">
            Ключевые достижения и события в развитии инклюзивного киберспорта
          </p>
        </div>

        {/* Timeline */}
        <div
          className="relative mt-10 md:mt-14"
          role="list"
          aria-label="Хронология ключевых событий"
        >
          {/* Central line - visible only on desktop */}
          <div className="hidden lg:block pointer-events-none absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[2px] bg-gradient-to-b from-[#A7E9E2] via-[#BFAFF8] to-[#F5D1C8]" />

          {/* Mobile left border line */}
          <div className="lg:hidden absolute left-4 top-0 bottom-0 w-[2px] bg-[rgba(123,205,197,0.35)]" />

          {/* Timeline items */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 md:gap-y-12">
            {roadmapData.items.map((item, index) => {
              const accent = (item.accent || 'aqua') as keyof typeof accentStyles
              const styles = accentStyles[accent]
              const isLeft = item.side === 'left'

              return (
                <div
                  key={item.id}
                  className={`col-span-1 ${
                    isLeft
                      ? 'lg:col-span-5 lg:col-start-1'
                      : 'lg:col-span-5 lg:col-start-8'
                  } relative`}
                  role="listitem"
                >
                  {/* Marker - only on desktop */}
                  {index < roadmapData.items.length && (
                    <div
                      className={`hidden lg:block absolute ${
                        isLeft ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'
                      } top-8 w-3 h-3 rounded-full ring-4 ring-white ${styles.marker}`}
                      style={{
                        left: isLeft ? 'auto' : '0',
                        right: isLeft ? '0' : 'auto'
                      }}
                    />
                  )}

                  {/* Card */}
                  <Card
                    className="relative bg-white border border-[rgba(99,123,139,0.20)] rounded-2xl p-5 md:p-6 shadow-[0_16px_32px_-18px_rgba(15,45,52,0.08)] hover:translate-y-[2px] transition-transform ml-8 lg:ml-0"
                  >
                    <CardContent className="p-0">
                      {/* Date badge and status */}
                      <div className="flex items-center gap-2">
                        {item.date_display.label && (
                          <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-[13px] font-medium ${styles.dateBadge}`}>
                            {item.date_display.label}
                          </span>
                        )}
                        {item.status_chip && (
                          <Badge
                            variant="secondary"
                            className="inline-flex items-center px-2.5 py-1 rounded-full text-xs bg-white/70 border border-[rgba(99,123,139,0.15)] text-[#6B7785]"
                          >
                            {item.status_chip.text}
                          </Badge>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="mt-3 text-lg md:text-xl font-semibold text-[#2F3A46]">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="mt-1.5 text-[15px] leading-6 text-[#6B7785]">
                        {item.description}
                      </p>

                      {/* Meta info */}
                      {item.meta && item.meta.length > 0 && (
                        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[15px] text-[#6B7785]">
                          {item.meta.map((meta, metaIndex) => (
                            <div key={metaIndex} className="flex items-center gap-2">
                              {getIcon(meta.icon)}
                              <span>{meta.text}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>

        {/* Summary Stats */}
        <div
          className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
          aria-label="Итоговые показатели RoadMap"
        >
          {summaryStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 text-center border border-[rgba(99,123,139,0.12)]"
            >
              <div className="text-2xl md:text-3xl font-bold text-[#2F3A46]">
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