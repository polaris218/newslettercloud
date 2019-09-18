import React from 'react'
import { PageTitle } from 'common/widgets'


export default function (props){
  return (
    <div className="container">
      <PageTitle title="title.popupForm"/>
      <div className="row mb-4">
        <div className="col">
          <h1>Popup form</h1>
          <p>A popup form it is! Next, choose a template below</p>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-3 mb-4">
          <div className="card">
            <img
              alt=""
              className="card-img-top"
              src="/img/boutique.png"
            />
            <div className="card-body text-center">
              <h4 className="card-title">Ecommerce</h4>
              <button className="btn btn-secondary mr-2">Preview</button>
              <button className="btn btn-success">Select</button>
            </div>
          </div>
        </div>

        <div className="col-3 mb-4">
          <div className="card">
            <img
              alt=""
              className="card-img-top"
              src="/img/boutique.png"
            />
            <div className="card-body text-center">
              <h4 className="card-title">Ecommerce</h4>
              <button className="btn btn-secondary mr-2">Preview</button>
              <button className="btn btn-success">Select</button>
            </div>
          </div>
        </div>

        <div className="col-3 mb-4">
          <div className="card">
            <img
              alt=""
              className="card-img-top"
              src="/img/boutique.png"
            />
            <div className="card-body text-center">
              <h4 className="card-title">Ecommerce</h4>
              <button className="btn btn-secondary mr-2">Preview</button>
              <button className="btn btn-success">Select</button>
            </div>
          </div>
        </div>

        <div className="col-3 mb-4">
          <div className="card">
            <img
              className="card-img-top"
              src="/img/boutique.png"
              alt=""
            />
            <div className="card-body text-center">
              <h4 className="card-title">Ecommerce</h4>
              <button className="btn btn-secondary mr-2">Preview</button>
              <button className="btn btn-success">Select</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

