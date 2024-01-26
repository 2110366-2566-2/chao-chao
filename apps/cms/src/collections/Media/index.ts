import path from 'path'
import { CollectionConfig } from 'payload/types'

import { isAdminOrCreatedByUser } from '../../access'

export const Media: CollectionConfig = {
  slug: 'medias',
  upload: {
    staticDir: path.resolve(__dirname, '../../media'),
  },
  access: {
    read: isAdminOrCreatedByUser,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      type: 'text',
      name: 'name',
      label: {
        en: 'Name',
        th: 'ชื่อ',
      },
      required: true,
    },
    {
      type: 'text',
      name: 'alt',
      label: {
        en: 'Alt',
        th: 'คำอธิบาย',
      },
    },
    {
      type: 'relationship',
      relationTo: 'users',
      name: 'createdBy',
      defaultValue: ({ user }) => user.id,
      required: true,
      hidden: true,
    },
  ],
}
