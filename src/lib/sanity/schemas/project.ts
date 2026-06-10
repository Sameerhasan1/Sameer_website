import { defineType, defineField } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'techStack',
      title: 'Tech Stack',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({ name: 'githubUrl', title: 'GitHub URL', type: 'url' }),
    defineField({ name: 'liveUrl', title: 'Live / Demo URL', type: 'url' }),
    defineField({ name: 'npmUrl', title: 'npm / pub.dev URL', type: 'url', description: 'For published packages' }),
    defineField({ name: 'startDate', title: 'Start Date', type: 'string', description: 'e.g. Jan 2025' }),
    defineField({ name: 'endDate', title: 'End Date', type: 'string', description: 'Leave blank if ongoing' }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Open Source', value: 'open-source' },
          { title: 'Personal', value: 'personal' },
          { title: 'Work', value: 'work' },
        ],
      },
    }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false, description: 'Pin to top of grid' }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', description: 'Lower = shown first' }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'category', media: 'coverImage' } },
})