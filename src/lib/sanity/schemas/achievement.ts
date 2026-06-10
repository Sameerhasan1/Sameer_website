import { defineType, defineField } from 'sanity'

export const achievement = defineType({
  name: 'achievement',
  title: 'Achievement',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'issuer', title: 'Issuer / Organization', type: 'string' }),
    defineField({ name: 'year', title: 'Year', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
    defineField({ name: 'credentialUrl', title: 'Credential / Certificate URL', type: 'url' }),
    defineField({ name: 'badgeImage', title: 'Badge Image', type: 'image', description: 'Optional — issuer logo or badge' }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Certification', value: 'certification' },
          { title: 'Award', value: 'award' },
          { title: 'Open Source', value: 'open-source' },
          { title: 'Conference', value: 'conference' },
        ],
      },
    }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
  preview: { select: { title: 'title', subtitle: 'issuer' } },
})