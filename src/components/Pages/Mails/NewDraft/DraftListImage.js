import React from 'react'
import { get } from 'lodash'


const positions = [
  {
    slug: 'v2_resp_brevhuvudnocolumn',
    style: {  }
  },
  {
    slug: 'v2_resp_nobrevhuvudnocolumn',
    style: { backgroundPosition: '0 -140px' }
  },
  {
    slug: 'v2_resp_brevhuvudrightcolumn',
    style: { backgroundPosition: '-140px 0' }
  },
  {
    slug: 'v2_resp_brevhuvudleftcolumn',
    style: { backgroundPosition: '-280px 0' }
  },
  {
    slug: 'v2_resp_leftcolumn',
    style: { backgroundPosition: '-140px -140px' }
  },
  {
    slug: 'v2_resp_rightcolumn',
    style: { backgroundPosition: '-280px -140px' }
  },
]

export default function DraftListImage({ slug }) {
  const item = positions.find(i => i.slug === slug)
  return <div className="draft-image ml-auto mr-auto" style={get(item, 'style') || {}}></div>
}
