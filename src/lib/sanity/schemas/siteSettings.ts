import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Full Name', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'title', title: 'Professional Title', type: 'string', description: 'e.g. Full-Stack Developer' }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string', description: 'One line under your title in the hero' }),
    defineField({ name: 'bio', title: 'Bio', type: 'text', rows: 4 }),
    defineField({
      name: 'profilePhoto',
      title: 'Profile Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'resumeUrl', title: 'Resume / CV URL', type: 'url', description: 'Google Drive link or direct PDF' }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({
      name: 'availability',
      title: 'Availability Status',
      type: 'string',
      options: {
        list: [
          { title: 'Available for work', value: 'available' },
          { title: 'Open to offers', value: 'open' },
          { title: 'Not available', value: 'unavailable' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'socials',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'github', title: 'GitHub URL', type: 'url' },
        { name: 'linkedin', title: 'LinkedIn URL', type: 'url' },
        { name: 'leetcode', title: 'LeetCode URL', type: 'url' },
        { name: 'dribbble', title: 'Dribbble URL', type: 'url' },
        { name: 'email', title: 'Email Address', type: 'string' },
      ],
    }),
  ],
  preview: { select: { title: 'name', subtitle: 'title' } },
})