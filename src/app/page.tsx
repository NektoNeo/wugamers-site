import { SiteNav } from "@/components/site-nav"
import EventsSection from "@/components/events-section"
import AboutSection from "@/components/about-section"
import RoadmapSection from "@/components/roadmap-section"
import TeamCarousel from "@/components/team-carousel"
import PartnersSection from "@/components/partners-section"
import GratitudeGallery from "@/components/gratitude-gallery"
import DonateSection from "@/components/donate-section"
import ContactsSection from "@/components/contacts-section"
import SiteFooter from "@/components/site-footer"

export default function Home() {
  return (
    <>
      <SiteNav />

      {/* Hero Section */}
      <main
        id="main"
        className="relative overflow-hidden bg-gradient-to-r from-[#E4F5F9] to-[#EBEEF7] py-10 md:py-16 lg:py-24"
        role="main"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Copy Section */}
            <div className="lg:col-span-6 text-center lg:text-left">
              {/* Headlines */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#5BA8A8] uppercase">
                Развитие специального
              </h1>
              <h1 className="mt-2 text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-[#43B7B4] uppercase">
                кибердвижения и фиджитал-спорта
              </h1>

              {/* Subheadline */}
              <p className="mt-6 text-xl md:text-2xl font-semibold tracking-tight text-[#43B7B4] uppercase">
                Для людей с НЕограниченными возможностями
              </p>

              {/* Description */}
              <p className="mt-4 text-base md:text-lg leading-7 text-[#7A8895] max-w-prose mx-auto lg:mx-0">
                Мы создаём инклюзивную киберспортивную платформу для детей, подростков и молодёжи с ограниченными возможностями.
              </p>

              {/* KPI Statistics */}
              <div className="mt-8 grid grid-cols-2 gap-x-10 gap-y-6 lg:flex lg:gap-10 lg:items-end">
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-semibold text-[#2F3A46]">7+</div>
                  <div className="text-sm text-[#5E6A75] uppercase tracking-wide">лет</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-semibold text-[#2F3A46]">30+</div>
                  <div className="text-sm text-[#5E6A75] uppercase tracking-wide">мероприятий</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-semibold text-[#2F3A46]">10K+</div>
                  <div className="text-sm text-[#5E6A75] uppercase tracking-wide">участников</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-semibold text-[#2F3A46]">15</div>
                  <div className="text-sm text-[#5E6A75] uppercase tracking-wide">стран</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="https://t.me/wugamers"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Открыть Telegram для участия"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 bg-gradient-to-r from-[#7BCDC5] to-[#8DDCDA] text-[#0F2A2E] font-medium shadow-sm hover:opacity-90 transition-opacity"
                >
                  Присоединиться
                </a>
                <a
                  href="#about"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 bg-white border border-[rgba(99,123,139,0.25)] text-[#2F3A46] font-medium hover:bg-gray-50 transition-colors"
                >
                  Узнать больше
                </a>
              </div>
            </div>

            {/* Media Section */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end order-first lg:order-last">
              <div className="relative w-full max-w-md lg:max-w-lg">
                {/* Placeholder for 3D character image */}
                <div className="aspect-square bg-gradient-to-br from-[#E4F5F9] to-[#EBEEF7] rounded-2xl border-2 border-dashed border-[#43B7B4]/30 flex items-center justify-center">
                  <div className="text-center text-[#43B7B4]/60">
                    <div className="text-4xl mb-2">🎮</div>
                    <div className="text-sm font-medium">3D Character Placeholder</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Events Section */}
      <EventsSection />

      {/* About Section */}
      <div id="about">
        <AboutSection />
      </div>

      {/* Roadmap Section */}
      <RoadmapSection />

      {/* Team Section */}
      <div id="team">
        <TeamCarousel />
      </div>

      {/* Partners Section */}
      <div id="partners">
        <PartnersSection />
      </div>

      {/* Gratitude Section */}
      <GratitudeGallery />

      {/* Donate Section */}
      <div id="donate">
        <DonateSection />
      </div>

      {/* Contacts Section */}
      <div id="contacts">
        <ContactsSection />
      </div>

      {/* Footer */}
      <SiteFooter />
    </>
  )
}