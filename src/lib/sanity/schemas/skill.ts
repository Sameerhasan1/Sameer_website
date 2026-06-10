import { defineType, defineField } from 'sanity'

export const skill = defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Skill Name', type: 'string', validation: (R) => R.required() }),
    defineField({
      name: 'iconName',
      title: 'Icon Key',
      type: 'string',
      description: 'react-icons key — e.g. SiReact, SiNodedotjs, SiTypescript. Find at react-icons.github.io/react-icons/icons/si/',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      validation: (R) => R.required(),
      options: {
        list: [
          { title: 'Languages', value: 'Languages' },
          { title: 'Backend', value: 'Backend' },
          { title: 'Frontend', value: 'Frontend' },
          { title: 'Databases', value: 'Databases' },
          { title: 'Cloud / DevOps', value: 'Cloud/DevOps' },
          { title: 'Tools', value: 'Tools' },
        ],
      },
    }),
    defineField({
      name: 'level',
      title: 'Proficiency',
      type: 'string',
      options: {
        list: [
          { title: 'Familiar', value: 'Familiar' },
          { title: 'Intermediate', value: 'Intermediate' },
          { title: 'Advanced', value: 'Advanced' },
          { title: 'Expert', value: 'Expert' },
        ],
        layout: 'radio',
      },
    }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
  orderings: [
    { title: 'Category → Order', name: 'catOrder', by: [{ field: 'category', direction: 'asc' }, { field: 'order', direction: 'asc' }] },
  ],
  preview: { select: { title: 'name', subtitle: 'category' } },
})