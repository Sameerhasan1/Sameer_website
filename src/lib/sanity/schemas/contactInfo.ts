import { defineType, defineField } from 'sanity'

export const contactInfo = defineType({
  name: 'contactInfo',
  title: 'Contact Info',
  type: 'document',
  fields: [
    defineField({ name: 'email', title: 'Email Address', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'timezone', title: 'Timezone', type: 'string', description: 'e.g. IST (GMT+5:30)' }),
    defineField({
      name: 'availability',
      title: 'Availability',
      type: 'string',
      options: {
        list: [
          { title: 'Available', value: 'Available' },
          { title: 'Open to offers', value: 'Open to offers' },
          { title: 'Busy', value: 'Busy' },
        ],
        layout: 'radio',
      },
    }),
    defineField({ name: 'responseTime', title: 'Response Time', type: 'string', description: 'e.g. Usually within 24 hours' }),
    defineField({ name: 'workMode', title: 'Work Mode', type: 'string', description: 'e.g. Remote / Hybrid' }),
    defineField({ name: 'calendarUrl', title: 'Calendar Link', type: 'url', description: 'Calendly or similar — optional' }),
  ],
  preview: { select: { title: 'email', subtitle: 'availability' } },
})