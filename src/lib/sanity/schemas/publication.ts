import { defineType, defineField } from 'sanity'

export const publication = defineType({
  name: 'publication',
  title: 'Publication / Research',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Paper Title', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'journal', title: 'Journal / Conference', type: 'string' }),
    defineField({ name: 'year', title: 'Year', type: 'string' }),
    defineField({ name: 'abstract', title: 'Abstract', type: 'text', rows: 5 }),
    defineField({
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Your name first, then co-authors',
    }),
    defineField({ name: 'doi', title: 'DOI', type: 'string', description: 'e.g. 10.1109/...' }),
    defineField({ name: 'url', title: 'Paper URL', type: 'url', description: 'IEEE Xplore or publisher link' }),
    defineField({
      name: 'tags',
      title: 'Keywords / Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'highlight',
      title: 'Key Result / Metric',
      type: 'string',
      description: 'e.g. 100% accuracy — shown as a callout badge on the card',
    }),
  ],
  preview: { select: { title: 'title', subtitle: 'journal' } },
})