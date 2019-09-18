import React from 'react'
import { FormattedMessage } from 'react-intl'

import PageHeader from 'components/PageHeader'
import DeleteAccountQuiz from './DeleteAccountQuiz'


export default function DeleteAccount(props) {
  return (
    <div>
      <DeleteAccountQuiz {...props}  />
    </div>
  )
}
