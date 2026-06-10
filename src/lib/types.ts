export interface SanityImage {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number }
}

export interface SiteSettings {
  name: string
  title: string
  tagline: string
  bio: string
  profilePhoto: SanityImage
  resumeUrl: string
  location: string
  availability: 'available' | 'open' | 'unavailable'
  socials: {
    github?: string
    linkedin?: string
    leetcode?: string
    dribbble?: string
    email?: string
  }
}

export interface Project {
  _id: string
  title: string
  slug: { current: string }
  description: string
  coverImage: SanityImage
  techStack: string[]
  githubUrl?: string
  liveUrl?: string
  npmUrl?: string
  startDate?: string
  endDate?: string
  category?: 'open-source' | 'personal' | 'work'
  featured: boolean
  order?: number
}

export interface Experience {
  _id: string
  company: string
  role: string
  companyUrl?: string
  startDate: string
  endDate?: string
  current: boolean
  locationType?: string
  bullets: string[]
  techStack: string[]
  certificateUrl?: string
  order?: number
}

export interface Skill {
  _id: string
  name: string
  iconName?: string
  category: string
  level?: string
  order?: number
}

export interface Achievement {
  _id: string
  title: string
  issuer?: string
  year?: string
  description?: string
  credentialUrl?: string
  badgeImage?: SanityImage
  type?: string
  order?: number
}

export interface Publication {
  _id: string
  title: string
  journal?: string
  year?: string
  abstract?: string
  authors?: string[]
  doi?: string
  url?: string
  tags?: string[]
  highlight?: string
}

export interface ContactInfo {
  email: string
  location?: string
  timezone?: string
  availability?: string
  responseTime?: string
  workMode?: string
  calendarUrl?: string
}