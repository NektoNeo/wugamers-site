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
        id="hero"
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
                {/* Robot Image with Animation */}
                <div className="relative animate-float">
                  <img
                    src="/Robot.png"
                    alt="WU Gamers Robot"
                    className="w-full h-auto object-contain drop-shadow-2xl"
                  />
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#7BCDC5]/20 to-transparent blur-3xl -z-10"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Events Section */}
      <div id="events">
        <EventsSection />
      </div>

      {/* About Section */}
      <div id="about">
        <div id="about">
        <AboutSection />
      </div>
      </div>

      {/* Roadmap Section */}
      <div id="roadmap">
        <RoadmapSection />
      </div>

      {/* Team Section */}
      <div id="team">
        <div id="team">
        <TeamCarousel />
      </div>
      </div>

      {/* Partners Section */}
      <div id="partners">
        <div id="partners">
        <PartnersSection />
      </div>
      </div>

      {/* Gratitude Section */}
      <div id="gratitude">
        <GratitudeGallery />
      </div>

      {/* Donate Section */}
      <div id="donate">
        <div id="donate">
        <DonateSection />
      </div>
      </div>

      {/* Contacts Section */}
      <div id="contacts">
        <div id="contacts">
        <ContactsSection />
      </div>
      </div>

      {/* Footer */}
      <SiteFooter />
    </>
  )
}