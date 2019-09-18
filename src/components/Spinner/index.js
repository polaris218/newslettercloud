import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './styles.scss';

export default function Spinner({ show }) {
  return (
    <CSSTransition classNames="spinner" timeout={{ enter: 200, exit: 200 }} in={show} unmountOnExit={true}>
      <div className="spinner">
        <div className="la-ball-clip-rotate-pulse la-primary la-2x">
          <div />
          <div />
        </div>
      </div>
    </CSSTransition>
  );
}
