import React from 'react'

export default function EmptyList({ children, placeholderTitle, placeholderDescription, placeholderActions: PlaceholderActions, withoutImage }) {
  return (
    <div className="row mb-3">
      <div className="col">
        <div className="card py-5">
          <div className="row">
            <div className="col-10 offset-1 text-center empty-list-container">
              {
                !withoutImage &&
                <img
                  alt=""
                  className="mb-4"
                  src="/img/no_data.svg"
                />
              }
              <h3 className="mb-3">{placeholderTitle}</h3>
              <p className="lead mb-4">
                {placeholderDescription}
              </p>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
