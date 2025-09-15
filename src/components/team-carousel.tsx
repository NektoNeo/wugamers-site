"use client"

import * as React from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import teamData from "@/data/team.json"

export default function TeamCarousel() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <section
      className="relative overflow-hidden py-14 md:py-20 bg-gradient-to-r from-[#E4F5F9] to-[#F1EDF8]"
      aria-label="Команда проекта — карусель"
    >
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#2F3A46]">
            Команда
          </h2>
          <p className="mt-3 text-base md:text-lg text-[rgba(47,58,70,0.70)]">
            Профессиональная команда экспертов, объединённых общей миссией создания инклюзивного киберспорта
          </p>
        </div>

        {/* Carousel */}
        <div className="mt-10 md:mt-12">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent className="-ml-5 md:-ml-6">
              {teamData.members.map((member, index) => (
                <CarouselItem
                  key={member.id}
                  className="pl-5 md:pl-6 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <Card className="glassmorphism-card rounded-[1rem] overflow-hidden h-full">
                    <CardContent className="p-0">
                      {/* Photo */}
                      <div className="relative aspect-[3/4] bg-[rgba(99,123,139,0.06)] overflow-hidden">
                        {member.photo ? (
                          <Image
                            src={member.photo}
                            alt={member.alt}
                            fill
                            className="object-cover object-[center_20%]"
                            sizes="(min-width: 1024px) 360px, (min-width: 768px) 320px, 260px"
                            loading="lazy"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-[#6B7785]/40">
                            <div className="text-center">
                              <div className="text-6xl mb-2">👤</div>
                              <div className="text-sm">Фото</div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Body */}
                      <div className="p-4 md:p-5">
                        <h3 className="text-[17px] md:text-lg font-semibold text-[#2F3A46]">
                          {member.name}
                        </h3>

                        {member.badge && (
                          <span className="mt-2 inline-flex items-center gap-2 text-[13px] px-3 py-1 rounded-full bg-[rgba(123,205,197,0.12)] text-[#5BA8A8]">
                            {member.badge}
                          </span>
                        )}

                        <p className="mt-2 text-[15px] leading-6 text-[#6B7785]">
                          {member.bio}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="left-2 bg-white/90 shadow border border-[rgba(99,123,139,0.18)] hover:bg-white" />
              <CarouselNext className="right-2 bg-white/90 shadow border border-[rgba(99,123,139,0.18)] hover:bg-white" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  )
}