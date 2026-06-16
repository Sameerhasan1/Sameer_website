import { client } from '@/lib/sanity/client'
import {
  siteSettingsQuery, skillsQuery, experienceQuery,
  projectsQuery, publicationsQuery, achievementsQuery, contactInfoQuery,
} from '@/lib/sanity/queries'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import ExperienceSection from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import Research from '@/components/sections/Research'
import Achievements from '@/components/sections/Achievements'
import Contact from '@/components/sections/Contact'
import Marquee from '@/components/ui/Marquee'
import type { SiteSettings, Skill, Experience, Project, Publication, Achievement, ContactInfo } from '@/lib/types'

export default async function Home() {
  const [settings, skills, experiences, projects, publications, achievements, contactInfo] =
    await Promise.all([
      client.fetch<SiteSettings | null>(siteSettingsQuery).catch(() => null),
      client.fetch<Skill[]>(skillsQuery).catch(() => []),
      client.fetch<Experience[]>(experienceQuery).catch(() => []),
      client.fetch<Project[]>(projectsQuery).catch(() => []),
      client.fetch<Publication[]>(publicationsQuery).catch(() => []),
      client.fetch<Achievement[]>(achievementsQuery).catch(() => []),
      client.fetch<ContactInfo | null>(contactInfoQuery).catch(() => null),
    ])

  return (
    <>
      <Navbar />
        <main>
          <Hero data={settings} />
          <Marquee />
          <About data={settings} />
          <Skills data={skills} />
          <Marquee reverse />
          <ExperienceSection data={experiences} />
          <Projects data={projects} />
          <Marquee />
          <Research data={publications} />
          <Achievements data={achievements} />
          <Contact contactData={contactInfo} siteData={settings} />
        </main>
        <Footer name={settings?.name} />
    </>
  )
}