import React from 'react';
import PropTypes from 'prop-types';
import { noop, partial } from '../../lib/utils';

let key = 1;
const getKey = () => key += 1;

const NavLink = ({ active = false, onClick = noop, children = null }) => (
  <button className={`nav-link btn btn-link ${active ? 'active' : ''}`} onClick={onClick}>
    {children}
  </button>
);

NavLink.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func
};

const PageTabSwitcher = ({ onSelect = noop, tabs = [], selected = '' }) => {
  return (
    <div className="row">
      <div className="col">
        <nav className="nav gan-nav-tabs mb-5">
          {tabs.map(tab => (
            <NavLink active={tab.value === selected} onClick={partial(onSelect, tab.value)} key={getKey()}>
              {tab.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

PageTabSwitcher.propTypes = {
  onSelect: PropTypes.func,
  tabs: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string, value: PropTypes.string })),
  selected: PropTypes.string
};

export default PageTabSwitcher;
