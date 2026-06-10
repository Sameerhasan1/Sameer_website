import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/lib/sanity/schemas'

export default defineConfig({
  name: 'sameer-portfolio',
  title: 'Sameer Portfolio CMS',
  basePath: '/studio',           // ← add this line
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.listItem()
              .title('Contact Info')
              .id('contactInfo')
              .child(S.document().schemaType('contactInfo').documentId('contactInfo')),
            S.divider(),
            S.documentTypeListItem('project').title('Projects'),
            S.documentTypeListItem('experience').title('Experience'),
            S.documentTypeListItem('skill').title('Skills'),
            S.documentTypeListItem('achievement').title('Achievements'),
            S.documentTypeListItem('publication').title('Publications'),
          ]),
    }),
    visionTool(),
  ],

  schema: { types: schemaTypes },
})