import { defineType, defineField } from 'sanity'

export const experience = defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    defineField({ name: 'company', title: 'Company', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'role', title: 'Role / Title', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'companyUrl', title: 'Company Website', type: 'url' }),
    defineField({ name: 'startDate', title: 'Start Date', type: 'string', description: 'e.g. Sep 2025' }),
    defineField({ name: 'endDate', title: 'End Date', type: 'string', description: 'Leave blank if current' }),
    defineField({ name: 'current', title: 'Currently Working Here', type: 'boolean', initialValue: false }),
    defineField({
      name: 'locationType',
      title: 'Work Type',
      type: 'string',
      options: {
        list: [
          { title: 'Remote', value: 'Remote' },
          { title: 'On-site', value: 'On-site' },
          { title: 'Hybrid', value: 'Hybrid' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'bullets',
      title: 'Responsibilities / Achievements',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'One bullet point per entry',
    }),
    defineField({
      name: 'techStack',
      title: 'Tech Used',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({ name: 'certificateUrl', title: 'Certificate URL', type: 'url' }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', description: '1 = most recent' }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'role', subtitle: 'company' } },
})