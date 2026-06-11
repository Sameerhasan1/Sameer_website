import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token:     process.env.SANITY_API_READ_TOKEN,
  useCdn:    false,
})

const SITE_SETTINGS = {
  _id: 'siteSettings', _type: 'siteSettings',
  name: 'Sameer Hasan', title: 'Full-Stack Developer',
  tagline: 'Building scalable systems, open-source packages, and production-grade web applications.',
  bio: 'Full-stack developer with professional experience building production web applications using Dart, Node.js, Vue, Nuxt.js, and React. Developed and published open-source packages for Firebase Cloud Messaging with secure authentication and enterprise-grade reliability. Built scalable applications from scratch using modern frameworks, integrated REST APIs, and managed relational and NoSQL databases. Experience with cloud platforms including Google Cloud Platform, AWS, Docker, and Kubernetes. Strong foundation in system design, authentication mechanisms, and performance optimization.',
  resumeUrl: 'https://drive.google.com/file/d/1e8ZUWcRw3xxvOmdhZ0gNQqXhG2rmw7Jm/view?usp=drive_link',
  location: 'Morena, Madhya Pradesh, India',
  availability: 'available',
  socials: {
    github: 'https://github.com/Sameerhasan1',
    linkedin: 'https://www.linkedin.com/in/sameer-h-607594205/',
    leetcode: 'https://leetcode.com/Sameerhasan1',
    dribbble: 'https://dribbble.com/mail-kairu-design',
    email: 'sameerhasanwork1@gmail.com',
  },
}

const CONTACT_INFO = {
  _id: 'contactInfo', _type: 'contactInfo',
  email: 'sameerhasanwork1@gmail.com',
  location: 'Morena, Madhya Pradesh, India',
  timezone: 'IST (GMT+5:30)',
  availability: 'Available',
  responseTime: 'Usually within 24 hours',
  workMode: 'Remote / Hybrid',
}

const EXPERIENCES = [
  {
    _id: 'experience-aortem', _type: 'experience',
    company: 'Aortem', role: 'Frontend Developer',
    startDate: 'Sep 2025', endDate: 'Jan 2026',
    current: false, locationType: 'Remote',
    bullets: [
      'Built intellitoggle.com from scratch using Nuxt.js, Vue, CraftCMS, Twig, and MySQL; deployed on Fortrabbit with full CI/CD integration.',
      'Developed complete UI/UX for IntelliToggle implementing OAuth2 authentication flow and secure user login system.',
      'Implemented REST APIs for feature flag management — creation, updates, deletion, and real-time toggling with proper validation and error handling.',
      'Developed and published firebase_fcm_client (v0.0.3), a production-ready Dart package with 222+ downloads and enterprise-grade FCM security.',
      'Implemented secure service account impersonation supporting Cloud Run, GKE, Docker, and Kubernetes, eliminating private key management.',
      'Built automatic token caching and refresh mechanisms, reducing authentication overhead and improving system reliability.',
      'Designed flexible notification delivery supporting device tokens, topic-based messaging, and condition-based targeting with complete type safety.',
      'Created detailed documentation, unit tests, and integration tests achieving robust code coverage and developer-friendly API design.',
    ],
    techStack: ['Nuxt.js', 'Vue', 'CraftCMS', 'MySQL', 'Dart', 'Firebase', 'GCP', 'OAuth2', 'Docker', 'Kubernetes'],
    order: 1,
  },
  {
    _id: 'experience-storybox', _type: 'experience',
    company: 'Storybox Media', role: 'Web Developer Intern',
    startDate: 'May 2024', endDate: 'Jul 2024',
    current: false, locationType: 'Remote',
    bullets: [
      'Developed reusable React.js components, improving frontend modularity and developer experience.',
      'Built and optimized backend APIs using Node.js, focusing on performance and scalability.',
      'Implemented interactive features and responsive UIs integrated with real-time APIs.',
      'Integrated delivery services and payment gateway partner APIs.',
      'Collaborated with senior engineers in Agile sprints, participating in architecture discussions, debugging, and code reviews.',
    ],
    techStack: ['React.js', 'Node.js', 'REST APIs', 'Agile/Scrum'],
    order: 2,
  },
]

const SKILLS = [
  { _id: 'skill-js',    _type: 'skill', name: 'JavaScript', iconName: 'SiJavascript', category: 'Languages',    level: 'Advanced',     order: 1 },
  { _id: 'skill-ts',    _type: 'skill', name: 'TypeScript', iconName: 'SiTypescript', category: 'Languages',    level: 'Advanced',     order: 2 },
  { _id: 'skill-dart',  _type: 'skill', name: 'Dart',       iconName: 'SiDart',       category: 'Languages',    level: 'Advanced',     order: 3 },
  { _id: 'skill-py',    _type: 'skill', name: 'Python',     iconName: 'SiPython',     category: 'Languages',    level: 'Intermediate', order: 4 },
  { _id: 'skill-cpp',   _type: 'skill', name: 'C++',        iconName: 'SiCplusplus',  category: 'Languages',    level: 'Intermediate', order: 5 },
  { _id: 'skill-sql',   _type: 'skill', name: 'SQL',        iconName: 'SiMysql',      category: 'Languages',    level: 'Intermediate', order: 6 },
  { _id: 'skill-node',  _type: 'skill', name: 'Node.js',    iconName: 'SiNodedotjs',  category: 'Backend',      level: 'Advanced',     order: 1 },
  { _id: 'skill-expr',  _type: 'skill', name: 'Express.js', iconName: 'SiExpress',    category: 'Backend',      level: 'Advanced',     order: 2 },
  { _id: 'skill-react', _type: 'skill', name: 'React.js',    iconName: 'SiReact',       category: 'Frontend',    level: 'Advanced',     order: 1 },
  { _id: 'skill-next',  _type: 'skill', name: 'Next.js',     iconName: 'SiNextdotjs',   category: 'Frontend',    level: 'Advanced',     order: 2 },
  { _id: 'skill-vue',   _type: 'skill', name: 'Vue.js',      iconName: 'SiVuedotjs',    category: 'Frontend',    level: 'Intermediate', order: 3 },
  { _id: 'skill-nuxt',  _type: 'skill', name: 'Nuxt.js',     iconName: 'SiNuxtdotjs',   category: 'Frontend',    level: 'Intermediate', order: 4 },
  { _id: 'skill-tw',    _type: 'skill', name: 'TailwindCSS', iconName: 'SiTailwindcss', category: 'Frontend',    level: 'Advanced',     order: 5 },
  { _id: 'skill-flut',  _type: 'skill', name: 'Flutter',     iconName: 'SiFlutter',     category: 'Frontend',    level: 'Advanced',     order: 6 },
  { _id: 'skill-pg',    _type: 'skill', name: 'PostgreSQL', iconName: 'SiPostgresql', category: 'Databases',    level: 'Advanced',     order: 1 },
  { _id: 'skill-mysql', _type: 'skill', name: 'MySQL',      iconName: 'SiMysql',      category: 'Databases',    level: 'Intermediate', order: 2 },
  { _id: 'skill-mongo', _type: 'skill', name: 'MongoDB',    iconName: 'SiMongodb',    category: 'Databases',    level: 'Intermediate', order: 3 },
  { _id: 'skill-gcp',   _type: 'skill', name: 'Google Cloud', iconName: 'SiGooglecloud', category: 'Cloud/DevOps', level: 'Advanced',     order: 1 },
  { _id: 'skill-fb',    _type: 'skill', name: 'Firebase',     iconName: 'SiFirebase',    category: 'Cloud/DevOps', level: 'Advanced',     order: 2 },
  { _id: 'skill-dock',  _type: 'skill', name: 'Docker',       iconName: 'SiDocker',      category: 'Cloud/DevOps', level: 'Intermediate', order: 3 },
  { _id: 'skill-k8s',   _type: 'skill', name: 'Kubernetes',   iconName: 'SiKubernetes',  category: 'Cloud/DevOps', level: 'Familiar',     order: 4 },
  { _id: 'skill-git',   _type: 'skill', name: 'Git',          iconName: 'SiGit',         category: 'Cloud/DevOps', level: 'Advanced',     order: 5 },
]

const PROJECTS = [
  { _id: 'project-intellitoggle', _type: 'project', title: 'IntelliToggle', slug: { _type: 'slug', current: 'intellitoggle' }, description: 'Feature flag management platform built from scratch at Aortem. OAuth2 authentication, REST APIs for full flag lifecycle (create, update, delete, real-time toggle), deployed on Fortrabbit with full CI/CD.', techStack: ['Nuxt.js', 'Vue', 'CraftCMS', 'MySQL', 'OAuth2'], liveUrl: 'https://intellitoggle.com', category: 'work', featured: true, order: 1 },
  { _id: 'project-mantegrity', _type: 'project', title: 'Mantegrity', slug: { _type: 'slug', current: 'mantegrity' }, description: 'Platform developed at Storybox Media. Built reusable React.js components, optimized Node.js APIs, integrated delivery service and payment gateway partner APIs in Agile sprints.', techStack: ['React.js', 'Node.js', 'REST APIs', 'Payment Gateway'], liveUrl: 'https://mantegrity.in', category: 'work', featured: false, order: 2 },
  { _id: 'project-firebase-fcm', _type: 'project', title: 'firebase_fcm_client', slug: { _type: 'slug', current: 'firebase-fcm-client' }, description: 'Production-ready Dart package for Firebase Cloud Messaging HTTP v1 API. Secure service account impersonation, automatic token caching, support for Cloud Run, GKE, Docker, and Kubernetes. 222+ downloads on pub.dev.', techStack: ['Dart', 'Firebase', 'GCP', 'Cloud Run', 'Kubernetes'], githubUrl: 'https://github.com/Sameerhasan1/firebase_fcm_client', npmUrl: 'https://pub.dev/packages/firebase_fcm_client', category: 'open-source', featured: true, order: 3 },
  { _id: 'project-vedaai', _type: 'project', title: 'VedaAI', slug: { _type: 'slug', current: 'vedaai' }, description: "AI-powered assessment creator for educators. Generate and manage AI question papers, track student assignments across class groups, and access an AI Teacher's Toolkit.", techStack: ['React', 'Next.js', 'AI Integration', 'Vercel'], githubUrl: 'https://github.com/Sameerhasan1/vedaai', liveUrl: 'https://vedaai-eta.vercel.app/assignments', category: 'personal', featured: true, order: 4 },
  { _id: 'project-legal-hero', _type: 'project', title: 'Legal Hero', slug: { _type: 'slug', current: 'legal-hero' }, description: 'Comprehensive legal practice management platform. Track matters, coordinate schedules, manage clients, centralize documents, and handle client communication — all in one unified system.', techStack: ['React', 'Next.js', 'Node.js'], githubUrl: 'https://github.com/Sameerhasan1/legal_hero', liveUrl: 'https://sameerhasanlegalhero.netlify.app', category: 'personal', featured: false, order: 5 },
  { _id: 'project-fintrack', _type: 'project', title: 'FinTrack', slug: { _type: 'slug', current: 'finance-dashboard' }, description: 'Real-time financial data visualization dashboard with interactive charts and clean UI. Explored Kafka-style event streaming for live analytics pipelines.', techStack: ['React', 'Chart.js', 'PostgreSQL'], githubUrl: 'https://github.com/Sameerhasan1/finance-dashboard', liveUrl: 'https://fintrackofficial.netlify.app', category: 'personal', featured: false, order: 6 },
  { _id: 'project-datacrafted', _type: 'project', title: 'DataCrafted', slug: { _type: 'slug', current: 'datacrafted' }, description: 'Real-time data visualization platform — interactive analytics dashboards with React + Chart.js frontend and Django REST APIs, built with clean architecture.', techStack: ['Django REST', 'React', 'Chart.js', 'PostgreSQL'], githubUrl: 'https://github.com/Sameerhasan1', category: 'personal', featured: false, order: 7 },
  { _id: 'project-artec', _type: 'project', title: 'Artec', slug: { _type: 'slug', current: 'artec' }, description: 'Currently in active development. Follow the GitHub repo for updates.', techStack: ['In Progress'], githubUrl: 'https://github.com/Sameerhasan1/Artec', category: 'personal', featured: false, order: 8 },
]

const PUBLICATIONS = [
  {
    _id: 'publication-isl', _type: 'publication',
    title: 'Indian Sign Language Recognition Using MobileNetV2',
    journal: 'IEEE Conference', year: '2025',
    abstract: 'This paper presents a high-accuracy approach to Indian Sign Language (ISL) recognition using MobileNetV2, a lightweight convolutional neural network optimized for mobile and embedded applications. The system leverages transfer learning to achieve exceptional accuracy in recognizing ISL gestures, contributing to more accessible communication tools for the hearing-impaired community.',
    authors: ['Sameer Hasan'],
    url: 'https://ieeexplore.ieee.org/document/11340772',
    tags: ['MobileNetV2', 'Deep Learning', 'Sign Language', 'CNN', 'Transfer Learning', 'Computer Vision'],
    highlight: '100% accuracy',
  },
]

const ACHIEVEMENTS = [
  { _id: 'ach-pubdev',          _type: 'achievement', title: 'Published Open-Source Package',    issuer: 'pub.dev',              year: '2025', description: 'firebase_fcm_client — production-ready FCM Dart package with 222+ downloads and enterprise-grade security.',                     type: 'open-source',   order: 1 },
  { _id: 'ach-ieee',            _type: 'achievement', title: 'IEEE Conference Presentation',     issuer: 'IEEE',                 year: '2025', description: 'Achieved 100% accuracy in Indian Sign Language Recognition using MobileNetV2. Presented at IEEE Conference 2025.',              type: 'conference',    order: 2 },
  { _id: 'ach-deep-learning',   _type: 'achievement', title: 'Hands-on Deep Learning Training', issuer: 'Infosys Springboard',  year: '2024',                                                                                                                                           type: 'certification', order: 3 },
  { _id: 'ach-python-found',    _type: 'achievement', title: 'Python Foundation Certification', issuer: 'Infosys Springboard',  year: '2025',                                                                                                                                           type: 'certification', order: 4 },
  { _id: 'ach-learning-python', _type: 'achievement', title: 'Learning Python',                 issuer: 'Infosys Springboard',  year: '2025',                                                                                                                                           type: 'certification', order: 5 },
  { _id: 'ach-web-dev',         _type: 'achievement', title: 'Responsive Web Development',      issuer: 'Infosys Springboard',  year: '2023', description: 'Certification in HTML5, CSS3, and JavaScript responsive design.',                                                          type: 'certification', order: 6 },
]

async function seed() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.error('\n❌  NEXT_PUBLIC_SANITY_PROJECT_ID not set. Run with: node --env-file=.env.local scripts/seed-sanity.mjs\n')
    process.exit(1)
  }
  if (!process.env.SANITY_API_READ_TOKEN) {
    console.error('\n❌  SANITY_API_READ_TOKEN not set. Add your Editor token to .env.local\n')
    process.exit(1)
  }

  const groups = {
    'Site Settings':  [SITE_SETTINGS],
    'Contact Info':   [CONTACT_INFO],
    'Experience':     EXPERIENCES,
    'Skills':         SKILLS,
    'Projects':       PROJECTS,
    'Publications':   PUBLICATIONS,
    'Achievements':   ACHIEVEMENTS,
  }

  const total = Object.values(groups).flat().length
  console.log(`\n🌱  Seeding ${total} documents into Sanity...\n`)

  let success = 0, failed = 0

  for (const [group, docs] of Object.entries(groups)) {
    console.log(`  ── ${group} (${docs.length})`)
    for (const doc of docs) {
      const label = doc.title ?? doc.name ?? doc.role ?? doc._id
      try {
        await client.createOrReplace(doc)
        console.log(`     ✓  ${label}`)
        success++
      } catch (err) {
        console.error(`     ✗  ${label}: ${err.message}`)
        failed++
      }
    }
  }

  console.log(`\n${failed === 0 ? '✅' : '⚠️ '}  Done — ${success} created, ${failed} failed.`)
  console.log('\n📷  Still manual in Studio:')
  console.log('     • Site Settings → Profile Photo (upload your headshot)')
  console.log('     • Projects → cover images (optional screenshots)\n')
}

seed().catch(err => { console.error('Fatal:', err.message); process.exit(1) })
