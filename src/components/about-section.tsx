import { Target, UsersRound, Shield, Heart, PlayCircle, Users, Music2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const goals = [
  {
    accent: "aqua",
    icon: Target,
    title: "Развитие и пропаганда специального кибердвижения в России",
    text: "Создание платформы для популяризации инклюзивного киберспорта",
    borderColor: "border-[#7BCDC5]/40",
    iconBg: "bg-[rgba(123,205,197,0.12)]",
    iconColor: "text-[#7BCDC5]"
  },
  {
    accent: "purple",
    icon: UsersRound,
    title: "Привлечение новых участников из числа особенных детей",
    text: "Вовлечение детей и подростков с ограниченными возможностями",
    borderColor: "border-[#B597F6]/40",
    iconBg: "bg-[rgba(181,151,246,0.12)]",
    iconColor: "text-[#B597F6]"
  },
  {
    accent: "peach",
    icon: Shield,
    title: "Привлечение внимания государства и общества к проблемам людей с инвалидностью",
    text: "Повышение осведомлённости о потребностях и возможностях особенных людей",
    borderColor: "border-[#F6C9C4]/50",
    iconBg: "bg-[rgba(246,201,196,0.14)]",
    iconColor: "text-[#F6C9C4]"
  }
]

const links = [
  {
    id: "promo_video",
    label: "Проморолик",
    href: "#", // Will be replaced with actual link
    icon: PlayCircle,
    className: "bg-gradient-to-r from-[#FF7D92] to-[#FFA6B0] text-white"
  },
  {
    id: "project_presentation",
    label: "Презентация",
    href: "#", // Will be replaced with actual link
    icon: Users,
    className: "bg-gradient-to-r from-[#A88CF5] to-[#B597F6] text-white"
  },
  {
    id: "anthem",
    label: "Гимн",
    href: "#", // Will be replaced with actual link
    icon: Music2,
    className: "bg-gradient-to-r from-[#7BCDC5] to-[#8DDCDA] text-[#0F2A2E]"
  }
]

const missionBullets = [
  "Регулярные турниры по различным дисциплинам",
  "Поддержка активного и дружелюбного сообщества",
  "Шанс попасть в топ-лиги и участвовать в крупных соревнованиях",
  "Образовательные мастер‑классы и тренировки",
  "Доступ к адаптивным технологиям и оборудованию"
]

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden py-14 md:py-20 bg-gradient-to-r from-[#E4F5F9] to-[#EBEEF7]"
      aria-label="О проекте: цели, ссылки и миссия"
    >
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#2F3A46]">
            О проекте
          </h2>
          <p className="mt-3 text-base md:text-lg text-[rgba(47,58,70,0.70)]">
            Уникальный мир — специальный инклюзивный проект по киберспорту и кибербезопасности для детей, подростков и молодёжи с ограниченными возможностями.
          </p>
        </div>

        {/* Goals Section */}
        <div className="mt-10 md:mt-14">
          <h3 className="text-center text-xl md:text-2xl font-semibold text-[#2F3A46] mb-6 md:mb-8">
            Наши цели
          </h3>
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
            role="list"
          >
            {goals.map((goal, index) => (
              <Card
                key={index}
                className={`bg-white rounded-2xl p-6 md:p-7 border ${goal.borderColor} shadow-[0_10px_24px_-12px_rgba(15,45,52,0.08)] transition-all hover:shadow-[0_18px_38px_-16px_rgba(15,45,52,0.08)] hover:translate-y-[2px]`}
                role="listitem"
              >
                <CardContent className="p-0">
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${goal.iconBg} ${goal.iconColor}`}>
                    <goal.icon className="h-5 w-5" />
                  </div>
                  <h4 className="mt-4 text-[17px] md:text-lg font-semibold leading-snug text-[#2F3A46]">
                    {goal.title}
                  </h4>
                  <p className="mt-2 text-[15px] leading-6 text-[#6B7785]">
                    {goal.text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Links Row */}
        <div
          className="mt-8 md:mt-10 flex flex-wrap items-center justify-center gap-3 md:gap-4"
          aria-label="Внешние ссылки: проморолик, презентация, гимн"
        >
          {links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[15px] font-medium ${link.className} hover:opacity-95 transition-opacity`}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </a>
          ))}
        </div>

        {/* Mission Panel */}
        <Card className="mt-10 md:mt-14 bg-white rounded-3xl p-6 md:p-8 border border-[rgba(99,123,139,0.20)] shadow-[0_18px_36px_-16px_rgba(15,45,52,0.08)]">
          <CardContent className="p-0">
            <div className="flex items-start gap-3">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[rgba(255,125,146,0.12)] text-[#FF7D92]">
                <Heart className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-semibold text-[#2F3A46]">
                  Наша миссия
                </h3>
                <p className="mt-3 text-base leading-7 text-[#6B7785]">
                  Киберспорт — не просто игры, это дисциплина и путь к самореализации. Мы даём возможность соревноваться на равных, находить единомышленников и выходить на большие сцены.
                </p>

                <div className="mt-6">
                  <p className="text-base font-medium text-[#2F3A46] mb-3">
                    Мы предоставляем:
                  </p>
                  <ul className="space-y-2">
                    {missionBullets.map((bullet, index) => (
                      <li key={index} className="flex items-start gap-2 text-[15px] text-[#6B7785]">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#7BCDC5] mt-1.5 flex-shrink-0"></span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}