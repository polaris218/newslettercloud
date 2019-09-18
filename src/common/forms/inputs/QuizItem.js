import React from 'react'


export default function QuizItem({ label, ...rest }) {
  return (
    <label htmlFor={rest.id} className="quiz-question">
      <input type="radio" className="mr-2" {...rest} /> {label}
    </label>
  )
}
