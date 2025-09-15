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
        className="relative overflow-hidden py-10 md:py-16 lg:py-24"
        role="main"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Copy Section */}
            <div className="lg:col-span-6 text-center lg:text-left">
              {/* Headlines */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#2F3A46] uppercase">
                Развитие <span className="animated-gradient-text">специального</span>
              </h1>
              <h1 className="mt-2 text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight uppercase">
                <span className="animated-gradient-text">кибердвижения и</span> <span className="text-[#2F3A46]">фиджитал-спорта</span>
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
              <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
                <div className="glassmorphism-card rounded-2xl p-4 text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">7</div>
                  <div className="text-sm text-[#5E6A75] mt-1">лет проекту</div>
                </div>
                <div className="glassmorphism-card rounded-2xl p-4 text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">30+</div>
                  <div className="text-sm text-[#5E6A75] mt-1">мероприятий</div>
                </div>
                <div className="glassmorphism-card rounded-2xl p-4 text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">10K+</div>
                  <div className="text-sm text-[#5E6A75] mt-1">участников</div>
                </div>
                <div className="glassmorphism-card rounded-2xl p-4 text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">15</div>
                  <div className="text-sm text-[#5E6A75] mt-1">стран<br/>сотрудничества</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="https://t.me/wugamers"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Открыть Telegram для участия"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 btn-purple-gradient text-white font-semibold transition-all"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.384,22.779c0.322,0.228 0.737,0.285 1.107,0.145c0.37,-0.141 0.642,-0.457 0.724,-0.84c0.869,-4.084 2.977,-14.421 3.768,-18.136c0.06,-0.28 -0.04,-0.571 -0.26,-0.758c-0.22,-0.187 -0.525,-0.241 -0.797,-0.14c-4.193,1.552 -17.106,6.397 -22.384,8.35c-0.335,0.124 -0.553,0.446 -0.542,0.799c0.012,0.354 0.25,0.661 0.593,0.764c2.367,0.708 5.474,1.693 5.474,1.693c0,0 1.452,4.385 2.209,6.615c0.095,0.28 0.314,0.5 0.603,0.576c0.288,0.075 0.596,-0.004 0.811,-0.207c1.216,-1.148 3.096,-2.923 3.096,-2.923c0,0 3.572,2.619 5.598,4.062Zm-11.01,-8.677l1.679,5.538l0.373,-3.507c0,0 6.487,-5.851 10.185,-9.186c0.108,-0.098 0.123,-0.262 0.033,-0.377c-0.089,-0.115 -0.253,-0.142 -0.376,-0.064c-4.286,2.737 -11.894,7.596 -11.894,7.596Z"/>
                  </svg>
                  Хочу участвовать!
                </a>
                <a
                  href="#about"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 btn-outline-teal font-semibold transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                  Узнать подробнее
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