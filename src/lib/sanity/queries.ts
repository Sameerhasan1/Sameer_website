import { groq } from 'next-sanity'

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    name, title, tagline, bio,
    profilePhoto, resumeUrl, location, availability, socials
  }
`

export const experienceQuery = groq`
  *[_type == "experience"] | order(coalesce(order, 999) asc) {
    _id, company, role, companyUrl,
    startDate, endDate, current, locationType,
    bullets, techStack, certificateUrl, order
  }
`

export const projectsQuery = groq`
  *[_type == "project"] | order(coalesce(order, 999) asc) {
    _id, title, slug, description, coverImage,
    techStack, githubUrl, liveUrl, npmUrl,
    startDate, endDate, category, featured, order
  }
`

export const skillsQuery = groq`
  *[_type == "skill"] | order(category asc, coalesce(order, 999) asc) {
    _id, name, iconName, category, level, order
  }
`

export const achievementsQuery = groq`
  *[_type == "achievement"] | order(coalesce(order, 999) asc) {
    _id, title, issuer, year, description,
    credentialUrl, badgeImage, type, order
  }
`

export const publicationsQuery = groq`
  *[_type == "publication"] {
    _id, title, journal, year, abstract,
    authors, doi, url, tags, highlight
  }
`

export const contactInfoQuery = groq`
  *[_type == "contactInfo"][0] {
    email, location, timezone, availability,
    responseTime, workMode, calendarUrl
  }
`