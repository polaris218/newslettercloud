import React from 'react'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import QuizItem from 'common/forms/inputs/QuizItem'
import DeleteAccountProposition from './DeleteAccountProposition'
import { deleteQuiz } from './deleteQuizData'


export default function DeleteAccountQuiz({ selectAnswer, answer, nextStep, selectNexpStep }) {
  if(nextStep) {
    const data = deleteQuiz.find(i => i.id === answer)
    return <DeleteAccountProposition {...data} />
  }

  return (
    <div className="row mb-4">
      <div className="col-8 offset-2">
        <div className="card mb-4">
          <div className="card-body p-5">
            <h2 className="card-title"><FormattedMessage id="account.deleteAccount" /></h2>
            <p className="card-text">
              <FormattedMessage id="account.deleteAccountDescription" />
            </p>
            {
              deleteQuiz.map(item => (
                <QuizItem {...item} key={item.id} onClick={selectAnswer} value={item.id} />
              ))
            }
            <div className="row pt-4">
              <div className="col text-right">
                <Link to="/account" className="btn btn-link mr-2"><FormattedMessage id="common.cancel" /></Link>
                <button className="btn btn-danger" disabled={!answer} onClick={selectNexpStep}><FormattedMessage id="common.continue" /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
